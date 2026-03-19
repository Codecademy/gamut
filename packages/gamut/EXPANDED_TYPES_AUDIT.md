# Gamut dist – components with expanded types (audit)

Components whose `.d.ts` emit **expanded/inlined** types (e.g. `StyledComponent<...>`, long `Pick<DetailedHTMLProps...>`, or `Omit<...>` with hundreds of props) instead of named types. These are harder for consumers to use and extend.

---

## Status (handoff)

**Done (pattern applied, declarations compact):**

- **Buttons** – CTAButton, FillButton, StrokeButton, TextButton, IconButton (see `Button/` and `Button/shared/types.ts` for `ButtonBaseProps`, `ButtonElementProps`)
- **ButtonBase** – `ButtonBase/ButtonBase.tsx` (exported `ButtonBaseProps`, cast to `ForwardRefExoticComponent<...>`)
- **Anchor** – `Anchor/index.tsx` (`AnchorComponentProps`, cast)
- **Text** – `Typography/Text.tsx` (`TextComponentProps`, cast)
- **Layout** – Column, LayoutGrid (`Layout/Column.tsx`, `Layout/LayoutGrid.tsx`)
- **Pagination** – PaginationButton, EllipsisButton (named `PaginationButtonProps` / `EllipsisButtonProps`, cast)
- **Menu** – Menu, MenuItem (`Menu/Menu.tsx`, `Menu/MenuItem.tsx`; `MenuProps` includes `children`)
- **InfoTipButton** – `Tip/InfoTip/InfoTipButton.tsx` (includes `active` in props)
- **ContentContainer, AppWrapper, HiddenText** – cast to `ComponentType<Props>`
- **Tabs** – TabNav, TabButton, TabPanels (cast to `ComponentType<...>`); TabNavLink uses `ComponentProps<typeof StyledTabNavLink>`; `TabButtonProps` has `role?`
- **Form** – TextArea, Select, Checkbox (named props + cast to `ForwardRefExoticComponent<...>`)
- **List** – ListCol, TableHeader, List/Header/ListHeaderCol (cast to `ForwardRefExoticComponent<...>`)

**Not done / reverted:**

- **Box, FlexBox, GridBox** – Reverted. Adding `ComponentPropsWithoutRef<'div'>` (or similar) to `BoxProps` caused conflicts: variance `color` vs HTML `color`, and casting to `ForwardRefExoticComponent<BoxProps>` removed `className`, `role`, `onClick`, etc. from the public type, breaking many usages. Fixing Box properly likely needs a separate strategy (e.g. polymorphic `BoxProps` that merges div props without conflicting keys, or leaving Box as-is for now).

**Blocked / known issues (need resolution before full green build):**

1. **GridForm / ButtonTypes** – `GridFormButtons` expects `ComponentType<ButtonProps>`. After the fix, CTAButton is typed as `ForwardRefExoticComponent<CTAButtonProps & RefAttributes<...>>` with `CTAButtonProps.variant?: 'primary'`, so `ButtonProps` (variant = primary | secondary | danger | interface) is not assignable to `CTAButtonProps`. Options: widen `CTAButtonProps.variant` to match `ButtonBaseProps` for assignability, or change GridForm to accept a looser component type.
2. **IconButton** – Spreading props to `InfoTipButtonBase` triggers a type error: `onAnimationStart` (and similar) from `ButtonElementProps` (button) are not assignable to the styled component’s internal union (button | anchor). May need a more permissive internal props type or a local type assertion where props are spread.

---

## Fix pattern (reference)

1. **Named props** – Define (or extend) an exported props type so the declaration file can reference it instead of inlining:
   - For components that wrap buttons: extend `ButtonBaseProps` and `ButtonElementProps` from `Button/shared/types` (and any component-specific props).
   - For other components: extend appropriate base props and, if needed, `ComponentPropsWithoutRef<'element'>` for DOM props. Avoid extending both a variance/style type and raw HTML props when they share conflicting property names (e.g. `color`).
2. **Component declaration** – Keep the runtime implementation unchanged; add a type assertion so the _declared_ type is compact:
   - `forwardRef` components:  
     `export const Component = Implementation as unknown as ForwardRefExoticComponent<Props & RefAttributes<RefType>>;`
   - Styled / non-ref components:  
     `export const Component = StyledThing as unknown as ComponentType<Props>;`
3. **Refs** – For Box-like primitives that need to accept `ref` and all div props, casting to `ComponentType<Props>` only is too narrow (drops `ref` and other DOM props). Casting to `ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>>` without adding full div props to `Props` then breaks usages that pass `className`, `role`, etc. So either include safe div props in `Props` (without conflicting with variance) or leave the component uncast.
4. **Circular refs** – `Button/shared/types.ts` imports button components for `ButtonTypes`; button components import `ButtonBaseProps`/`ButtonElementProps` from shared. Keep type-only imports where possible to avoid cycles.

