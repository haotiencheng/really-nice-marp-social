---
marp: true
theme: editorial
size: 1080x1350
paginate: false
---

<!-- _class: ed-cover -->

<div class="cover-meta">2026 · ISSUE · CAR WASH TEST</div>

<img class="behind-hero" src="spray.svg" />
<img class="claude-mark" src="claude-mark.png" />

<div class="cover-title">
<h1>The Car<br/>Wash Test</h1>
<div class="squiggle"></div>
<p class="lead">AI 的洗車難題<span>2026 年社群瘋傳的 AI 推理測驗。53 個模型，只有 5 個十輪全中。</span></p>
</div>

<div class="page-foot">
<span class="handle">@projectstain</span>
<span class="next">next <span class="arrow">→</span></span>
</div>

---

<!-- _class: page -->

<div class="page-mark">1</div>

<h2>起點：4.7 輸了？</h2>
<div class="squiggle"></div>

<div class="compare">

<div class="shot wrong">
<div class="tag">
<div class="mark">✕</div>
<div class="v">Opus 4.7</div>
</div>
<img src="opus47.png" />
</div>

<div class="shot right">
<div class="tag">
<div class="mark">✓</div>
<div class="v">Opus 4.6</div>
</div>
<img src="opus46.png" />
</div>

</div>

<div class="source"><strong>Source:</strong> threads.com / @hasanahmad · DXMxoAAFlUd</div>

<div class="page-foot">
<span class="handle">@projectstain</span>
<span class="next">next <span class="arrow">→</span></span>
</div>

---

<!-- _class: page -->

<div class="page-mark">2</div>

<h2>這題是什麼</h2>
<div class="squiggle"></div>

<div class="prose-stat">?</div>

<div class="prose">

<p>題目很簡單：<em>「I want to wash my car. The car wash is 50 meters away. Should I walk or drive?」</em></p>

<p>人類秒懂答案是 <strong>drive</strong>。車要<strong>在現場</strong>才洗得到，人走過去車還停在家裡。<code>50m</code> 是煙霧彈。</p>

<p>Rapidata 調查一萬人，<span class="big">71.5%</span> 答對。<br/>AI 沒這麼簡單。</p>

</div>

<div class="sidenote">
<div class="note-label">但也不是那麼簡單</div>
<div class="note"><div class="k">Gricean</div><div class="v">人類假設「你為什麼問這個」有不尋常處，模型沒這層語用推理。</div></div>
<div class="note"><div class="k">Prompt</div><div class="v">walk/drive 放句尾，句構本來就引導走路——garbage in, garbage out。</div></div>
<div class="note"><div class="k">人類基準</div><div class="v">10,000 人調查沒激勵，28.5% 可能只是亂點。</div></div>
</div>

<div class="page-foot">
<span class="handle">@projectstain</span>
<span class="next">next <span class="arrow">→</span></span>
</div>

---

<!-- _class: page -->

<div class="page-mark">3</div>

<h2>各大模型數據實測</h2>
<div class="squiggle"></div>

<div class="prose-stat">5</div>

<div class="prose">

<p>Opper.ai 用 gateway 跑了 <strong>53 個主流模型</strong>：單輪 + 十輪共 <strong>530 次 API call</strong>。單輪答對 <span class="big">11</span>；十輪都不翻車的，只剩 <span class="big">5</span>個模型。</p>

</div>

<h3 class="sub-h">唯五不敗</h3>

<div class="rows">
<div class="row"><div class="k">Anthropic</div><div class="v">Claude Opus 4.6<em>4.7 反而退步 (見 card 1)。</em></div></div>
<div class="row"><div class="k">Google</div><div class="v">Gemini 2.0 Flash Lite · 3 Flash · 3 Pro</div></div>
<div class="row"><div class="k">xAI</div><div class="v">Grok-4</div></div>
<div class="row"><div class="k">Alibaba</div><div class="v">Qwen 3.5 全系列 5/5<em>thefocus.ai 擴大測試彩蛋。</em></div></div>
</div>

<div class="source"><strong>Source:</strong> opper.ai/blog/car-wash-test</div>

<div class="page-foot">
<span class="handle">@projectstain</span>
<span class="next">next <span class="arrow">→</span></span>
</div>

---

<!-- _class: page -->

<div class="page-mark">4</div>

<h2>所以呢</h2>
<div class="squiggle"></div>

<div class="prose">

<p>這題測的不是 IQ，是模型在<strong>資訊不完整時</strong>，默認常識 vs. 表面 pattern matching 的能力。</p>

<p>下次看到新模型發表，記得掏出<em>洗車泡泡槍</em>問一題。</p>

</div>

<div class="cta">
<div class="cta-q">你都拿什麼題考 AI？</div>
<div class="cta-a">留言分享一題 →</div>
</div>

<div class="page-foot">
<span class="handle">@projectstain</span>
<span class="next">end</span>
</div>
