# timeline

Dated stack — each item has a date chip + title + description. Use for application timeline, milestones, process steps with dates. Add `class="tl-item alert"` for a highlighted warning row (golden accent).

**Class:** content slide (no `_class`)
**Themes:** `cream-blob`
**Item count:** 3–5

## Example

```html
# 重要招募時程

<div class="timeline">
  <div class="tl-item">
    <div class="tl-date"><span class="icon">calendar_month</span> 2–4 月</div>
    <div class="tl-title">申請期間（先到先審）</div>
    <div class="tl-desc">開放線上申請，備齊履歷與作品集。</div>
  </div>
  <div class="tl-item">
    <div class="tl-date"><span class="icon">person_search</span> 3–6 月</div>
    <div class="tl-title">面試階段</div>
    <div class="tl-desc">多輪面試評估技術能力與文化適配。</div>
  </div>
  <div class="tl-item">
    <div class="tl-date"><span class="icon">celebration</span> 7 月 6 日</div>
    <div class="tl-title">正式報到</div>
    <div class="tl-desc">為期 12 個月的實習起點。</div>
  </div>
  <div class="tl-item alert">
    <div class="tl-date"><span class="icon">warning</span> 提醒</div>
    <div class="tl-title">防詐騙</div>
    <div class="tl-desc">招募不會收取任何費用。</div>
  </div>
</div>
```

**Notes**
- Use `tl-item alert` sparingly — one per slide max.
