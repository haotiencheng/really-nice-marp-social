---
name: social-post
description: "Generate on-brand social slide decks (IG / Threads / LinkedIn) from text or a URL. Runs Marp + swappable backgrounds + shared layouts. Say: 'generate a slide deck', 'create an IG carousel from this URL', 'make a Threads post about X'. Also exposes /copy-style to clone a visual style from an image and /add-branding to swap in custom backgrounds."
---

# Really Nice Marp Social

Turn a paragraph of text or a URL into a styled slide deck (PNG carousel). Three-layer architecture keeps visuals swappable:

```
slide = Background PNG  +  Layout class  +  Theme CSS variables
         (themes/*/      (.claude/skills/    (themes/*/
          backgrounds/)   social-post/        theme.css)
                          layouts/)
```

Swap the theme → different colors. Swap the backgrounds → different mood. Layouts stay the same.

## Commands

| Command | When to use |
|---------|-------------|
| `/generate-slide <text \| url> [--theme NAME] [--ratio 4:5\|1:1\|9:16\|16:9]` | Produce a slide deck from content. |
| `/copy-style <image \| url> [name]` | Clone the color palette / mood of a reference image into a new theme. |
| `/add-branding <theme> <image-dir>` | Replace a theme's backgrounds with the user's own branded PNGs. |

Full command specs live in `commands/*.md` alongside this file.

## Pipeline: generate-slide

1. **Input** — text paragraph, URL, or pasted content.
2. **Fetch (if URL)** — use `defuddle` or `WebFetch`; fall back to `agent-browser` on 403/JS-rendered pages. Strip boilerplate.
3. **Read `layouts/*.md`** — every layout has a Marp example + when-to-use. Use these to decide the deck structure.
4. **Pick a layout per slide** by data shape:
   - hook + lead → `cover`
   - 3 takeaways → `list-3`
   - 5 takeaways → `list-5`
   - memorable line → `quote`
   - one big number → `stat`
   - how-to (3–4 steps) → `step`
   - before/after / mode comparison → `compare`
   - CTA or sign-off → `closing`
5. **Write `output/<post_id>/slide.md`** — Marp frontmatter + one `---` per slide + `<!-- _class: NAME -->` per slide.
6. **Render** — `bun run scripts/render-slides.ts <post_id> --theme <name> --ratio <r>`.
7. **Iterate** — user reviews `output/<post_id>/final_slide.*.png`; tweak `slide.md`; re-render.
8. **Publish (optional)** — Buffer MCP, Threads, or just hand the PNGs back to the user.

**Hard rules**
- Every slide **must** have a `_class` directive. Layout examples show how.
- Keep decks 3–8 slides. IG carousel caps at 10.
- Never fabricate claims not in the source text — the skill is a renderer, not a content farm.
- Always convert Chinese output to zh-TW (Taiwan) — use OpenCC `s2twp` if user originates from zh-TW context.

## Theme System

**Theme folder contract** (`themes/<name>/`):
- `theme.config.json` — `{ name, author, ratio, backgrounds }`
- `theme.css` — defines CSS variables (`--color-primary`, `--font-heading`, …). Imports `default` Marp theme.
- `layouts.css` — **optional**. If missing, renderer falls back to `themes/default/layouts.css` (recommended: leave shared unless a theme needs custom spacing).
- `backgrounds/bg-{cover,body,quote,stat,closing}.png` — 5 PNGs matching the ratio.

**Supported ratios** (theme defaults, overridable per-render via `--ratio`):
| Ratio | px | Use |
|-------|-----|-----|
| `4:5` | 1080×1350 | IG feed (default) |
| `1:1` | 1080×1080 | IG square / Threads |
| `9:16` | 1080×1920 | IG/TikTok Stories |
| `16:9` | 1920×1080 | LinkedIn / X |

## Marp CLI Gotchas

- **`--allow-local-files`** is mandatory — without it, background PNGs fail to load.
- **Relative paths** in `theme.css` resolve from the rendered `slide.md`'s directory. The renderer copies `backgrounds/` into `output/<post_id>/` to keep paths consistent.
- **zh-TW fonts** are imported from Google Fonts (Noto Sans TC). Marp's default font is ugly for CJK.
- **Ratio is injected at render time** — `theme.css` does NOT hard-code width/height. `render-slides.ts` appends `@size` + `section { width/height }`.

## File Map

```
.claude/skills/social-post/
├── SKILL.md                   # this file
├── commands/
│   ├── generate-slide.md
│   ├── copy-style.md
│   └── add-branding.md
└── layouts/
    ├── cover.md
    ├── list-3.md
    ├── list-5.md
    ├── quote.md
    ├── stat.md
    ├── step.md
    ├── compare.md
    └── closing.md
```
