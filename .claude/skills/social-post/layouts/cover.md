# cover

Opening slide — large hook title, short lead, optional tag pill.

**Class:** `<!-- _class: cover -->`
**Default background:** `backgrounds/bg-cover.png`

## Example

```html
<!-- _class: cover -->

<div class="cover-wrap">
  <div class="cover-left">
    <div class="eyebrow">WEEKLY TIPS</div>
    <h1>Ship faster with <span class="hl">Marp</span> + Canva</h1>
    <p class="lead">Three patterns I use every week for social slides.</p>
    <div class="tag">5-slide read</div>
  </div>
</div>
```

**Notes**
- `.hl` on an inline `<span>` gives the underlined teal accent.
- Keep the hook under 8 words. The lead is one sentence.
- `cover-wrap` absolutely positions children; add visual elements (floating cards, emoji, bubble) inside it.
