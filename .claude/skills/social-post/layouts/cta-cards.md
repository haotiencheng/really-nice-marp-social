# cta-cards

Vertical stack of compact action cards — icon badge + title + short meta. Use for multiple open positions, multiple CTAs, "pick one of these".

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`
**Item count:** 2–4

## Example

```html
# 立即申請

<div class="cta-cards">
  <div class="cta-card">
    <div class="icon-badge"><span class="icon">work</span></div>
    <h2>財務實習生</h2>
    <p>職位 ID: 6299</p>
  </div>
  <div class="cta-card">
    <div class="icon-badge"><span class="icon">campaign</span></div>
    <h2>行銷活動實習生</h2>
    <p>職位 ID: 6457</p>
  </div>
  <div class="cta-card">
    <div class="icon-badge"><span class="icon">analytics</span></div>
    <h2>數據分析實習生</h2>
    <p>職位 ID: 6482</p>
  </div>
</div>
```

**Notes**
- For a QR-based close-out, use `qr-duo` or `closing` instead.
