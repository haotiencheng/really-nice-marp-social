# editorial layouts

Design-language reference for the `editorial` theme — flat dark canvas, warm linen accent, squiggle underline, magazine spread. All class names live in this theme's `theme.css`; they don't apply to other themes.

**Themes:** `editorial`

Every content slide is either `<!-- _class: ed-cover -->` (opening) or `<!-- _class: page -->` (numbered detail page). Every page carries `.page-mark`, an optional `.squiggle` under the h2, and a `.page-foot` nav bar.

---

## ed-cover — opening spread

```html
<!-- _class: ed-cover -->

<div class="cover-meta">2026 · ISSUE · CAR WASH TEST</div>

<img class="behind-hero" src="spray.svg" />
<img class="claude-mark" src="claude-mark.png" />

<div class="cover-title">
  <h1>The Car<br/>Wash Test</h1>
  <div class="squiggle"></div>
  <p class="lead">AI 的洗車難題<span>2026 年社群瘋傳的 AI 推理測驗。</span></p>
</div>

<div class="page-foot">
  <span class="handle">@projectstain</span>
  <span class="next">next <span class="arrow">→</span></span>
</div>
```

- `cover-meta` = small tracked eyebrow (top-left).
- `behind-hero` + `claude-mark` are optional illustration assets (top-right).
- `.lead span` becomes a muted second line automatically.

---

## page — numbered detail page chrome

```html
<!-- _class: page -->

<div class="page-mark">2</div>

<h2>這題是什麼</h2>
<div class="squiggle"></div>

<!-- body: prose / compare / stats / rows / lst / sidenote -->

<div class="page-foot">
  <span class="handle">@projectstain</span>
  <span class="next">next <span class="arrow">→</span></span>
</div>
```

Everything inside the `section.page` padding is body. Reuse `page-mark`, `squiggle`, `page-foot` on every detail slide.

---

## prose — paragraphs with watermark stat

```html
<div class="prose-stat">5</div>

<div class="prose">
  <p>Opper.ai ran <strong>53 models</strong>, 10 rounds each.</p>
  <p>Only <span class="big">5</span> nailed every round.</p>
</div>
```

- `.prose-stat` is a giant faded numeral behind the text — use a single digit / short number.
- Inside `.prose`: `<strong>`, `.big`, `<em>`, and `<code>` are all styled for you.

---

## compare — two screenshots, ✓ vs ✕

```html
<div class="compare">
  <div class="shot wrong">
    <div class="tag"><div class="mark">✕</div><div class="v">Opus 4.7</div></div>
    <img src="opus47.png" />
  </div>
  <div class="shot right">
    <div class="tag"><div class="mark">✓</div><div class="v">Opus 4.6</div></div>
    <img src="opus46.png" />
  </div>
</div>
```

- `.shot.wrong` uses the warm red (`#d97757`); `.shot.right` uses the linen accent.
- Note: this `.compare` is editorial-specific — for the outlined-card before/after block, see [`compare.md`](compare.md).

---

## stats — numeral + label/description rows

```html
<div class="stats">
  <div class="row">
    <div class="n">11 / 53</div>
    <div class="meta">
      <span class="l">SINGLE ROUND</span>
      <span class="d">Models that got it right on the first try.</span>
    </div>
  </div>
  <div class="row">
    <div class="n">5</div>
    <div class="meta">
      <span class="l">TEN ROUNDS</span>
      <span class="d">Models that never slipped across 10 runs.</span>
    </div>
  </div>
</div>
```

---

## rows — key → value with inline caption

```html
<div class="rows">
  <div class="row"><div class="k">Anthropic</div><div class="v">Claude Opus 4.6<em>4.7 reverted — see card 1.</em></div></div>
  <div class="row"><div class="k">Google</div><div class="v">Gemini 2.0 Flash Lite · 3 Flash · 3 Pro</div></div>
  <div class="row"><div class="k">xAI</div><div class="v">Grok-4</div></div>
</div>
```

`<em>` inside `.v` is styled as a muted caption line — not italicised.

---

## lst — numbered editorial list

```html
<div class="lst">
  <div class="item"><div class="n">1</div><div class="t"><strong>Gricean</strong> pragmatic inference — humans assume the question is non-trivial.</div></div>
  <div class="item"><div class="n">2</div><div class="t">Prompt ordering biases the model toward <code>walk</code>.</div></div>
</div>
```

---

## sidenote — compact notes under prose

```html
<div class="sidenote">
  <div class="note-label">但也不是那麼簡單</div>
  <div class="note"><div class="k">Gricean</div><div class="v">人類假設「你為什麼問這個」有不尋常處。</div></div>
  <div class="note"><div class="k">Prompt</div><div class="v">句構本來就引導走路 — garbage in, garbage out。</div></div>
</div>
```

Use below a `.prose` block when you want to attach 2–3 short glossary-style notes.
