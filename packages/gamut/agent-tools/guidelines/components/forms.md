# Forms

Gamut provides two form organisms — `GridForm` and `ConnectedForm` — that handle layout, validation, submission state, and field registration. Always use one of these organisms for functional forms. Do not compose forms from individual form atoms when the interface needs submit, validation, reset, or dirty tracking.

Related: [`skills/gamut-forms/SKILL.md`](../../skills/gamut-forms/SKILL.md) (accessibility wiring) · [`skills/gamut-accessibility/SKILL.md`](../../skills/gamut-accessibility/SKILL.md) (universal ARIA)

## When to use each

| Component       | Use when                                                                                                                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GridForm`      | Declarative, config-driven form. Pass `fields` (and optional `sections`) plus `submit` — layout, labels, validation, and submit button are automatic. Best for settings pages, profile forms, and CRUD dialogs. |
| `ConnectedForm` | Full layout control with managed form state. Provides `react-hook-form` context; compose with `ConnectedFormGroup` and connected inputs. Best for tabs, custom columns, or content interleaved with fields.     |

## Rules

1. Never use bare form atoms for functional forms. `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`, and `FormGroupLabel` are building blocks _inside_ organisms. Use them standalone only when there is no submit step (e.g. live search filter, immediate callback toggle).
2. Prefer `GridForm` over `ConnectedForm` when the layout fits a grid.
3. Always provide `defaultValues`. Omitting defaults causes uncontrolled-to-controlled warnings and broken resets.
4. Use `validation="onChange"` when the submit button should stay disabled until required fields are valid. Default `"onSubmit"` validates only on submit.
5. `GridForm` sections — use `GridFormSectionProps` (`title`, `as`, `fields`) to group fields under headings in one form, not multiple separate forms.
6. Import connected inputs from `@codecademy/gamut`. `ConnectedInput`, `ConnectedSelect`, `ConnectedCheckbox`, `ConnectedRadioGroup`, `ConnectedTextArea`, `ConnectedFormGroup`, `SubmitButton`.
7. `hideLabel: true` on checkbox/radio fields with no `label`. Without it, `FormGroupLabel` renders a stray "(optional)" or "\*" row above the control.
8. `hideLabel: true` on toggle (`custom` type) fields. `Toggle` renders its own inline label; a `FormGroupLabel` above is redundant.

## GridForm example

```tsx
import { GridForm } from '@codecademy/gamut';

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

## ConnectedForm example (`useConnectedForm`)

Prefer `useConnectedForm` for custom layouts — it types `ConnectedForm` / `ConnectedFormGroup` from `defaultValues` and spreads `connectedFormProps` (defaults + `validationRules`).

```tsx
import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedInput,
  SubmitButton,
  useConnectedForm,
} from '@codecademy/gamut';

export const ProfileForm = () => {
  const { ConnectedFormGroup, ConnectedForm, connectedFormProps } =
    useConnectedForm({
      defaultValues: { displayName: '' },
      validationRules: {
        displayName: { required: 'Display name is required' },
      },
    });

  return (
    <ConnectedForm
      onSubmit={(values) => console.log(values)}
      validation="onChange"
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        name="displayName"
        label="Display Name"
        field={{ component: ConnectedInput }}
      />
      <SubmitButton>Save</SubmitButton>
    </ConnectedForm>
  );
};
```

## Quick reference

| Layer            | Components                                                                                                                                 | When to use directly                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| Organisms        | `GridForm`, `ConnectedForm`                                                                                                                | Always for functional forms            |
| Connected inputs | `ConnectedInput`, `ConnectedSelect`, `ConnectedCheckbox`, `ConnectedRadioGroup`, `ConnectedTextArea`, `ConnectedFormGroup`, `SubmitButton` | Only inside `ConnectedForm`            |
| Atoms            | `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`, `FormGroupLabel`, `FormError`                                             | Standalone display / live filters only |
