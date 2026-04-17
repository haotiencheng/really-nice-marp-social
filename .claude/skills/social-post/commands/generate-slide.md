---
name: generate-slide
description: "Generate a social slide deck (PNGs) from text or a URL. Picks layouts, writes slide.md, renders via Marp."
---

# /generate-slide

**Usage**
```
/generate-slide <text | url> [--theme NAME] [--ratio 4:5|1:1|9:16|16:9] [--post-id SLUG]
```

**Flow**

1. **Resolve input**
   - If input is a URL: fetch with `defuddle` (preferred) or `WebFetch`. On 403 or JS-heavy pages, fall back to `agent-browser`. Save raw text to memory; don't write it to disk unless the user asks.
   - If input is text: use as-is.
2. **Pick post_id** — if `--post-id` is given, use it. Otherwise slugify the first 4 content words (kebab-case, ASCII only). Prefix with a 2-digit counter based on existing `output/` folders so posts sort.
3. **Read every layout spec** — glob `.claude/skills/social-post/layouts/*.md` and read all of them before drafting slides.
4. **Draft slide structure** — pick 3–8 layouts matching data shape. Always start with `cover`, end with `closing`. Never repeat `cover` or `closing`.
5. **Write `output/<post_id>/slide.md`** — Marp frontmatter (`marp: true`, `paginate: false`), one slide per section, `<!-- _class: NAME -->` on every slide.
6. **Render**
   ```bash
   bun run scripts/render-slides.ts <post_id> --theme ${theme:-default} ${ratio:+--ratio $ratio}
   ```
7. **Verify** — list `output/<post_id>/final_slide.*.png`. If count doesn't match slide count, show marp stderr and ask the user.
8. **Hand back** — show the user the PNG paths + slide.md path so they can tweak.

**Content rules**

- Never invent facts. If the source is a URL, only use claims from the fetched text.
- Localize to zh-TW if the source or user context is Chinese. Use OpenCC `s2twp` for `zh-CN` → `zh-TW` conversion.
- Keep each slide's text within the layout's limits (see layout `.md` Notes sections).
- Every slide must have a `_class` — missing class falls back to bare Marp styling and breaks the design.

**Examples**

```bash
/generate-slide "3 patterns I learned from rewriting the ingest pipeline"
/generate-slide https://example.com/blog/rate-limits --theme default --ratio 4:5
/generate-slide "10 years of Go in 5 slides" --ratio 1:1 --post-id go-decade
```
