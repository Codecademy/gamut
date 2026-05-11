DEPRECATED as a single bundle.

Use the product-specific snapshots shipped next to this file in `@codecademy/gamut/agent-tools`:

- `DESIGN.Codecademy.md` — Core theme (default Codecademy)
- `DESIGN.Admin.md` — Admin theme
- `DESIGN.Platform.md` — Platform theme
- `DESIGN.LXStudio.md` — LX Studio theme
- `DESIGN.Percipio.md` — Percipio theme

Split introduced in https://github.com/Codecademy/gamut/pull/3329.

The YAML frontmatter in each `DESIGN.*.md` is **generated** from `packages/gamut-styles/src/themes/*.ts`. Refresh with `yarn generate-agent-design-docs` (or `yarn nx run gamut-styles:generate-agent-design-docs`). CI fails if snapshots drift.
