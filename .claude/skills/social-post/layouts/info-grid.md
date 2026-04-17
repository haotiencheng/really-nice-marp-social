# info-grid

2×2 grid of label/value stat cards. Use for 4 key facts (location, duration, team, status).

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`
**Item count:** exactly 4

## Example

```html
# 重要資訊

<div class="info-grid">
  <div class="info-item">
    <div class="label">地點</div>
    <div class="value">台北 / 新北</div>
  </div>
  <div class="info-item">
    <div class="label">到班時間</div>
    <div class="value">每週至少 3 天</div>
  </div>
  <div class="info-item">
    <div class="label">招募單位</div>
    <div class="value">Disney<br />Experiences</div>
  </div>
  <div class="info-item">
    <div class="label">投遞狀態</div>
    <div class="value">Actively<br />Hiring</div>
  </div>
</div>
```

**Notes**
- Use `<br />` in `.value` when the phrase is two words — keeps cards balanced.
- Label is uppercased/tracked by the theme — pass mixed case.
