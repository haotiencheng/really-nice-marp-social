# numbered-stack

Vertical stack of numbered cards (big faded numeral + heading + paragraph or bullets). Use for key:value pairs, multi-section job detail blocks, 2–3 framed points.

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`
**Item count:** 2–3

## Example

```html
# 職位資訊與申請資格

<div class="numbered-stack">
  <div class="ns-card">
    <div class="ns-num">1</div>
    <div class="ns-body">
      <h2>職位基本資訊</h2>
      <p>
        <strong>職位：</strong>Supply Chain Intern<br />
        <strong>地點：</strong>台北市（現場）<br />
        <strong>實習期：</strong>12 個月
      </p>
    </div>
  </div>
  <div class="ns-card">
    <div class="ns-num">2</div>
    <div class="ns-body">
      <h2>學歷與背景</h2>
      <p><strong>教育：</strong>商業管理或相關科系</p>
      <ul>
        <li>責任感與主動學習精神</li>
        <li>優異的批判性思考能力</li>
      </ul>
    </div>
  </div>
</div>
```

**Notes**
- Don't exceed 3 cards — numerals get small.
- Body can be `<p>` or `<ul>`, not both (unless short).
