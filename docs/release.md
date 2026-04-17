# Release Plan

Two release surfaces in parallel:

1. **Claude Code Plugin Marketplace** — install via `/plugin install really-nice-marp-social` (official registry at https://code.claude.com/docs/en/plugin-marketplaces).
2. **skill.sh** — community directory for Claude skills (Vercel-hosted at https://skill.sh).

Both pull from the same `main` branch on GitHub, so a single release = one tagged commit.

---

## 1. Claude Code Plugin Marketplace

### Prerequisites
- Public GitHub repo (`haotiencheng/really-nice-marp-social`)
- `.claude-plugin/plugin.json` manifest (already in repo root)
- SemVer tag (`v0.1.0`, …)
- README with a 5-minute quickstart
- Working example under `examples/` that runs end-to-end with `bun run render`

### Manifest checklist (`.claude-plugin/plugin.json`)
- `name`, `version`, `description` — match `package.json`
- `author`, `homepage`, `repository`, `license`
- `skills[]` — one entry per skill folder in `.claude/skills/`
- `commands[]` — one entry per command markdown
- `requirements` — runtime (`bun`) + external tools (`@marp-team/marp-cli`)

### Submission steps
1. Push a tag: `git tag v0.1.0 && git push --tags`
2. Open the marketplace submission flow (see docs link above for the current form).
3. Provide: repo URL, manifest path (`.claude-plugin/plugin.json`), demo GIF, screenshots.
4. Respond to review feedback (turnaround varies — plan for a week).

### Post-install UX to verify
- `/plugin install really-nice-marp-social` pulls the repo
- `/generate-slide ...` is discoverable in the command list
- SKILL.md is loaded by Claude when the user mentions "slides" / "social post"

---

## 2. skill.sh (Vercel directory)

### Prerequisites
- Same repo
- One extra file: `skill.sh.yaml` (or whatever the current submission format is — verify at https://skill.sh/submit before release)
- A short pitch (80 chars), a 5-slide gif demo, and 3 example outputs

### Pitch (draft)
> Turn a URL or paragraph into an on-brand IG/Threads carousel with Marp + swappable themes.

### Submission steps
1. Fork the skill.sh registry repo (link on their site).
2. Add an entry under `/skills/really-nice-marp-social.md` with:
   - Pitch
   - Install command (`/plugin install …` once the Anthropic marketplace entry is live, else git-clone instructions)
   - Screenshots (4–6 `final_slide.*.png` from `examples/`)
   - GitHub URL
3. Open a PR against the registry.

---

## Pre-release checklist

- [ ] README has install instructions for both marketplace and manual
- [ ] At least 2 themes shipped (`default` + one contrasting, e.g. `midnight` or `editorial`)
- [ ] All 8 layouts have a working example in `examples/`
- [ ] 30-second demo GIF at top of README
- [ ] `bun install && bun run render examples/01-productivity-tips` works from a clean clone
- [ ] LICENSE file (MIT) + `themes/default/backgrounds/LICENSE` for the background images
- [ ] No Canva / Figma proprietary assets re-hosted in the repo

## Version plan

- `v0.1.0` — MVP (3 layouts, `default` theme, `/generate-slide` for text only)
- `v0.2.0` — All 8 layouts + URL input via defuddle + `/copy-style` (solid/gradient modes)
- `v0.3.0` — `/add-branding` + second theme + demo GIF
- `v1.0.0` — Marketplace listing live + skill.sh entry merged

## Ongoing

- Tag releases in lockstep with `package.json` + `plugin.json` versions.
- Keep `CHANGELOG.md` once v0.2 ships.
- Track issues from marketplace users in GitHub Issues; they're the test signal before skill.sh promotion.
