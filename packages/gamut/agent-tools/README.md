# Gamut agent tools

Skills, rules, and product design context for AI coding agents (Cursor, Claude Code) working in apps that depend on `@codecademy/gamut`.

## What's here

| Path          | Purpose                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DESIGN.*.md` | Product-specific design context — tokens, semantic roles, patterns — matched to the Gamut theme an app uses. See `DESIGN.md` for which file goes with which theme. |
| `skills/`     | Task playbooks invoked by name for focused work (theming, ColorMode, buttons, layout, forms, auditing, …).                                                         |
| `rules/`      | Always-on guardrails applied to all Gamut code (e.g. accessibility).                                                                                               |

## Using this in an app repo

Install the plugin from the app repo root, with the `--theme` matching that app:

```sh
gamut plugin install cursor --theme <name>
# refresh after upgrading @codecademy/gamut:
gamut plugin update cursor --theme <name> --force
```

This copies the matching `DESIGN.*.md`, `skills/`, and `rules/` into the app repo so the agent can read them directly.

Before large PRs, or when onboarding an existing codebase, run the `gamut-review` skill to audit for Gamut usage — dependencies, setup, import patterns, `styled()` wrapping that bypasses system props, hardcoded colors, bespoke component duplication, and test conventions.

## Full documentation

For the complete setup guide, the artifact-selection table (`DESIGN.md` vs `skills/` vs `rules/`), and the full list of exported skills, see the [Best practices](https://gamut.codecademy.com/?path=/docs-meta-ai-tooling-gamut-plugin-best-practices--page) page in Storybook.
