# closing

Final slide — CTA or sign-off. Optional centered QR.

**Class:** `<!-- _class: closing -->`
**Default background:** `backgrounds/bg-closing.png`

## Example — text only

```html
<!-- _class: closing -->

<div class="closing-wrap">
  <p class="closing-headline">Try it out</p>
  <p class="closing-sub">Clone the repo and render your first post in under 5 minutes.</p>
</div>
```

## Example — with QR

```html
<!-- _class: closing -->

<div class="closing-wrap">
  <p class="closing-headline">Full guide on GitHub</p>
  <div class="closing-qr">
    <img src="qr.png" alt="Scan to open repo" />
  </div>
</div>
```

**Notes**
- Keep this slide minimal — headline + one sub line or one QR. No pills, no eyebrows.
- QR image goes next to `slide.md` at render time; generate with any QR tool.
