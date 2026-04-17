# list-3

Three-bullet list card. Use for short takeaways, key points, mini-guides.

**Class:** `<!-- _class: list-3 -->`
**Default background:** `backgrounds/bg-body.png`

## Example

```html
<!-- _class: list-3 -->

<div class="wrap">
  <div class="eyebrow">3 things that stuck</div>
  <div class="card">
    <div class="card-head">
      <div>
        <div class="card-title">Marp layouts</div>
        <div class="card-sub">Design once, reuse forever</div>
      </div>
    </div>

    - Background is a PNG — swap it, swap the look
    - Layouts are just CSS classes on a `<section>`
    - Themes are CSS variables layouts inherit

  </div>
</div>
```

**Notes**
- Keep each bullet to ~10 words so nothing wraps weirdly at 1080px.
- Omit `.card-head` if you just want the bullets.
