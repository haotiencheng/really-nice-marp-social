# stat

Single big number with short caption. Use for one-statistic slides.

**Class:** `<!-- _class: stat -->`
**Default background:** `backgrounds/bg-stat.png`

## Example

```html
<!-- _class: stat -->

<div class="stat-wrap">
  <p class="stat-label">Render time</p>
  <p class="stat-value">3.2s</p>
  <p class="stat-caption">Average for a 5-slide deck on M2 Air with bunx marp-cli.</p>
</div>
```

**Notes**
- `.stat-value` auto-sizes to 280px. 4 chars max or it breaks the grid (e.g. `98%`, `3.2s`, `12×`).
- Caption is one line, ~60 chars max.
