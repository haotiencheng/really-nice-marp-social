---
marp: true
theme: notebook
size: 1080x1350
paginate: false
---

<!-- _class: cover -->

<div class="cover">
<div class="cover-left">
<div class="eyebrow">CLAUDE CODE TIPS</div>
<h1>我怎麼管理<br/><span class="hl">Custom Skills</span></h1>
<p class="lead">分成兩層，全域 + 專案<br/>再也不會搞混 ✌️</p>
<div class="tag">Global &nbsp;·&nbsp; Project</div>
</div>

<div class="cover-visual">
<div class="float-card card-a">
<div class="icon-box big"><img src="claude.svg" /></div>
<div class="fc-title">Global Skills</div>
<div class="fc-sub">跨專案共用</div>
</div>
<div class="float-card card-b">
<div class="icon-box big"><img src="instagram.svg" /></div>
<div class="fc-title">Project Skills</div>
<div class="fc-sub">專案內版控</div>
</div>
</div>
</div>

---

<div class="wrap">

<div class="page-num">01 / 03</div>
<div class="eyebrow">GLOBAL SKILLS — 全域層級</div>

<div class="card">
<div class="card-head">
<div class="icon-box"><img src="claude.svg" /></div>
<div>
<div class="card-title">全域 Skills</div>
<div class="card-sub">任何專案都能用</div>
</div>
</div>

- `/cron-manager`
  管理排程任務，搭配 macOS cron + plist
- `/transcribe`
  串接 Cloudflare Workers AI whisper，語音轉文字
- `/telegram-notify`
  離開電腦時推播進度到 Telegram

</div>

</div>

---

<div class="wrap">

<div class="page-num">02 / 03</div>
<div class="eyebrow">PROJECT SKILLS — 專案層級</div>

<div class="card">
<div class="card-head">
<div class="icon-box"><img src="instagram.svg" /></div>
<div>
<div class="card-title">專案 Skills</div>
<div class="card-sub">slide-workflow 為例</div>
</div>
</div>

- `/slide-fetch-positions`
  爬取外商職缺，自動篩選驗證
- `/slide-mocky-slide-generation`
  職缺連結 → 投影片 → 發布
- `/slide-answer-question`
  讀取貼文內容，回覆粉絲提問
- `/slide-validate-post`
  多來源交叉驗證，確保資訊正確

</div>

</div>

---

<div class="wrap">

<div class="page-num">03 / 03</div>
<div class="eyebrow">WHY THIS WORKS</div>

<div class="card">
<div class="card-head">
<div class="icon-box"><img src="git.svg" /></div>
<div>
<div class="card-title">這樣做的好處</div>
<div class="card-sub">管理 + 版控一次搞定</div>
</div>
</div>

- 命名規則 `{專案名}-{skill名}`
  一目瞭然，不怕撞名
- 專案 skills 放 `/.claude/skills/`
  跟著 git 走，團隊同步零成本
- 全域歸全域、專案歸專案
  不會搞混

</div>

</div>

---

<style scoped>
section { text-align: center; }
.card { width: 680px; margin: 0 auto; align-items: center; text-align: center; }
.card img { margin: 0 auto; display: block; }
</style>

<div class="card">
<img src="qr_apply.png" width="200" height="200" />
<div style="font-size: 28px; color: #1b5068; font-weight: 600;">reallyniceday.com/contact</div>
<div style="font-size: 26px; color: #3a3a3a; line-height: 1.6;">想聊 Custom Skills、Claude Code 工作流<br/>或任何 AI 自動化的問題，都歡迎！</div>
</div>
