# Agent guidance (Gamut)

Markdown sources for tool-agnostic instructions live in **this directory**. The full topic index and monorepo vs app context are in **[AGENTS.md](../AGENTS.md)** (repo root).

For the packaged **gamut** editor plugin (Cursor / Claude), see **[packages/agent-plugin](../packages/agent-plugin/README.md)**.

**Full path and URL tables** (in-repo map + external docs): [references.md](./references.md).

## Conventions

- **Canonical prose** lives in **`docs/agents/*.md`** (this folder). That is the single source of truth for long-form guidance.
- **`.cursor/skills/*`** (monorepo) — thin discovery files with links into the repo; regenerated from [`monorepo-skills.manifest.json`](monorepo-skills.manifest.json) via `yarn generate:agent-skills`.
- **`packages/agent-plugin/skills/*`** — thin skills for the shipped **`gamut`** plugin; regenerated from [`../../packages/agent-plugin/skills/skills.manifest.json`](../../packages/agent-plugin/skills/skills.manifest.json). GitHub links use [`canonical-urls.json`](canonical-urls.json).
- **Rules** (`.mdc` under `.cursor/rules/` or `packages/agent-plugin/rules/`) — short pointers plus non-negotiable bullets; depth stays in `docs/agents/` where applicable.

## Maintainer note

**Storybook** pages that link to GitHub (e.g. `blob/main` URLs) should stay aligned with [`canonical-urls.json`](canonical-urls.json) when org, repo, or branch conventions change.
