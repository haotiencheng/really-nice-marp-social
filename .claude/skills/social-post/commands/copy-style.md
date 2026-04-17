---
name: copy-style
description: "Clone the color palette and mood of a reference image into a new theme folder."
---

# /copy-style

**Usage**
```
/copy-style <image-path | image-url> [theme-name]
```

**Flow**

1. **Load the reference** — read the local image or fetch the URL.
2. **Analyze with Claude vision** — extract:
   - Dominant color palette (3–5 colors: primary, background, text, accent, optional secondary)
   - Font style impression (serif vs sans, rounded vs sharp, geometric vs organic)
   - Mood keywords (e.g. "editorial, cream, teal accents, notebook grid")
3. **Name the theme** — if user passes a name use it; otherwise slugify the mood keywords (e.g. `editorial-cream`, `midnight-gradient`).
4. **Scaffold the folder**
   ```bash
   cp -R themes/_template themes/<name>
   ```
5. **Fill `themes/<name>/theme.css`** — write only the `:root` vars. Pick Google Fonts that match the font impression. Do not touch the `section` rules.
6. **Fill `themes/<name>/theme.config.json`** — `name`, `author` (user), `ratio` (default `4:5` unless user specified), `description` (the mood keywords).
7. **Generate 5 starter backgrounds** into `themes/<name>/backgrounds/`:
   - Pick one of three modes based on the reference:
     - **Solid**: flat color from the palette
     - **Gradient**: 2-stop gradient from primary → bg
     - **Notebook**: cream base + faint grid lines (copy the grid-notes pattern from `themes/default`)
   - Use `bunx sharp-cli` or a small Bun script with `sharp` to write PNGs at the theme's ratio resolution.
   - Filenames must match `theme.config.json.backgrounds` exactly.
8. **Tell the user** the next step:
   > ✨ Starter theme scaffolded. For a branded look, replace the backgrounds with your own images — run `/add-branding <name> <your-image-dir>`.

**Rules**

- **Don't** re-host the reference image in the repo. The analysis output is derived, not a copy.
- **Don't** generate backgrounds with AI image gen in v1 — solid/gradient/notebook only. AI gen is a v2 flag.
- **Do** include the mood keywords in the theme `description` so future sessions can tell themes apart.
