# two-col

Two side-by-side bulleted lists. Use for required vs. preferred, before vs. after, pros vs. cons. Optional callout bar at the bottom for a one-line footnote.

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`

## Example

```html
# 申請資格一覽

<div class="two-col">
  <div class="col">
    <h2>✓ 基本條件</h2>
    <ul>
      <li>行銷、公關或數位多媒體相關科系</li>
      <li>熟悉社群平台與短影音創作</li>
      <li>熟練 Outlook、PowerPoint、Word、Excel</li>
      <li>中英文流利</li>
    </ul>
  </div>
  <div class="col">
    <h2>★ 加分特質</h2>
    <ul>
      <li>具社群內容創作經驗</li>
      <li>有創意、具團隊合作精神</li>
      <li>良好溝通能力</li>
      <li>熱愛 Disney 品牌與 IP 內容</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="icon">info</span> 滾動審核制 — 建議儘早投遞。
</div>
```

**Notes**
- 4–5 bullets per column fits best. 6+ risks overflow.
- The callout (`<div class="callout">`) is optional.
