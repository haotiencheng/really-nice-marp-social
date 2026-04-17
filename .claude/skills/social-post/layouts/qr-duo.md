# qr-duo

Two QR codes side by side — apply URL + interview/other URL. Typically the last slide.

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`

## Example

```html
# 掃碼申請 & 模擬面試

<div class="qr-duo">
  <div class="qr-item">
    <img src="qr_apply.png" alt="Apply" />
    <h2>立即申請</h2>
    <p>掃描 QR Code<br />前往官方申請頁面</p>
  </div>
  <div class="qr-item">
    <img src="qr_interview.png" alt="Interview" />
    <h2>AI 模擬面試</h2>
    <p>掃描 QR Code<br />前往 Mocky.pro 練習</p>
  </div>
</div>
```

**Notes**
- Generate QR PNGs next to `slide.md` (any QR tool) before rendering — `<img src>` must resolve.
- If only one QR, use `closing.md` or center a single `.qr-item`.