---

## Validation steps

After editing source under `packages/gamut/src`:

1. **Emit declarations (no emit to disk for JS):**

   ```bash
   cd packages/gamut && npx tsc --emitDeclarationOnly --project ./tsconfig.lib.json
   ```

   Fix any TypeScript errors before proceeding.  
   **Note:** As of handoff, this command still reports 2 errors (GridForm ButtonTypes, IconButton props). Resolve those before considering the work complete.

2. **Full build (if you have Nx):**

   ```bash
   npx nx run gamut:build
   ```

3. **Spot-check dist** – Open a few `packages/gamut/dist/.../*.d.ts` files that you changed. You should see:

   - `export interface ComponentNameProps extends ... { ... }`
   - `export declare const ComponentName: ForwardRefExoticComponent<ComponentNameProps & RefAttributes<...>>` (or `ComponentType<ComponentNameProps>`)
   - No multi-line `StyledComponent<...>` or giant `Pick<DetailedHTMLProps<...>, "prop1" | "prop2" | ...>` in the main export.

4. **Lint:**

   ```bash
   npx eslint packages/gamut/src/Button/ packages/gamut/src/Anchor/ packages/gamut/src/... --max-warnings 0
   ```

   Fix import order or other lint issues (e.g. unused type imports).

5. **Downstream** – If other apps or packages consume `@codecademy/gamut`, run their type-check or build after changing exported types.

---

## Quick reference – source files already modified

These files already use the named-props + cast pattern. Use them as reference when fixing remaining components:

- `Button/CTAButton.tsx`, `FillButton.tsx`, `StrokeButton.tsx`, `TextButton.tsx`, `IconButton.tsx`
- `Button/shared/types.ts` (defines `ButtonBaseProps`, `ButtonElementProps`)
- `ButtonBase/ButtonBase.tsx`
- `Anchor/index.tsx`
- `Typography/Text.tsx`
- `Layout/Column.tsx`, `Layout/LayoutGrid.tsx`
- `Pagination/PaginationButton.tsx`, `Pagination/EllipsisButton.tsx`
- `Menu/Menu.tsx`, `Menu/MenuItem.tsx`
- `Tip/InfoTip/InfoTipButton.tsx`
- `ContentContainer/index.tsx`, `AppWrapper/index.tsx`, `HiddenText/index.tsx`
- `Tabs/TabNav.tsx`, `Tabs/TabButton.tsx`, `Tabs/TabNavLink.tsx`, `Tabs/TabPanels.tsx`
- `Form/inputs/TextArea.tsx`, `Form/inputs/Select.tsx`, `Form/inputs/Checkbox.tsx`
- `List/ListCol.tsx`, `List/TableHeader.tsx`, `List/Header/ListHeaderCol.tsx`

**Not modified (reverted or skipped):** `Box/Box.tsx`, `Box/FlexBox.tsx`, `Box/GridBox.tsx`, `Box/props.ts`.

---

## High priority – public API (consumers import these)

| Component                       | dist path                                                                 | Issue                                              | Status                                                                               |
| ------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Box**                         | `Box/Box.d.ts`, `Box/FlexBox.d.ts`, `Box/GridBox.d.ts`                    | `StyledComponent<...>` with full div props inlined | **Skipped** – see "Not done / reverted" above; conflicts with variance and DOM props |
| **ButtonBase**                  | `ButtonBase/ButtonBase.d.ts`                                              | Huge union inlined                                 | Done                                                                                 |
| **Anchor**                      | `Anchor/index.d.ts`                                                       | Expanded Omit/RefAttributes                        | Done                                                                                 |
| **Text** (Typography)           | `Typography/Text.d.ts`                                                    | ~380 lines inlined                                 | Done                                                                                 |
| **Column** (Layout)             | `Layout/Column.d.ts`                                                      | ~390 lines inlined                                 | Done                                                                                 |
| **LayoutGrid**                  | `Layout/LayoutGrid.d.ts`                                                  | `StyledComponent<...>`                             | Done                                                                                 |
| **PaginationButton**            | `Pagination/PaginationButton.d.ts`                                        | Omit chain + inner StyledComponents                | Done (outer component only; inner StyledComponents unchanged)                        |
| **EllipsisButton** (Pagination) | `Pagination/EllipsisButton.d.ts`                                          | Omit chain                                         | Done                                                                                 |
| **Menu**                        | `Menu/Menu.d.ts`                                                          | Omit chain                                         | Done                                                                                 |
| **MenuItem**                    | `Menu/MenuItem.d.ts`                                                      | Union + RefAttributes                              | Done                                                                                 |
| **InfoTipButton**               | `Tip/InfoTip/InfoTipButton.d.ts`                                          | Omit chain                                         | Done                                                                                 |
| **ContentContainer**            | `ContentContainer/index.d.ts`                                             | `StyledComponent<...>`                             | Done                                                                                 |
| **AppWrapper**                  | `AppWrapper/index.d.ts`                                                   | `StyledComponent<...>`                             | Done                                                                                 |
| **HiddenText**                  | `HiddenText/index.d.ts`                                                   | `StyledComponent<...>`                             | Done                                                                                 |
| **SkipToContent**               | `SkipToContent/index.d.ts`                                                | May contain StyledComponent                        | Not started; may already be `FC<SkipToContentProps>`                                 |
| **Tabs**                        | `Tabs/TabNav.d.ts`, `TabButton.d.ts`, `TabNavLink.d.ts`, `TabPanels.d.ts` | Multiple `StyledComponent<...>`                    | Done                                                                                 |
| **Form inputs**                 | `Form/inputs/TextArea.d.ts`, `Select.d.ts`, `Checkbox.d.ts`               | Expanded prop types                                | Done                                                                                 |

