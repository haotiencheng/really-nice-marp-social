# step

Numbered steps stacked vertically. Use for how-tos, tutorials, workflows.

**Class:** `<!-- _class: step -->`
**Default background:** `backgrounds/bg-body.png`

## Example

```html
<!-- _class: step -->

<div class="wrap">
  <div class="eyebrow">Ship a post in 4 steps</div>
  <div class="step-stack">
    <div class="step-item">
      <div class="step-num">1</div>
      <div class="step-body">
        <p class="step-title">Draft in Marp markdown</p>
        <p class="step-desc">Pick a layout per slide. Let the theme handle colors.</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-num">2</div>
      <div class="step-body">
        <p class="step-title">Render to PNG</p>
        <p class="step-desc">bun run render &lt;post-id&gt; — one command, 1080×1350 out.</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-num">3</div>
      <div class="step-body">
        <p class="step-title">Review in Preview</p>
        <p class="step-desc">Spot-check text fit. Re-run if you tweak the md.</p>
      </div>
    </div>
  </div>
</div>
```

**Notes**
- 3–4 steps per slide. More → split across two slides.
- Title is imperative, description is one sentence max.
