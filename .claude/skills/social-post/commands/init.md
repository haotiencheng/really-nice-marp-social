---
name: init
description: "First-time setup for really-nice-marp-social. Verifies dependencies, picks a default theme, and offers optional Buffer publish setup."
---

# /init

Interactive setup. Run this once after cloning the repo.

**Usage**
```
/init
```

## Flow

Walk the user through these steps. Ask before each side-effecting step; never silently overwrite existing config.

### 1. Dependency check

Confirm the toolchain is ready:

```bash
command -v bun         # >= 1.1
command -v swift       # bundled with macOS, optional for regenerating default backgrounds
bunx --bun @marp-team/marp-cli --version 2>/dev/null || echo "marp-cli not yet installed"
```

If `bun` is missing, link the user to https://bun.sh/ and stop. If `marp-cli` is not installed, run `bun install` from the repo root.

### 2. Smoke test the renderer

```bash
bun run new init-smoke
bun run render init-smoke
```

Show the user the resulting PNG paths. If render fails, show the marp-cli stderr — do NOT proceed to publish setup until this works.

Clean up afterwards if the user confirms: `rm -rf output/init-smoke`.

### 3. Theme choice

List available themes:

```bash
ls themes/ | grep -v '^_'
```

Ask the user:
- "Use the shipped `default` theme as your default?"
- If no: ask if they want to scaffold a new one now via `/copy-style`, or pick an existing one.

Set the chosen theme as the user's default by writing it to `.rnms.local.json` at the repo root:

```json
{ "default_theme": "default" }
```

(`render-slides.ts` already accepts `--theme`; this file is read by future commands as a per-clone preference.)

### 4. Optional: Buffer publish setup

Ask:
> Want to publish straight to Instagram + Threads from here? It uses Buffer (https://buffer.com) — needs a Buffer account and an access token. Skip if you'd rather post manually.

If **no**: skip to step 5.

If **yes**:

1. Confirm `.env` does not already exist. If it does, read it and only add missing keys — never overwrite existing values.
2. Create `.env` from the template:
   ```bash
   cp docs/env-template.txt .env
   ```
3. Tell the user where to get a Buffer token:
   > Generate a personal access token at https://publish.buffer.com/account/apps. Paste it below and I'll write it to .env.
4. Ask the user to paste the token. **Never echo it back in a log line that ends up in conversation transcripts.** Write it to `.env` via `Edit` (replace the placeholder) — do not pass it on the command line.
5. Copy `.mcp.json.example` → `.mcp.json` if no `.mcp.json` exists. If it does, show the `buffer` server snippet from `.mcp.json.example` and ask the user to merge it manually — do NOT auto-merge.
6. Tell them to restart Claude Code so the Buffer MCP server connects, then run `/publish --list-channels` to verify connectivity.

### 5. Wrap up

Print a short summary:

```
✅ Setup complete.

Next:
  /generate-slide "your topic" — draft a deck
  /copy-style <image>           — clone a visual style
  /publish <post_id>            — push to Buffer (if configured)

Docs: README.md + .claude/skills/social-post/SKILL.md
```

## Rules

- **Never** write secrets to stdout, conversation transcripts, or git-tracked files. `.env` is gitignored — verify with `grep -F .env .gitignore` before writing the token.
- **Never** auto-overwrite `.env` or `.mcp.json` if they exist — always merge or ask.
- The Buffer step is **optional**. Skipping it must leave the skill fully usable for local rendering.
- After running, leave the repo in a state where `bun run render` works without arguments needing the user to remember anything from this session.
