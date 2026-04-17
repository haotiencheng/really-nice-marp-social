# cover-float

Cover with left-side hook + floating cards on the right. Themed for `notebook` (grid-notes paper). Not a `<!-- _class: -->` slide — replaces the default `cover` for themes that define `.cover`, `.cover-left`, `.float-card`.

**Class:** `<!-- _class: cover -->`
**Themes:** `notebook`

## Example

```html
<!-- _class: cover -->

<div class="cover">
  <div class="cover-left">
    <div class="eyebrow">CLAUDE CODE TIPS</div>
    <h1>How I manage<br/><span class="hl">Custom Skills</span></h1>
    <p class="lead">Two layers: global + project.<br/>Never mix them up again ✌️</p>
    <div class="tag">Global &nbsp;·&nbsp; Project</div>
  </div>

  <div class="cover-visual">
    <div class="float-card card-a">
      <div class="icon-box big"><img src="claude.svg" /></div>
      <div class="fc-title">Global</div>
      <div class="fc-sub">shared across repos</div>
    </div>
    <div class="float-card card-b">
      <div class="icon-box big"><img src="instagram.svg" /></div>
      <div class="fc-title">Project</div>
      <div class="fc-sub">version-controlled</div>
    </div>
  </div>
</div>
```

**Notes**
- `.hl` underlines the accent word (teal).
- Two float cards (`card-a` / `card-b`) are pre-positioned with opposing tilt.
- Put icon PNG/SVGs next to `slide.md` so `<img src="...">` resolves.
