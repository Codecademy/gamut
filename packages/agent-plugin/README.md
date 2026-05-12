# Gamut agent plugin

Single editor plugin (**name: `gamut`**) for the [Codecademy Gamut](https://gamut.codecademy.com/) design system. It bundles **rules** and **skills** for consuming `@codecademy/gamut` in applications: core layout/tokens, accessibility, and theming.

**Canonical documentation** (any coding agent, not editor-specific): [AGENTS.md](../../AGENTS.md) and [docs/agents/](../../docs/agents/).

## Canonical docs on GitHub

Published URLs for `main` are defined once in **[`docs/agents/canonical-urls.json`](../../docs/agents/canonical-urls.json)** (`docsAgentsBlobBaseOnMain`, `docsAgentsTreeOnMain`, `githubRepo`).

**Plugin `SKILL.md` files** get their `blob/main` links from that JSON when you run **`yarn generate:agent-skills`** (see below). Do not hand-edit the GitHub base inside generated skills.

## Layout

- **`.cursor-plugin/plugin.json`** — Cursor marketplace / local plugin manifest
- **`.claude-plugin/plugin.json`** — Claude Code plugin manifest (same version as Cursor; keep both in sync)
- **`rules/`** — optional context rules (`.mdc`) with globs
- **`skills/`** — invocable skills; bodies are generated from **`skills/skills.manifest.json`** + **`docs/agents/canonical-urls.json`**
- **`scripts/generate-skills.mjs`** — regenerates packaged skills and monorepo Cursor skills (see [docs/agents/README.md](../../docs/agents/README.md) conventions)

## Regenerating skills

After editing **`skills/skills.manifest.json`**, **`docs/agents/monorepo-skills.manifest.json`**, or **`docs/agents/canonical-urls.json`**, run from the **repository root**:

```bash
yarn generate:agent-skills
# or: node packages/agent-plugin/scripts/generate-skills.mjs
```

Commit updated `SKILL.md` files together with manifest or URL changes.

## Cursor (local symlink)

From the Gamut repo root (`GAMUT_ROOT`):

```bash
mkdir -p ~/.cursor/plugins/local
ln -sfn "$GAMUT_ROOT/packages/agent-plugin" ~/.cursor/plugins/local/gamut
```

Reload the editor window. See [Cursor plugins](https://cursor.com/docs/plugins) for team marketplace setup; point the marketplace at this repo’s [`.cursor-plugin/marketplace.json`](../../.cursor-plugin/marketplace.json).

## Claude Code

Install or reference this directory per [Claude Code plugins](https://code.claude.com/docs/en/plugins). The manifest lives at `.claude-plugin/plugin.json`. Component discovery uses the default `./skills` and `./rules` folders at this plugin root.

## Migrating from old plugins

The previous **three** Cursor plugins (`codecademy-gamut`, `codecademy-gamut-a11y`, `codecademy-gamut-themes`) are replaced by this single **`gamut`** plugin. Remove old symlinks under `~/.cursor/plugins/local/` and link **`gamut`** once as above.

## Versioning

Bump **`version`** in **both** `.cursor-plugin/plugin.json` and `.claude-plugin/plugin.json` together when rules, skills, manifests, or packaged behavior change materially. CI validates manifests and enforces semver bumps on pull requests when this tree changes.
