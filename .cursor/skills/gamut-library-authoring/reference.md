# Gamut library authoring — reference

## Token files (read before changing visuals)

- `packages/gamut-styles/src/variables/spacing.ts`
- `packages/gamut-styles/src/variables/colors.ts`
- `packages/gamut-styles/src/variables/typography.ts`
- `packages/gamut-styles/src/variables/borderRadii.ts`

## Canonical MDX sources

- Meta best practices: `packages/styleguide/src/lib/Meta/Best practices.mdx`
- ColorMode / Background: `packages/styleguide/src/lib/Foundations/ColorMode/ColorMode.mdx`
- System compose: Storybook path `/docs/foundations-system-compose--page` on [gamut.codecademy.com](https://gamut.codecademy.com/)

## Figma and package boundaries

Project rule `.cursor/rules/figma-rules.mdc` maps Figma output to `gamut`, `gamut-patterns`, `gamut-icons`, `gamut-illustrations` and token file paths. Align new components with that rule.

## When adding a component (checklist)

1. Search `packages/gamut/src` for something close; extend if possible.
2. Use semantic colors and token scales from `gamut-styles` variables.
3. Add Storybook MDX under `packages/styleguide` with props and usage.
4. Run package-level lint/tests for touched workspaces.

## Theme / mode changes

Document Storybook coverage and any breaking changes for consumers. Platform-specific theme docs live under styleguide Foundations; coordinate with `ColorMode` and theme providers.
