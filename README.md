# really-nice-marp-social

A Claude Code skill that turns a paragraph of text or a URL into an on-brand social slide deck (IG / Threads / LinkedIn). Runs on [Marp](https://marp.app/) with swappable backgrounds and shared layouts — fork the repo, drop in your own Canva/Figma/AI backgrounds, and every post stays visually consistent.

> ✨ 把一段文字或一個 URL 丟進去，產出風格統一的社群圖卡。Marp + 可替換背景 + 共用 layout，換主題就換風格。

---

## Quickstart (5 minutes)

```bash
# 1. Clone + install
git clone https://github.com/haotiencheng/really-nice-marp-social
cd really-nice-marp-social
bun install

# 2. From inside Claude Code: first-time setup
/init                          # checks deps, smoke-tests render, optional Buffer config

# 3. Bootstrap a post (or just call /generate-slide)
bun run new my-first-post

# 4. Render
bun run render my-first-post

# 5. Open the PNGs
open output/my-first-post/final_slide.001.png
```

You'll get a 3-slide IG carousel (`cover` → `list-3` → `closing`) using the shipped `default` theme. Edit `output/my-first-post/slide.md` and re-render to iterate.

---

## Using it as a Claude Code skill

Once this repo is the current working directory (or installed via `/plugin install`), Claude picks up the `social-post` skill and these commands:

| Command | What it does |
|---------|--------------|
| `/init` | First-time setup: dep check + render smoke test + optional Buffer config. |
| `/generate-slide <text \| url> [--theme NAME] [--ratio 4:5\|1:1\|9:16\|16:9]` | Pick layouts, write `slide.md`, render PNGs. |
| `/copy-style <image \| url> [name]` | Clone a reference image's color palette + mood into a new theme. |
| `/add-branding <theme> <image-dir>` | Replace a theme's backgrounds with your own. |
| `/publish <post_id> [--mode queue\|draft\|schedule] [--at ISO]` | Optional. Push rendered PNGs + caption to IG / Threads via Buffer MCP. |

See `.claude/skills/social-post/SKILL.md` for the full pipeline spec.

### Optional: Buffer publish

`/publish` is gated behind `/init`. Skip the Buffer step in setup if you'd rather post manually — local rendering works without it. When enabled, setup creates a gitignored `.env` (with `BUFFER_ACCESS_TOKEN`) and copies `.mcp.json.example` to `.mcp.json` for the Buffer MCP server. Restart Claude Code after setup so the MCP server connects.

---

## Three-layer architecture

```
slide  =  Background PNG  +  Layout class      +  Theme CSS variables
          themes/*/          .claude/skills/       themes/*/
          backgrounds/       social-post/          theme.css
                             layouts/
```

- **Backgrounds** — your Canva / Figma / AI-generated / hand-drawn PNGs. Only the visual wrapper.
- **Layouts** — HTML + CSS positioning. Stay constant across themes. Read theme vars via `var(--color-primary)`.
- **Theme CSS** — color, font, and spacing tokens. Swap the theme → every layout automatically re-colors.

This lets someone fork the repo, redesign just the backgrounds in Canva, and get a completely different brand without touching layouts or code.

---

## Layouts

Shipped in `.claude/skills/social-post/layouts/`. Layouts are grouped by the theme whose CSS defines their classes — a theme only has to support the layouts it opts into.

### Outlined card (design language — `default`, `notebook`)

| Layout | Use for |
|--------|---------|
| `cover` | Hook title + one-line lead |
| `cover-float` | Hook + floating tilted cards (`notebook` only) |
| `list-3` | 3 bullet takeaways |
| `list-5` | 5 bullet takeaways |
| `quote` | Large pull quote |
| `stat` | One big number + caption |
| `step` | Numbered 3–4 step how-to |
| `compare` | Before/after or mode comparison |
| `closing` | CTA / sign-off / QR |

### Icon-badge deck (design language — `cream-blob`)

| Layout | Use for |
|--------|---------|
| `grid-2x2` | 4 icon + title + blurb cards |
| `numbered-stack` | 2–3 framed sections with big numerals |
| `timeline` | Dated milestones, application process |
| `two-col` | Required vs preferred, before/after bullets |
| `icon-rows` | 3–4 benefits or feature rows |
| `info-grid` | 4 key facts (label → value) |
| `cta-cards` | 2–4 open positions / CTAs |
| `qr-duo` | Two QR codes side-by-side (typically last slide) |

### Editorial / magazine (design language — `editorial`)

| Layout | Use for |
|--------|---------|
| `ed-cover` | Magazine-style cover — eyebrow meta + oversized hook + squiggle + lead |
| `page` | Content page — circle page-marker, squiggle, `page-foot` nav |
| `prose` | Flowing paragraph body with big-stat watermark |
| `compare` | Two screenshots side-by-side with ✓/✕ tags |
| `rows` | Key → value rows (with optional inline caption) |
| `stats` | Big numeral + label/description rows |
| `lst` | Numbered editorial list |
| `sidenote` | Compact key/value notes under the prose |

Every layout `.md` has a copy-pasteable example + when-to-use notes.

---

## Themes

| Theme | Look | Default ratio | Example post |
|-------|------|---------------|---------------|
| `default` | Cream grid background, teal + outlined cards, `Plus Jakarta Sans` | 4:5 | — |
| `notebook` | Grid-notes paper, outlined white cards, floating tilted cards on the cover | 4:5 | [`examples/manage_skills/`](examples/manage_skills/) |
| `cream-blob` | Cream background with soft organic blob shapes + dark teal content card, Material Symbols icons, footer bar | 4:5 | [`examples/disney_intern/`](examples/disney_intern/) |
| `editorial` | Flat dark canvas + warm linen accent, squiggle underline, circle page markers, magazine spread feel | 4:5 | [`examples/car_wash_test/`](examples/car_wash_test/) |
| `_template` | Empty starter — copy to scaffold your own | 4:5 | — |

Make your own:

```bash
cp -R themes/_template themes/my-brand
# edit themes/my-brand/theme.css  (change CSS vars)
# drop PNGs into themes/my-brand/backgrounds/
bun run render my-first-post --theme my-brand
```

Or let Claude do it: `/copy-style reference.png my-brand`.

---

## Ratios

Default is 4:5 (IG feed). Pass `--ratio` to override for a single render, or change `ratio` in `theme.config.json` to change the theme's default.

| Ratio | Pixels | Where |
|-------|--------|-------|
| `4:5` | 1080×1350 | IG feed (default) |
| `1:1` | 1080×1080 | IG square / Threads |
| `9:16` | 1080×1920 | IG/TikTok Stories |
| `16:9` | 1920×1080 | LinkedIn / X |

---

## Install as a plugin

Once this skill is published to the [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces):

```
/plugin install really-nice-marp-social
```

Until then, clone the repo and point Claude Code at it as a local skill. Manifest lives at `.claude-plugin/plugin.json`.

Release plan: see [`docs/release.md`](docs/release.md).

---

## Requirements

- [Bun](https://bun.sh/) ≥ 1.1
- `@marp-team/marp-cli` (installed via `bun install`)
- Google Fonts (auto-fetched by Marp at render time — offline use requires bundling fonts)

---

## Project layout

```
really-nice-marp-social/
├── .claude/skills/social-post/   # the skill — SKILL.md, commands, layouts
├── .claude-plugin/plugin.json    # Claude Code plugin manifest
├── themes/
│   ├── default/                  # cream + teal (ships with repo)
│   └── _template/                # scaffold for custom themes
├── scripts/
│   ├── render-slides.ts          # bun: marp-cli wrapper
│   └── new-post.sh               # bootstrap output/<id>/slide.md
├── examples/                     # end-to-end sample posts
├── docs/                         # release.md + future guides
├── output/                       # rendered posts (gitignored except examples)
└── package.json
```

---

## License

MIT for code. `themes/default/backgrounds/` images are CC BY 4.0 unless noted otherwise in the file — see `themes/default/backgrounds/LICENSE`.

Canva templates are NOT re-hosted — background PNGs in this repo are generated/drawn, not exported Canva files.
