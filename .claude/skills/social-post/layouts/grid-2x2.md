# grid-2x2

Four equally-weighted cards in a 2×2 grid. Each card has an icon badge + short title + one-line description. Use for 4 roles, 4 responsibilities, 4 features.

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`
**Item count:** exactly 4

## Example

```html
# 實習工作內容

<div class="grid">
  <div class="card">
    <div class="icon-badge"><span class="icon">campaign</span></div>
    <h2>社群經營</h2>
    <p>Disney Style TW 官方 FB/IG 帳號日常維運</p>
  </div>
  <div class="card">
    <div class="icon-badge"><span class="icon">movie</span></div>
    <h2>短影音創作</h2>
    <p>資料收集、腳本、拍攝、剪輯一條龍</p>
  </div>
  <div class="card">
    <div class="icon-badge"><span class="icon">handshake</span></div>
    <h2>網紅合作</h2>
    <p>安排開箱體驗，協助品牌曝光</p>
  </div>
  <div class="card">
    <div class="icon-badge"><span class="icon">psychology</span></div>
    <h2>行銷企劃</h2>
    <p>共同執行行銷活動，提供創意發想</p>
  </div>
</div>
```

**Notes**
- `<span class="icon">name</span>` uses Material Symbols Outlined — browse at https://fonts.google.com/icons.
- Pick 4 items — 3 leaves an empty cell, 5 overflows.
