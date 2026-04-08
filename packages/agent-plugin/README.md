# Gamut agent plugin

Single editor plugin (**name: `gamut`**) for the [Codecademy Gamut](https://gamut.codecademy.com/) design system. It bundles **rules** and **skills** for consuming `@codecademy/gamut` in applications: core layout/tokens, accessibility, and theming.

**Canonical documentation** (any coding agent, not editor-specific): [AGENTS.md](../../AGENTS.md) and [docs/agents/](../../docs/agents/).

## Canonical docs on GitHub

Published markdown under `main` (same content as this repo):

`https://github.com/Codecademy/gamut/blob/main/docs/agents/`

**Skills** embed links under that base. The exact base string is defined once in [`skills/skills.manifest.json`](skills/skills.manifest.json) as `canonicalDocsBase` and applied by the generator below.

## Layout

- **`.cursor-plugin/plugin.json`** — Cursor marketplace / local plugin manifest
- **`.claude-plugin/plugin.json`** — Claude Code plugin manifest (same version as Cursor; keep both in sync)
- **`rules/`** — optional context rules (`.mdc`) with globs
- **`skills/`** — invocable skills; bodies are generated from **`skills.manifest.json`**
- **`scripts/generate-skills.mjs`** — regenerates `skills/*/SKILL.md` from the manifest

## Regenerating skills

After editing **`skills/skills.manifest.json`** (new skill, description, or doc filename), run from the **repository root**:

```bash
yarn generate:agent-skills
# or: node packages/agent-plugin/scripts/generate-skills.mjs
```

Commit the updated `SKILL.md` files together with manifest changes.

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
