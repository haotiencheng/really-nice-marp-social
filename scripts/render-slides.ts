#!/usr/bin/env bun
/**
 * Render a slide.md to PNGs using marp-cli with the chosen theme.
 *
 * Usage:
 *   bun run scripts/render-slides.ts <post_id> [--theme default] [--ratio 4:5]
 *   bun run scripts/render-slides.ts <post_id> --md path/to/slide.md
 *
 * Reads themes/<theme>/theme.config.json for the default ratio, merges
 * theme.css + layouts.css + an injected @size directive, and spawns
 * `bunx @marp-team/marp-cli` with --allow-local-files.
 */

import { $ } from "bun";
import { existsSync, readdirSync } from "node:fs";
import { mkdir, readFile, rm, writeFile, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const RATIO_TO_PX: Record<string, [number, number]> = {
  "4:5": [1080, 1350],
  "1:1": [1080, 1080],
  "9:16": [1080, 1920],
  "16:9": [1920, 1080],
};

interface ThemeConfig {
  name: string;
  ratio: keyof typeof RATIO_TO_PX;
  backgrounds?: Record<string, string>;
}

function parseArgs(argv: string[]) {
  const [, , postId, ...rest] = argv;
  if (!postId || postId.startsWith("--")) {
    console.error(
      "Usage: bun run scripts/render-slides.ts <post_id> [--theme NAME] [--ratio 4:5] [--md PATH]",
    );
    process.exit(1);
  }
  const opts = { theme: "default", ratio: "", md: "" };
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i]?.replace(/^--/, "");
    const val = rest[i + 1];
    if (key && val && key in opts) (opts as Record<string, string>)[key] = val;
  }
  return { postId, ...opts };
}

async function main() {
  const args = parseArgs(Bun.argv);
  const root = resolve(import.meta.dir, "..");
  const themeDir = join(root, "themes", args.theme);
  const configPath = join(themeDir, "theme.config.json");

  if (!existsSync(configPath)) {
    console.error(`❌ Theme "${args.theme}" not found: ${configPath}`);
    process.exit(1);
  }
  const config: ThemeConfig = JSON.parse(await readFile(configPath, "utf8"));

  const ratio = (args.ratio || config.ratio) as keyof typeof RATIO_TO_PX;
  const dims = RATIO_TO_PX[ratio];
  if (!dims) {
    console.error(
      `❌ Unknown ratio "${ratio}". Supported: ${Object.keys(RATIO_TO_PX).join(", ")}`,
    );
    process.exit(1);
  }
  const [w, h] = dims;

  const postDir = join(root, "output", args.postId);
  await mkdir(postDir, { recursive: true });

  const srcMdPath = args.md ? resolve(args.md) : join(postDir, "slide.md");
  if (!existsSync(srcMdPath)) {
    console.error(`❌ slide.md not found: ${srcMdPath}`);
    console.error(`   Create one at ${srcMdPath} or pass --md <path>.`);
    process.exit(1);
  }

  const themeCss = await readFile(join(themeDir, "theme.css"), "utf8");
  const layoutsCss = await readFile(join(themeDir, "layouts.css"), "utf8").catch(async () => {
    // Themes may ship without layouts.css; fall back to default's layouts.css.
    const fallback = join(root, "themes", "default", "layouts.css");
    return readFile(fallback, "utf8");
  });

  const themeName = extractThemeName(themeCss) ?? "rnms-theme";
  const sizeName = `rnms-${w}x${h}`;
  const sizeDirective = `\n@size ${sizeName} ${w}px ${h}px;\nsection { width: ${w}px !important; height: ${h}px !important; }\n`;
  const mergedCss = `${themeCss}\n${sizeDirective}\n${layoutsCss}\n`;
  const mergedCssPath = join(postDir, ".theme.merged.css");
  await writeFile(mergedCssPath, mergedCss);

  const mdPath = join(postDir, ".slide.rendered.md");
  const srcMd = await readFile(srcMdPath, "utf8");
  await writeFile(mdPath, injectFrontmatter(srcMd, { theme: themeName, size: sizeName }));

  const bgSrcDir = join(themeDir, "backgrounds");
  if (existsSync(bgSrcDir)) {
    const bgDstDir = join(postDir, "backgrounds");
    await mkdir(bgDstDir, { recursive: true });
    for (const file of readdirSync(bgSrcDir)) {
      await copyFile(join(bgSrcDir, file), join(bgDstDir, file));
    }
  }

  for (const old of readdirSync(postDir).filter((f) => /^final_slide\.\d+\.png$/.test(f))) {
    await rm(join(postDir, old));
  }

  console.log(`🖼  Rendering ${args.postId} (${w}x${h}, theme=${args.theme})`);
  const outStem = join(postDir, "final_slide.png");
  await $`bunx --bun @marp-team/marp-cli ${mdPath} --images png --theme-set ${mergedCssPath} --allow-local-files --no-stdin -o ${outStem}`;

  const finals = readdirSync(postDir)
    .filter((f) => /^final_slide\.\d+\.png$/.test(f))
    .sort();
  console.log(`✅ ${finals.length} slide${finals.length === 1 ? "" : "s"} in ${postDir}`);
  for (const f of finals) console.log(`   ${f}`);
}

function extractThemeName(css: string): string | null {
  const m = css.match(/\/\*\s*@theme\s+([a-zA-Z0-9_-]+)\s*\*\//);
  return m ? m[1] : null;
}

function injectFrontmatter(md: string, fields: Record<string, string>): string {
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (fmMatch) {
    let fm = fmMatch[1];
    for (const [k, v] of Object.entries(fields)) {
      const keyRe = new RegExp(`^${k}\\s*:.*$`, "m");
      if (keyRe.test(fm)) {
        fm = fm.replace(keyRe, `${k}: ${v}`);
      } else {
        fm += `\n${k}: ${v}`;
      }
    }
    return `---\n${fm}\n---\n${md.slice(fmMatch[0].length)}`;
  }
  const fmLines = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
  return `---\nmarp: true\n${fmLines}\n---\n\n${md}`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
