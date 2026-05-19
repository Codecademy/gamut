---
name: gamut-forms
description: Implementing or auditing Gamut forms — GridForm, ConnectedForm, FormGroup, labels, validation. When invoked, read guidelines/components/forms.md first. Pair with gamut-accessibility for non-form widgets.
---

# Gamut forms

## Read first

When this skill applies, read [`guidelines/components/forms.md`](../../guidelines/components/forms.md) before writing code.

Canonical wiring for **`FormGroup`**, **`ConnectedForm`**, **`ConnectedFormGroup`**, **`GridForm`**, and field renderers. Source: **`packages/gamut/src/Form/`**, **`ConnectedForm/`**, **`GridForm/`**.

Universal label and primitive guidance: [`accessibility.mdc`](../../rules/accessibility.mdc) · overlay and composite patterns: [`gamut-accessibility`](../gamut-accessibility/SKILL.md).

---

## Mandatory: use organisms for functional forms

**Functional forms** (submit/save, validation, dirty state) **must** use **`GridForm`** or **`ConnectedForm`**. Do not compose from bare `Input`, `Select`, `Checkbox`, etc.

| Organism        | When                                                     |
| --------------- | -------------------------------------------------------- |
| `GridForm`      | Declarative `fields` + `submit` — settings, CRUD dialogs |
| `ConnectedForm` | Custom layout with managed `react-hook-form` state       |

**Rules:** Always set **`defaultValues`**. Use **`validation="onChange"`** when submit should stay disabled until valid. **`hideLabel: true`** on checkbox/radio fields with no `label`, and on toggle (`custom`) fields where `Toggle` renders its own label.

---

## Prefer connected layouts

For typical product forms, prefer `GridForm` (declarative `fields`, `LayoutGrid`, submit/cancel) or `ConnectedForm` with `ConnectedFormGroup` / `useConnectedForm`. Use raw `FormGroup` + atoms only when the layout is simple and you fully own `id`, `htmlFor`, invalid state, and any `aria-describedby` (see below).

---

## Labels and controls

`htmlFor` / `id` pairing — universal rule in [`accessibility.mdc`](../../rules/accessibility.mdc) (Form label association). Form-specific notes:

- `FormGroupLabel` → control `id` (or stable `name` when that is your field’s id convention).
- Checkbox, Radio, Select: same pairing; checkbox/radio use the visually hidden input pattern from `@codecademy/gamut-styles` where applicable.

---

## `FormGroup` (baseline)

[`FormGroup.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Form/elements/FormGroup.tsx)

- `description` → `FormGroupDescription` with `aria-live="assertive"`.
- `error` (string) → `FormError` with `aria-live="polite"` and `role="alert"`.

Raw `FormGroup` does not set `aria-describedby` or `aria-invalid` on `children`. If you compose fields outside `ConnectedFormGroup` / `GridForm`, wire those yourself or accept that only the live regions above communicate errors/descriptions.

---

## `ConnectedFormGroup`

[`ConnectedFormGroup.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/ConnectedForm/ConnectedFormGroup.tsx)

- Passes `aria-describedby` (error region id when shown) and `aria-invalid` on the rendered field component.
- `FormError`: `aria-live="assertive"` and `role="alert"` only when `isFirstError`; otherwise `aria-live="off"` and `role="status"` so subsequent errors do not interrupt repeatedly.

---

## `GridForm`

[`GridFormInputGroup/index.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/GridForm/GridFormInputGroup/index.tsx) · [`GridFormTextInput`](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/GridForm/GridFormInputGroup/GridFormTextInput/index.tsx)

- Composes `ConnectedForm`, `LayoutGrid`, `GridFormButtons`, and field metadata. `FormError` uses the same first-error assertive pattern as `ConnectedFormGroup` (`aria-live` assertive vs off, `role` alert vs status).
- Built-in text inputs set `aria-invalid` and register with react-hook-form via `register`. Custom / `custom` / `custom-group` renderers must still expose correct `id`, `label`, and error surfacing consistent with this pattern.

---

## Live regions — do not double up

`FormGroup`, `ConnectedFormGroup`, and `GridForm` already render `FormError` (and base `FormGroup` renders `FormGroupDescription`) with live-region attributes. Do not add a second `aria-live` wrapper for the same message stream.

---

## Storybook

- [Organisms / GridForm / About](https://gamut.codecademy.com/?path=/docs-organisms-gridform-about--docs) · [Usage](https://gamut.codecademy.com/?path=/docs-organisms-gridform-usage--docs) · [Validation](https://gamut.codecademy.com/?path=/docs-organisms-gridform-validation--docs) · [Fields](https://gamut.codecademy.com/?path=/docs-organisms-gridform-fields--docs)
- [Organisms / ConnectedForm / ConnectedForm](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-connectedform--docs) · [ConnectedFormGroup](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-connectedformgroup--docs)

---

## Example — baseline `FormGroup`

```tsx
<FormGroup
  htmlFor="email-input"
  description="Used for login"
  error={errors.email}
>
  <FormGroupLabel htmlFor="email-input">Email</FormGroupLabel>
  <Input id="email-input" type="email" />
</FormGroup>
```

When using `ConnectedFormGroup` or `GridForm`, prefer their docs and defaults over hand-rolling the above for every field.
