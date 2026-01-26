---
name: gamut-forms
description: Build accessible forms using Gamut's GridForm components
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut'
  audience: developers
  type: forms
---

## What I do

I help you build forms using Gamut's GridForm system by providing guidance on:

- Creating structured forms with GridForm
- Using form input components
- Form validation and error handling
- Accessibility best practices for forms
- Form layout and styling
- Integration with form libraries like react-hook-form

## When to use me

Use this skill when you need to:

- Build forms in a Gamut-based application
- Create accessible and well-structured forms
- Implement form validation
- Use different input types (text, checkbox, radio, file, etc.)
- Handle form submission and error states
- Integrate with form state management

## Key concepts

### GridForm Component

GridForm provides a structured layout for forms with automatic spacing and alignment:

```tsx
import { GridForm } from '@codecademy/gamut';

<GridForm onSubmit={handleSubmit}>{/* Form inputs */}</GridForm>;
```

**GridForm props:**

- `onSubmit`: (data: FormData) => void - Form submission handler
- `children`: React.ReactNode - Form inputs and buttons
- All standard `form` element props

### GridFormInputGroup

The main component for form inputs:

```tsx
import { GridFormInputGroup } from '@codecademy/gamut';

<GridFormInputGroup
  name="email"
  label="Email Address"
  type="email"
  required
  placeholder="you@example.com"
  error="Please enter a valid email"
/>;
```

**GridFormInputGroup props:**

- `name`: string (required) - Input name
- `label`: string (required) - Input label
- `type`: string - Input type (text, email, password, etc.)
- `required`: boolean - Whether input is required
- `placeholder`: string - Placeholder text
- `error`: string - Error message to display
- `description`: string - Help text below input
- `disabled`: boolean - Whether input is disabled
- `defaultValue`: string - Default value
- `value`: string - Controlled value
- `onChange`: (e: ChangeEvent) => void - Change handler

### Text Inputs

Basic text input types:

```tsx
// Text input
<GridFormInputGroup
  name="username"
  label="Username"
  type="text"
  required
/>

// Email input
<GridFormInputGroup
  name="email"
  label="Email"
  type="email"
  required
/>

// Password input
<GridFormInputGroup
  name="password"
  label="Password"
  type="password"
  required
/>

// Textarea
<GridFormInputGroup
  name="bio"
  label="Bio"
  type="textarea"
  placeholder="Tell us about yourself"
/>
```

### Checkbox Inputs

Use GridFormCheckboxInput for checkbox inputs:

```tsx
import { GridFormCheckboxInput } from '@codecademy/gamut';

<GridFormCheckboxInput
  name="terms"
  label="I agree to the terms and conditions"
  required
/>

// Multiple checkboxes
<GridFormCheckboxInput
  name="interests"
  label="What are you interested in?"
  options={[
    { label: 'Web Development', value: 'web' },
    { label: 'Data Science', value: 'data' },
    { label: 'Mobile Development', value: 'mobile' },
  ]}
/>
```

### Radio Group Inputs

Use GridFormRadioGroupInput for radio button groups:

```tsx
import { GridFormRadioGroupInput } from '@codecademy/gamut';

<GridFormRadioGroupInput
  name="experience"
  label="Experience Level"
  required
  options={[
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ]}
/>;
```

### File Inputs

Use GridFormFileInput for file uploads:

```tsx
import { GridFormFileInput } from '@codecademy/gamut';

<GridFormFileInput name="avatar" label="Profile Picture" accept="image/*" />;
```

### Hidden Inputs

Use GridFormHiddenInput for hidden values:

```tsx
import { GridFormHiddenInput } from '@codecademy/gamut';

<GridFormHiddenInput name="userId" value={currentUserId} />;
```

### Form Buttons

Use GridFormButtons for form actions:

```tsx
import { GridFormButtons } from '@codecademy/gamut';

<GridFormButtons
  submitText="Create Account"
  cancelText="Cancel"
  onCancel={handleCancel}
/>;
```

**GridFormButtons props:**

- `submitText`: string - Submit button text
- `cancelText`: string - Cancel button text (optional)
- `onCancel`: () => void - Cancel handler (optional)
- `submitDisabled`: boolean - Disable submit button
- `cancelDisabled`: boolean - Disable cancel button

## Common patterns

### Basic contact form

```tsx
import {
  GridForm,
  GridFormInputGroup,
  GridFormButtons,
} from '@codecademy/gamut';

function ContactForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Process form data
  };

  return (
    <GridForm onSubmit={handleSubmit}>
      <GridFormInputGroup name="name" label="Name" type="text" required />

      <GridFormInputGroup name="email" label="Email" type="email" required />

      <GridFormInputGroup
        name="message"
        label="Message"
        type="textarea"
        required
      />

      <GridFormButtons submitText="Send Message" />
    </GridForm>
  );
}
```

