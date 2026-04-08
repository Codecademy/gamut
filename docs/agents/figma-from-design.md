# Figma → Gamut implementation

Use this when generating or adapting UI from **Figma** (including Dev Mode and Figma-connected MCP tooling) into the Codecademy **Gamut** design system.

## Mandatory pre-generation steps

**Before writing code:**

1. **Inspect the Figma layer hierarchy** using your Figma tooling (metadata APIs, layer tree, or equivalent). Obtain parent component info and child layers where the integration exposes them.

   - If nested child names (icons, nested components) are missing from metadata, use the design screenshot, infer likely Gamut icons, **search the repo** under `packages/gamut-icons` to confirm exports, then ask the user to confirm icon choices after generating code.
   - Map Figma icon layers to package exports (e.g. `PersonIcon`, `MiniCheckCircleIcon` from `@codecademy/gamut-icons`).

2. **Read these token sources** in the Gamut monorepo (in full):

   - `packages/gamut-styles/src/variables/spacing.ts`
   - `packages/gamut-styles/src/variables/colors.ts`
   - `packages/gamut-styles/src/variables/typography.ts`
   - `packages/gamut-styles/src/variables/borderRadii.ts`

3. **Search the codebase** for an existing component or pattern before adding a new primitive. Prefer extending `packages/gamut/src` over duplicating behavior.

4. **Match existing patterns** — review exemplars such as Badge, Tag, or Button for variance, system props, and `styledOptions` usage.

## Assets

- If Figma or MCP serves real image/SVG assets (including local server URLs), **use those assets**; do not substitute placeholders when a concrete asset URL is provided.

## Package boundaries

- **Components:** `packages/gamut` — prefer documented components when names align with Figma.
- **Patterns:** `packages/gamut-patterns` — page-level compositions; match Figma metadata to pattern components when applicable.
- **Illustrations:** `packages/gamut-illustrations`.
- **Icons:** `packages/gamut-icons` — verify exports exist before importing.

## Styling rules (strict)

### Do not

- Hardcode hex colors for theme surfaces.
- Use CSS properties not supported by Gamut system props without justification.
- Use React `style={{}}` for token-level styling where system props or `css()` apply.

### Do

- Map spacing to tokens from `spacing.ts` (e.g. 4, 8, 12, 16, 24, 32, 40, 48, 64, 96).
- Map type to `typography.ts` (font sizes 14, 16, 18, 20, 22, 26, 34, 44, 64; families `accent`, `base`, `monospace`, `system`; weights and line heights as defined there).
- Map radii to `borderRadii.ts` (`none`, `sm`, `md`, `lg`, `xl`, `full`).
- Use **semantic** color keys (`text`, `background`, `primary`, `border`, …) or documented core names per `colors.ts`; for `Background`, use supported surface names as documented.
- Use Emotion + `@codecademy/gamut-styles`: `styled`, `system.css()`, `variant`, `states`, `variance.compose()` consistent with surrounding code.

If no token fits, add a short comment in code explaining why.

## Accessibility

- Meet WCAG-oriented expectations; align with `packages/styleguide/src/lib/Meta/Best practices.mdx` and component Storybook notes.

## After generating code (checklist)

- [ ] No unintended raw `#` color literals for themed UI
- [ ] No ad hoc `'NNpx'` strings where a spacing or typography token exists
- [ ] Spacing, color, radius, and type align with token files
- [ ] Components follow Gamut patterns (variance, system props, `styledOptions`)
- [ ] No inline styles for design-token-level concerns
- [ ] Uses Emotion styled / `css` patterns like the rest of Gamut

## CodeConnect

Prefer CodeConnect-generated implementations when available for a component.