---

## Medium priority – list/layout primitives

| Component       | dist path                                             | Issue                                               | Status                        |
| --------------- | ----------------------------------------------------- | --------------------------------------------------- | ----------------------------- |
| **ListCol**     | `List/ListCol.d.ts`, `List/Header/ListHeaderCol.d.ts` | Omit + ref; ListColProps may pull in expanded types | Done (component cast applied) |
| **TableHeader** | `List/TableHeader.d.ts`                               | Omit + RefAttributes                                | Done                          |

---

## Lower priority – internal / elements (styled primitives)

These are often used only inside other components; consumers typically rely on the parent’s types. Fix when touching the area or if consumers start importing them.

- **Toggle** – `Toggle/elements.d.ts` (ToggleTrack, Circle, ToggleInput, ToggleLabel)
- **Tag** – `Tag/elements.d.ts` (Outline, TagLabelWrapper, DismissButton, TagAnchor, TagText, icons)
- **Pagination** – inner StyledComponents in `PaginationButton.d.ts`
- **Menu** – `Menu/elements.d.ts` (List, ListItem, ListLink, ListButton)
- **GridForm** – `GridForm/GridFormSections/GridFormSectionBreak.d.ts` (SectionBreak)
- **Video** – `Video/lib/ReactPlayer.d.ts` (ReactVideoPlayer)
- **Form** – `Form/elements/Form.d.ts`, `Form/inputs/Input.d.ts`, `Form/elements/FormGroup.d.ts`, `Form/elements/FormGroupDescription.d.ts`, `Form/styles/shared-system-props.d.ts` (InputWrapper)
- **DataList** – `DataList/Tables/Rows/elements.d.ts` (StyledHeaderRow)
- **Tip** – `Tip/ToolTip/elements.d.ts`, `Tip/InfoTip/styles.d.ts`, `Tip/shared/elements.d.ts`, `Tip/PreviewTip/elements.d.ts`
- **Popover** – `Popover/elements.d.ts`
- **Disclosure** – `Disclosure/elements.d.ts` (DisclosureWrapper, DisclosureButtonWrapper, StyledTextButton, StyledStrokeButton, StyledFillButton, DisclosureBodyWrapper)
- **Alert** – `Alert/elements.d.ts` (AlertBanner, AlertBox, CollapsibleContent, CleanFillButton)
- **Card** – `Card/elements.d.ts` (MotionBox, DynamicCardWrapper, StaticCardWrapper)
- **Modals** – `Modals/elements.d.ts` (ModalContainer)
- **InternalFloatingCard** – `InternalFloatingCard/InternalFloatingCard.d.ts`

---

## Variance/config (optional)

These export parser/variant config types that get inlined; lower impact for typical consumer use:

- `Button/shared/styles.d.ts` (buttonProps)
- `Tabs/props.d.ts` (tabElementBaseProps)
- `Tag/types.d.ts` (tagProps)
- `Box/props.d.ts` (boxProps)

---

## Summary

- **High priority:** 16+ entrypoints. Most are **done**; **Box** (and FlexBox/GridBox) skipped due to type conflicts; **SkipToContent** not yet checked.
- **Medium:** ListCol, TableHeader – **done**.
- **Lower:** Many `*/elements.d.ts` and internal styled components – not started.

**Next steps for the next owner:**

1. Run the **Validation steps** above (tsc, build, spot-check dist, lint).
2. Resolve the two **Blocked / known issues**: GridForm ButtonTypes vs CTAButtonProps variant, and IconButton props spread. Once those are fixed, the build should pass.
3. Optionally tackle **Box** with a different approach (e.g. polymorphic props that avoid `color`/style conflicts, or accept expanded Box declarations for now).
4. Optionally run the full build and commit; update this doc if you change status of any row.
