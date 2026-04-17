#!/usr/bin/env bash
# Bootstrap a fresh post directory with a starter slide.md.
#
# Usage: ./scripts/new-post.sh <post_id>

set -euo pipefail

POST_ID="${1:?Usage: ./scripts/new-post.sh <post_id>}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
POST_DIR="$ROOT/output/$POST_ID"

if [ -e "$POST_DIR" ]; then
  echo "❌ $POST_DIR already exists"
  exit 1
fi

mkdir -p "$POST_DIR"
cat > "$POST_DIR/slide.md" <<'EOF'
---
marp: true
paginate: false
---

<!-- _class: cover -->

<div class="cover-wrap">
  <div class="cover-left">
    <div class="eyebrow">EYEBROW</div>
    <h1>Your big <span class="hl">hook</span> here</h1>
    <p class="lead">One-sentence lead that sets up the deck.</p>
  </div>
</div>

---

<!-- _class: list-3 -->

<div class="wrap">
  <div class="eyebrow">3 takeaways</div>
  <div class="card">

  - First point
  - Second point
  - Third point

  </div>
</div>

---

<!-- _class: closing -->

<div class="closing-wrap">
  <p class="closing-headline">Thanks for reading</p>
  <p class="closing-sub">Follow for more posts like this.</p>
</div>
EOF

echo "✅ Created $POST_DIR/slide.md"
echo "   Render with: bun run scripts/render-slides.ts $POST_ID"
