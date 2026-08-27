---
title: Building forms
description: Compose form scaffolding, inputs, and ConnectedForm into a working form.
---

## Choosing an approach

Three ways to build a form in Gamut, from most to least opinionated:

- [GridForm](/components/inputs-and-forms/gridform/) — pass a flat array of field objects and get a validated, laid-out form for free. Fastest path for a standard form; reach for this first.
- [ConnectedForm](/components/inputs-and-forms/connectedform/) — compose `ConnectedFormGroup`/`ConnectedFormInputs` yourself, still wired to [react-hook-form](https://react-hook-form.com) validation and state, without GridForm's grid structure. Use this when a form's layout genuinely can't fit GridForm's grid.
- [Form scaffolding](/components/inputs-and-forms/form/) — the raw atoms (`Form`, `FormGroup`, `FormGroupLabel`, `FormGroupDescription`, `FormRequiredText`) with no validation or state wiring at all. Reach for these directly only when an interface needs form-shaped structure without an actual form behind it.

## Building a basic form with GridForm

Pass `fields` — a flat array of plain objects, each with a `type` discriminator — and `submit`:

```tsx
import { GridForm } from '@codecademy/gamut';

export const ContactForm = () => (
  <GridForm
    fields={[
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        validation: { required: 'Enter your name' },
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        validation: {
          pattern: {
            value: /^\S+@\S+$/,
            message: 'Enter a valid email address',
          },
        },
      },
      { type: 'textarea', name: 'message', label: 'Message' },
    ]}
    submit={{ children: 'Send' }}
    onSubmit={(values) => submitContactForm(values)}
  />
);
```

See [GridForm: Reference](/components/inputs-and-forms/gridform/reference/) for every field type, and [GridForm: Patterns](/components/inputs-and-forms/gridform/patterns/) for sections, layout recipes, and state handling.

## Validating fields

Each field's `validation` accepts [react-hook-form](https://react-hook-form.com)'s `RegisterOptions` directly (`required`, `pattern`, `validate`, `minLength`/`maxLength`, `min`/`max`):

```tsx
// Required, with a custom message
{ type: 'text', name: 'email', label: 'Email', validation: { required: 'Please enter your email address' } }

// Custom validate function
{
  type: 'file',
  name: 'upload',
  label: 'Upload',
  validation: {
    validate: (files) => {
      const file = files[0];
      if (!['image/png', 'image/jpeg'].includes(file.type)) return 'PNG or JPEG only';
      return true;
    },
  },
}
```

The form-level `validation` prop controls when validation runs — `"onSubmit"` (default), `"onChange"`, or `"onTouched"`. See [GridForm: Reference](/components/inputs-and-forms/gridform/reference/#validation) for the complete rule catalog.

## Handling submit state

Combine `disableFieldsOnSubmit`, `resetOnSubmit`, and your own `submit.loading` state, driven by your `onSubmit` handler, into a full submit lifecycle:

```tsx
const [loading, setLoading] = useState(false);

<GridForm
  fields={fields}
  submit={{ children: 'Save', loading }}
  disableFieldsOnSubmit
  onSubmit={async (values) => {
    setLoading(true);
    await save(values);
    setLoading(false);
  }}
/>;
```

See [GridForm: Patterns](/components/inputs-and-forms/gridform/patterns/#combining-loading-disabling-and-resetting) for the full recipe.

## When GridForm's grid doesn't fit

Use [ConnectedForm](/components/inputs-and-forms/connectedform/) instead — the same react-hook-form-backed validation and required/disabled state, without GridForm's grid structure. The `useConnectedForm` hook is the entry point:

```tsx
import { ConnectedInput, useConnectedForm } from '@codecademy/gamut';

export const CustomLayoutForm = () => {
  const { ConnectedForm, ConnectedFormGroup, connectedFormProps } =
    useConnectedForm({
      defaultValues: { email: '' },
    });

  return (
    <ConnectedForm
      onSubmit={(values) => submit(values)}
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        name="email"
        label="Email"
        field={{ component: ConnectedInput }}
      />
    </ConnectedForm>
  );
};
```

See [ConnectedForm](/components/inputs-and-forms/connectedform/) for the full pattern, including every connected input type.
