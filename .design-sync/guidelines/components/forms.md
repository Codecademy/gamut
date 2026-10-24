# Forms (Mandatory)

Gamut provides two form **organisms** — `GridForm` and `ConnectedForm` — that handle layout, validation, submission state, and field registration out of the box. **Always use one of these organisms to build forms.** Do not compose forms from individual form atoms (`Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`, `FormGroupLabel`, etc.) when the interface needs to support standard form behavior (validation, submission, reset, dirty tracking).

## When to use each

| Component       | Use when                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GridForm`      | You want a **declarative, config-driven** form. Pass an array of `fields` (and optional `sections`) and a `submit` config — `GridForm` renders the layout, labels, validation, and submit button automatically. Best for standard settings pages, profile forms, and CRUD dialogs.                                                                                     |
| `ConnectedForm` | You need **full control over layout** but still want managed form state. `ConnectedForm` provides the `react-hook-form` context; you compose the body with `ConnectedFormGroup` and connected inputs (`ConnectedInput`, `ConnectedSelect`, `ConnectedCheckbox`, `ConnectedRadioGroup`, `ConnectedTextArea`) plus `SubmitButton`. Best for complex or non-grid layouts. |

## Rules

1. **Never use bare form atoms for functional forms.** Components like `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`, and `FormGroupLabel` are the building blocks _inside_ `GridForm` and `ConnectedForm`. Only use them as **standalone display elements** when the interface does not need form submission, validation, or state management (e.g., a lone search filter input, a standalone toggle that fires an immediate callback).
2. **Prefer `GridForm` over `ConnectedForm`** when the form layout fits a grid. `GridForm` is higher-level and requires less boilerplate — you declare fields as a config array and get layout, validation, required-text, and submit handling for free.
3. **Use `ConnectedForm` when layout requirements exceed a grid.** If fields need to be arranged in tabs, split across columns with custom headings, or interleaved with non-form content, use `ConnectedForm` with its connected inputs.
4. **Always provide `defaultValues`.** Both organisms support `defaultValues` for reliable reset and dirty-state behavior. Omitting defaults leads to uncontrolled-to-controlled warnings and broken resets.
5. **Use `validation="onChange"` for immediate feedback.** When you want the submit button to stay disabled until all required fields are valid, pass `validation="onChange"`. The default mode (`"onSubmit"`) only validates on submit.
6. **`GridForm` sections** — use `GridFormSectionProps` (with `title`, `as`, `fields`) to group related fields under headings within a single form, rather than splitting into multiple separate forms.
7. **Import connected inputs from `@codecademy/gamut`.** All connected field components (`ConnectedInput`, `ConnectedSelect`, `ConnectedCheckbox`, `ConnectedRadioGroup`, `ConnectedTextArea`, `ConnectedFormGroup`, `SubmitButton`) are exported from the top-level `@codecademy/gamut` package.
8. **Always set `hideLabel: true` on checkbox and radio-group fields that have no `label`.** Gamut's `FormGroupLabel` automatically appends "(optional)" to non-required fields and "\*" to required fields. When a field (e.g., a checkbox using only `description`) has no meaningful `label` text, the label row still renders with just the "(optional)" or required indicator — producing a stray marker above the input. Always pass `hideLabel: true` on such fields to suppress the empty label row.
9. **Always set `hideLabel: true` on toggle (`custom` type) fields.** Gamut's `Toggle` component renders its own inline label via the `label` prop. A `FormGroupLabel` above a toggle is redundant and visually noisy. Always pass `hideLabel: true` on any `GridForm` or `ConnectedFormGroup` field that renders a `Toggle`, so the toggle's built-in label is the only one displayed.

## GridForm example (settings page)

```tsx
import { GridForm } from '@codecademy/gamut';
import type { GridFormProps } from '@codecademy/gamut';

<GridForm
  fields={[
    {
      title: 'General',
      as: 'h2',
      variant: 'title-sm',
      fields: [
        {
          name: 'orgName',
          label: 'Organization Name',
          type: 'text',
          size: 6,
          defaultValue: 'Acme Corp',
        },
        {
          name: 'timezone',
          label: 'Timezone',
          type: 'select',
          size: 6,
          options: ['UTC', 'US/Eastern', 'US/Pacific'],
          defaultValue: 'UTC',
        },
      ],
    },
    {
      title: 'Notifications',
      as: 'h2',
      variant: 'title-sm',
      fields: [
        {
          name: 'emailNotifs',
          description: 'Receive email notifications',
          type: 'checkbox',
          size: 12,
          defaultValue: true,
          hideLabel: true,
        },
      ],
    },
  ]}
  submit={{ contents: 'Save Settings', size: 12 }}
  onSubmit={(values) => console.log(values)}
  validation="onChange"
/>;
```

## ConnectedForm example (custom layout)

```tsx
import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedInput,
  ConnectedSelect,
  SubmitButton,
} from '@codecademy/gamut';

<ConnectedForm
  defaultValues={{ displayName: '', language: 'en' }}
  onSubmit={(values) => console.log(values)}
  validation="onChange"
>
  <ConnectedFormGroup name="displayName" label="Display Name">
    <ConnectedInput name="displayName" />
  </ConnectedFormGroup>
  <ConnectedFormGroup name="language" label="Language">
    <ConnectedSelect name="language" options={['en', 'es', 'fr']} />
  </ConnectedFormGroup>
  <SubmitButton>Save</SubmitButton>
</ConnectedForm>;
```

## Quick reference: form atoms vs. organisms

| Layer                                         | Components                                                                                                                                 | When to use directly                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **Organisms** (use these)                     | `GridForm`, `ConnectedForm`                                                                                                                | Always, for any functional form                                         |
| **Connected inputs** (inside `ConnectedForm`) | `ConnectedInput`, `ConnectedSelect`, `ConnectedCheckbox`, `ConnectedRadioGroup`, `ConnectedTextArea`, `ConnectedFormGroup`, `SubmitButton` | Only inside a `ConnectedForm` wrapper                                   |
| **Atoms** (avoid for forms)                   | `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`, `FormGroupLabel`, `FormError`                                             | Only as standalone display elements outside of form submission contexts |

## Labels and live regions (accessibility wiring)

- `FormGroupLabel` needs `htmlFor` pointing at the control's `id` (or a stable `name` used as the field's id convention). Checkbox/Radio/Select follow the same pairing.
- Raw `FormGroup`'s `description` renders as `FormGroupDescription` with `aria-live="assertive"`; `error` renders as `FormError` with `aria-live="polite"` and `role="alert"`. It does **not** set `aria-describedby`/`aria-invalid` on children — wire those yourself if composing fields outside `ConnectedFormGroup`/`GridForm`.
- `ConnectedFormGroup` passes `aria-describedby` (error region id when shown) and `aria-invalid` on the rendered field automatically. `FormError` is `aria-live="assertive"` + `role="alert"` only when `isFirstError`; otherwise `aria-live="off"` + `role="status"` so subsequent errors don't interrupt repeatedly. `GridForm` follows the same first-error-assertive pattern.
- **Do not add a second `aria-live` wrapper** for the same message stream — `FormGroup`/`ConnectedFormGroup`/`GridForm` already render one.

```jsx
<FormGroup
  htmlFor="email-input"
  description="Used for login"
  error={errors.email}
>
  <FormGroupLabel htmlFor="email-input">Email</FormGroupLabel>
  <Input id="email-input" type="email" />
</FormGroup>
```

When using `ConnectedFormGroup` or `GridForm`, prefer their defaults over hand-rolling the above for every field.
