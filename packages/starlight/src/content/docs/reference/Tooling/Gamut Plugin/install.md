---
title: Install
description: Install and update the Gamut plugin for Cursor or Claude Code from the gamut CLI.
---

The plugin installs agent context — skills and rules. It doesn't add Gamut packages to your app; see the styleguide's own Installation docs for `package.json` setup, and the `gamut-theming` skill for `GamutProvider` setup.

Run commands from your app repository root (or wherever you want `DESIGN.md` copied).

## Install

```sh
# Cursor (default) — skills and rules
gamut plugin install

# Cursor + product DESIGN.md at repo root
gamut plugin install cursor --theme core

# Claude Code + product DESIGN.md
gamut plugin install claude --theme percipio
```

### Options

| Flag              | Purpose                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--scope <scope>` | Cursor only. `all` (default): `skills/` and `rules/`. Or one directory: `skills`, `rules`, or `agents` (reserved; empty today).                          |
| `--theme <theme>` | Copies the matching `DESIGN.*.md` from agent-tools to `./DESIGN.md` at the repo root — product-specific context for agents and the `gamut-review` skill. |
| `--force`         | Overwrites an existing `DESIGN.md` when used with `--theme`.                                                                                             |

`gamut plugin install claude` always registers the full plugin through the Claude marketplace — `--scope` doesn't apply to it.

### DESIGN.md sources

| `--theme`           | Copies from            | Product                   |
| ------------------- | ---------------------- | ------------------------- |
| `core`              | `DESIGN.Codecademy.md` | Codecademy public (Core)  |
| `admin`, `platform` | `DESIGN.Codecademy.md` | Admin / learning platform |
| `percipio`          | `DESIGN.Percipio.md`   | Percipio                  |
| `lxstudio`          | `DESIGN.LXStudio.md`   | LX Studio                 |

Aliases: `codecademy`, `cc`, `lx-studio`. Without `--theme`, `gamut plugin install` skips `DESIGN.md` — the `gamut-review` skill flags it as missing when auditing. As a manual fallback, copy the matching `DESIGN.*.md` to the repo root and rename it to `DESIGN.md`.

## Update and remove

```sh
# Check what is installed
gamut plugin list

# Refresh after @codecademy/gamut updates
gamut plugin update
gamut plugin update cursor --theme core --force

# Remove plugin content from an editor
gamut plugin remove
gamut plugin remove claude
```

## What gets installed

From `packages/gamut/agent-tools/`:

| Directory | Purpose                                                                      |
| --------- | ---------------------------------------------------------------------------- |
| `skills/` | Task playbooks (theming, ColorMode, system props, forms, testing, and more). |
| `rules/`  | Always-on guardrails, like accessibility.                                    |
| `agents/` | Reserved for future Cursor agent definitions; empty in current releases.     |
