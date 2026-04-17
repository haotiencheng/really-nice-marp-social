---
name: add-branding
description: "Replace a theme's background PNGs with user-provided branded images."
---

# /add-branding

**Usage**
```
/add-branding <theme-name> <source-image-dir-or-files>
```

**Flow**

1. **Verify theme exists** — `themes/<theme-name>/theme.config.json` must be present.
2. **Read expected filenames** from `theme.config.json.backgrounds`:
   ```json
   { "cover": "bg-cover.png", "body": "bg-body.png", "quote": "bg-quote.png", "stat": "bg-stat.png", "closing": "bg-closing.png" }
   ```
3. **Resolve the source** — if the arg is a directory, match filenames. If the arg is a list of files, map them by name or ask the user.
4. **Validate each image**
   - Must be PNG or JPEG. JPEG → convert to PNG.
   - Dimensions must match the theme's ratio (read `theme.config.json.ratio` → lookup `RATIO_TO_PX` in `render-slides.ts`). If off by >1%, offer to auto-crop/resize with `sharp`.
   - Reject files with missing/unknown names — print the expected list.
5. **Copy into place** with a backup of the originals:
   ```bash
   mkdir -p themes/<name>/backgrounds/.backup-<timestamp>
   cp themes/<name>/backgrounds/*.png themes/<name>/backgrounds/.backup-<timestamp>/
   cp <verified source> themes/<name>/backgrounds/
   ```
6. **Re-render one existing post** (if any) with this theme so the user sees the change immediately. Skip if no posts exist.
7. **Report** — list which files were replaced and the backup location.

**Rules**

- Always back up before overwriting. Never delete the old backgrounds in the same run.
- Don't touch `theme.css` — branding = backgrounds only. Color tweaks use `/copy-style` or manual edits.
- If the user's image is a logo/mark, warn them: backgrounds are full-bleed — small logos will look lost. Suggest they design a full 1080×1350 canvas in Canva/Figma first.