### Form with validation

```tsx
import { useState } from 'react';

function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newErrors: Record<string, string> = {};

    const email = formData.get('email') as string;
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    const password = formData.get('password') as string;
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
  };

  return (
    <GridForm onSubmit={handleSubmit}>
      <GridFormInputGroup
        name="email"
        label="Email"
        type="email"
        required
        error={errors.email}
      />

      <GridFormInputGroup
        name="password"
        label="Password"
        type="password"
        required
        error={errors.password}
        description="Must be at least 8 characters"
      />

      <GridFormButtons submitText="Sign Up" />
    </GridForm>
  );
}
```

### Form with react-hook-form

```tsx
import { useForm } from 'react-hook-form';
import {
  GridForm,
  GridFormInputGroup,
  GridFormButtons,
} from '@codecademy/gamut';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <GridForm onSubmit={handleSubmit(onSubmit)}>
      <GridFormInputGroup
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        label="Email"
        type="email"
        error={errors.email?.message}
      />

      <GridFormInputGroup
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        label="Password"
        type="password"
        error={errors.password?.message}
      />

      <GridFormButtons submitText="Log In" />
    </GridForm>
  );
}
```

### Multi-section form

```tsx
function ProfileForm() {
  return (
    <GridForm onSubmit={handleSubmit}>
      <Text variant="title-md">Personal Information</Text>

      <GridFormInputGroup
        name="firstName"
        label="First Name"
        type="text"
        required
      />

      <GridFormInputGroup
        name="lastName"
        label="Last Name"
        type="text"
        required
      />

      <Box mt={32}>
        <Text variant="title-md">Contact Information</Text>
      </Box>

      <GridFormInputGroup name="email" label="Email" type="email" required />

      <GridFormInputGroup name="phone" label="Phone" type="tel" />

      <GridFormButtons
        submitText="Save Profile"
        cancelText="Cancel"
        onCancel={handleCancel}
      />
    </GridForm>
  );
}
```

### Form with conditional fields

```tsx
function SubscriptionForm() {
  const [planType, setPlanType] = useState('free');

  return (
    <GridForm onSubmit={handleSubmit}>
      <GridFormRadioGroupInput
        name="plan"
        label="Plan Type"
        required
        options={[
          { label: 'Free', value: 'free' },
          { label: 'Pro', value: 'pro' },
        ]}
        onChange={(e) => setPlanType(e.target.value)}
      />

      {planType === 'pro' && (
        <>
          <GridFormInputGroup
            name="cardNumber"
            label="Card Number"
            type="text"
            required
          />

          <GridFormInputGroup
            name="expiry"
            label="Expiry Date"
            type="text"
            placeholder="MM/YY"
            required
          />
        </>
      )}

      <GridFormButtons submitText="Subscribe" />
    </GridForm>
  );
}
```

## Accessibility

GridForm components follow accessibility best practices:

1. **Labels are always associated with inputs** using `htmlFor` and `id`
2. **Required fields are marked** with `aria-required`
3. **Error messages are announced** with `aria-invalid` and `aria-describedby`
4. **Help text is linked** to inputs with `aria-describedby`
5. **Radio groups use proper ARIA** roles and attributes

### Error announcements

Error messages are automatically announced to screen readers:

```tsx
<GridFormInputGroup
  name="email"
  label="Email"
  type="email"
  required
  error="Please enter a valid email address"
  // Automatically adds aria-invalid and aria-describedby
/>
```

### Required field indicators

```tsx
<GridFormInputGroup
  name="email"
  label="Email"
  type="email"
  required // Adds visual and programmatic required indicator
/>
```

## Best practices

1. **Always provide labels** for all form inputs
2. **Use appropriate input types** (email, tel, url, etc.) for better mobile UX
3. **Show clear error messages** that explain how to fix the problem
4. **Use help text** to provide additional context before errors occur
5. **Disable submit button** during form submission to prevent double-submits
6. **Validate on submit** rather than on every keystroke for better UX
7. **Group related fields** using headings or visual separation
8. **Provide clear button text** that describes the action

## Dependencies

GridForm is part of `@codecademy/gamut`:

```bash
yarn add @codecademy/gamut
```

Requires:

- `react` ^17.0.2 || ^18.2.0
- `react-dom` ^17.0.2 || ^18.2.0
- `@emotion/react` ^11.4.0
- `@emotion/styled` ^11.3.0

For enhanced form handling, consider:

- `react-hook-form` ^7.65.0 (already included in gamut dependencies)
