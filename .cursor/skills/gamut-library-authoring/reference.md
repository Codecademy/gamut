# Gamut library authoring — reference

## Token files (read before changing visuals)

- `packages/gamut-styles/src/variables/spacing.ts`
- `packages/gamut-styles/src/variables/colors.ts`
- `packages/gamut-styles/src/variables/typography.ts`
- `packages/gamut-styles/src/variables/borderRadii.ts`

## TypeScript and structure exemplars (`packages/gamut/src`)

| Topic | Files |
| --- | --- |
| Discriminated unions + `never` | `Tag/types.tsx` |
| Variant branches + conflicting props | `Badge/index.tsx` |
| `StyleProps` + `ComponentProps` intersection | `Button/shared/types.ts`, `ButtonBase/ButtonBase.tsx` |
| `ComponentProps<typeof StyledForm>` | `Form/elements/Form.tsx` |
| Multiple `StyleProps` + anchor variants | `Anchor/index.tsx` |
| `variance.compose` for layout system props | `Box/props.ts`, `Layout/LayoutGrid.tsx` |

## VS Code snippets (repo root)

Prefix in editor → choose snippet from `.vscode/stories.code-snippets`:

- `component-story` — `ComponentName.stories.tsx` CSF template
- `component-doc` — `ComponentName.mdx` doc template
- `toc-story` — table-of-contents category page

## Meta / Storybook MDX (human docs)

- Contributing (props JSDoc, tests): `packages/styleguide/src/lib/Meta/Contributing.mdx`
- Stories guide hub: `packages/styleguide/src/lib/Meta/Gamut writing guide/Stories/About.mdx`
- MDX structure: `…/Stories/Component story documentation.mdx`
- `.stories.tsx` patterns: `…/Stories/Component code examples.mdx`
- Building components in Gamut (overview): `packages/styleguide/src/lib/Meta/Gamut writing guide/Building components in Gamut.mdx`
- Meta best practices: `packages/styleguide/src/lib/Meta/Best practices.mdx`
- ColorMode / Background: `packages/styleguide/src/lib/Foundations/ColorMode/ColorMode.mdx`
- System compose (published): Storybook path `/docs/foundations-system-compose--page` on [gamut.codecademy.com](https://gamut.codecademy.com/)

## Figma and package boundaries

Project rule `.cursor/rules/figma-rules.mdc` maps Figma output to `gamut`, `gamut-patterns`, `gamut-icons`, `gamut-illustrations` and token file paths. Align new components with that rule.

## When adding a component (checklist)

1. Search `packages/gamut/src` for something close; extend if possible.
2. Use semantic colors and token scales from `gamut-styles` variables.
3. Model props with `StyleProps` / `ComponentProps` / unions per SKILL.md; export via `packages/gamut/src/index.tsx`.
4. Add `*.stories.tsx` + `*.mdx` under `packages/styleguide/src/lib/<layer>/<Component>/`.
5. Run package-level lint/tests for touched workspaces.

## Theme / mode changes

Document Storybook coverage and any breaking changes for consumers. Platform-specific theme docs live under styleguide Foundations; coordinate with `ColorMode` and theme providers.
