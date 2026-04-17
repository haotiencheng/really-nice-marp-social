# compare

Before/after or mode comparison stack — 2–3 labeled mini-cards.

**Class:** `<!-- _class: compare -->`
**Default background:** `backgrounds/bg-body.png`

## Example

```html
<!-- _class: compare -->

<div class="wrap">
  <div class="eyebrow">Before → After</div>
  <div class="card">
    <div class="compare-stack">
      <div class="mini-card">
        <div class="mini-label">BEFORE</div>
        <div class="mini-body">Hard-coded colors in every layout file. Changing brand meant touching 8 files.</div>
      </div>
      <div class="mini-card">
        <div class="mini-label">AFTER</div>
        <div class="mini-body">Layouts read <code>var(--color-primary)</code>. Swap theme — done.</div>
      </div>
    </div>
  </div>
</div>
```

**Notes**
- 2 minis = before/after. 3 minis = mode A / B / C comparison.
- `<code>` inside `.mini-body` is styled with accent background.
