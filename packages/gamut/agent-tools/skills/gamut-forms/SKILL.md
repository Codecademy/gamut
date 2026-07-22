---
name: gamut-forms
description: Use this skill when implementing or auditing Gamut forms — FormGroup, ConnectedForm, ConnectedFormGroup, GridForm, react-hook-form wiring, labels, and accessible error/description regions. Pair with `gamut-accessibility` for non-form widgets and `accessibility.mdc` for universal HTML/ARIA rules.
---

# Gamut forms

Canonical wiring for `FormGroup`, `ConnectedForm`, `ConnectedFormGroup`, `GridForm`, and field renderers. Source: `packages/gamut/src/Form/`, `ConnectedForm/`, `GridForm/`.

Universal label and primitive guidance: [`accessibility.mdc`](../../rules/accessibility.mdc) · overlay and composite patterns: [`gamut-accessibility`](../gamut-accessibility/SKILL.md).

---

## Prefer connected layouts

For typical product forms, prefer `GridForm` (declarative `fields`, `LayoutGrid`, submit/cancel) or `ConnectedForm` with `ConnectedFormGroup` / `useConnectedForm`. Use raw `FormGroup` + atoms only when the layout is simple and you fully own `id`, `htmlFor`, invalid state, and any `aria-describedby` (see below).

---

## Labels and controls

`htmlFor` / `id` pairing — universal rule in [`accessibility.mdc`](../../rules/accessibility.mdc) (Form label association). Form-specific notes:

- `FormGroupLabel` → control `id` (or stable `name` when that is your field’s id convention).
- Checkbox, Select: same pairing; checkbox uses the visually hidden input pattern from `@codecademy/gamut-styles` where applicable.
- Radio: see [`Radio` and `RadioGroup`](#radio-and-radiogroup) below — its label/group wiring differs from a single Checkbox/Select field.

---

## `Radio` and `RadioGroup`

`packages/gamut/src/Form/inputs/Radio.tsx` · `packages/gamut/src/Form/inputs/RadioGroup.tsx` · reference: `packages/styleguide/src/lib/Atoms/FormInputs/Radio/Radio.mdx`

### No `variant`/`size` props — state is derived, not chosen

`Radio` does not take a consumer-facing `variant` or `size` prop. Its visual state is derived internally from the booleans you already pass:

- `error?: boolean` and `disabled?: boolean` (from `BaseInputProps`) feed a `conditionalStyleState(error, disabled)` helper that resolves to `'error' | 'disabled' | undefined`, which is then applied via `variant()` (from `@codecademy/gamut-styles`) on both the input and its label (`conditionalRadioInputStyles` / `conditionalRadioLabelStyles` in `Form/styles/Radio-styles.ts`).
- `error` wins over `disabled` when both are true — do not pass both expecting a combined visual; pick the one that matches the actual field state.
- There is no size scale — all Radio inputs render at a fixed 20×20 indicator. If a design calls for a different size, that's a design deviation to flag, not a prop to reach for.

### Visually-hidden-input pattern

The real `<input type="radio">` (`RadioInput`) is styled with `screenReaderOnly` from `@codecademy/gamut-styles` — it stays in the accessibility tree and keeps native keyboard/focus/change behavior, but is visually hidden. The circle indicator the user sees is rendered on the sibling `RadioLabel`'s `::before` (outer ring) and `::after` (fill dot) pseudo-elements, driven by CSS sibling selectors keyed to the hidden input's `:checked`, `:hover`, and `:focus` state (`InputSelectors.CHECKED_AFTER`, `HOVER_FOCUS_BEFORE`, etc.).

Do not rebuild this with a `className`/inline-`style` override or a separate decorative `<span>` — that duplicates state the hidden input already owns and drifts out of sync on focus/hover/checked. If a design needs a different indicator look, change `Radio-styles.ts`, not the call site.

### Group and label wiring

`RadioGroup` clones its `Radio` children and injects three things you should _not_ also pass on each child: `name`, `onChange`, and `htmlFor` (built from `htmlForPrefix` + child index, e.g. `example-radio-0`). Wire it as:

- `RadioGroup` gets `htmlForPrefix`, `name`, and (optionally) `onChange`/`disabled`/`selected`.
- Each `Radio` gets its own `label`, `value`, and optionally `infotip` — not `name` or `htmlFor`, those come from the parent.
- To label the group itself (not an individual option), wrap `RadioGroup` in `FormGroup` and pass `infotip` to `FormGroup`, not to a `Radio` — `FormGroup` links it via `aria-labelledby` to the group label automatically. Individual `Radio`s can still carry their own `infotip` for per-option context; the two are independent (see the worked example below).

### Example — `RadioGroup` inside `FormGroup`, with mixed InfoTips

```tsx
<FormGroup
  htmlFor="plan-select"
  infotip={{ info: 'Applies to the whole group', placement: 'floating' }}
  label="Select a plan"
>
  <RadioGroup htmlForPrefix="plan-select" name="plan-select">
    <Radio
      label="Pro"
      value="pro"
      infotip={{ info: 'Includes priority support' }}
    />
    <Radio label="Basic" value="basic" />
  </RadioGroup>
</FormGroup>
```

For an error state on the group, pass `error` to each `Radio` (there is no group-level `error` prop on `RadioGroup` itself) and surface the message the same way as any other field — via `FormGroup`'s `error` prop, not a second live region (see [Live regions](#live-regions-do-not-double-up)).

---

## `FormGroup` (baseline)

`packages/gamut/src/Form/elements/FormGroup.tsx`

- `description` → `FormGroupDescription` with `aria-live="assertive"`.
- `error` (string) → `FormError` with `aria-live="polite"` and `role="alert"`.

Raw `FormGroup` does not set `aria-describedby` or `aria-invalid` on `children`. If you compose fields outside `ConnectedFormGroup` / `GridForm`, wire those yourself or accept that only the live regions above communicate errors/descriptions.

---

## `ConnectedFormGroup`

`packages/gamut/src/ConnectedForm/ConnectedFormGroup.tsx`

- Passes `aria-describedby` (error region id when shown) and `aria-invalid` on the rendered field component.
- `FormError`: `aria-live="assertive"` and `role="alert"` only when `isFirstError`; otherwise `aria-live="off"` and `role="status"` so subsequent errors do not interrupt repeatedly.

---

## `GridForm`

`packages/gamut/src/GridForm/GridFormInputGroup/index.tsx` · `packages/gamut/src/GridForm/GridFormInputGroup/GridFormTextInput/index.tsx`

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
