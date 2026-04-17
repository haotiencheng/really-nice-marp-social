---
name: publish
description: "Publish a rendered post to Instagram + Threads via Buffer MCP. Optional — requires Buffer setup from /init."
---

# /publish

Push `output/<post_id>/final_slide.*.png` + `caption.txt` + `threads_reply.txt` (optional) to Buffer for IG / Threads.

**Usage**
```
/publish <post_id> [--mode queue|draft|schedule] [--at "2026-04-20T17:00:00+08:00"]
/publish --list-channels        # connectivity test
```

## Prerequisites

- `/init` completed and Buffer setup chosen.
- `BUFFER_ACCESS_TOKEN` set in `.env`.
- Buffer MCP server present in `.mcp.json` and Claude Code restarted.
- `output/<post_id>/final_slide.*.png` exists (run `/generate-slide` first).

If any of the above is missing, abort with a one-line hint pointing at `/init`.

## Flow

### 1. Connectivity check

```
mcp__buffer__list_channels
```

Cache the channel IDs for IG and Threads (the user may have multiple — ask which to use if more than one of each platform).

### 2. Validate the post

- Read `output/<post_id>/caption.txt` (must exist).
- Read `output/<post_id>/threads_reply.txt` if present — split on `---` separators for multiple threads.
- List `output/<post_id>/final_slide.*.png` in sorted order.
- Reject if PNG count > 10 (IG carousel limit) or 0.

### 3. Upload images

Buffer expects public URLs, not local files. Two options:

- **MCP-native upload**: if the Buffer MCP server exposes an upload tool, use it.
- **Pre-upload to a static host**: if the user has configured one (e.g. R2, S3), upload there first and use the public URLs. Default: ask the user to provide URLs or to configure a host before retry.

Do NOT silently upload to a third-party host the user hasn't approved.

### 4. Compose the post

```json
{
  "text": "<caption.txt contents>",
  "assets": { "images": ["<url-1>", "<url-2>", "..."] },
  "metadata": {
    "instagram": { "type": "post", "shouldShareToFeed": true },
    "threads": {
      "thread": [
        { "text": "<caption.txt contents>", "assets": { "images": ["<url-1>", "..."] } },
        { "text": "<reply 1 from threads_reply.txt>" },
        { "text": "<reply 2>" }
      ]
    }
  }
}
```

**Critical:** Threads needs images in `thread[0].assets`, not just top-level `assets` — top-level alone gets dropped by Threads when thread replies are present. Both must contain the same image URLs.

### 5. Schedule

| Mode | Buffer field |
|------|--------------|
| `queue` (default) | `mode: "addToQueue"` |
| `draft` | `mode: "addToQueue"`, `saveToDraft: true` |
| `schedule --at <ISO>` | `mode: "customScheduled"`, `dueAt: "<ISO>"` |

All times in **GMT+8 (Asia/Taipei)** unless the user specifies otherwise. Use `+08:00` ISO offset.

### 6. Publish + verify

Call `mcp__buffer__create_post` once per channel (IG and Threads separately if Buffer doesn't support multi-channel in one call). Print Buffer's response IDs back to the user with the public Buffer URL for each post so they can review before it goes live.

## Rules

- **Never** publish without confirming the user wants to (`mode: queue` is still scheduled). Always show the caption + thread previews and ask "send?" before calling `create_post`.
- **Never** include URLs in the IG/Threads main post text — links must go in thread replies (Threads strips them from main post; IG doesn't render links anyway).
- **Never** post if any URL in the threads body returns non-200 — pre-validate with `curl -sI`.
- If the Buffer MCP server is not loaded (deferred tool not available), abort and tell the user to restart Claude Code after running `/init`.
