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

## Storybook Documentation

Explore GridForm interactively in Storybook:

- **[GridForm Overview](https://gamut.codecademy.com/?path=/docs/organisms-gridform-about--docs)** - Introduction and basic usage
- **[Field Types](https://gamut.codecademy.com/?path=/docs/organisms-gridform-fields--docs)** - All available field types
- **[Form Layout](https://gamut.codecademy.com/?path=/docs/organisms-gridform-layout--docs)** - Layout options and sections
- **[Validation](https://gamut.codecademy.com/?path=/docs/organisms-gridform-validation--docs)** - Validation patterns and examples
- **[Form States](https://gamut.codecademy.com/?path=/docs/organisms-gridform-states--docs)** - Loading, disabled, and error states

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

## Comprehensive Field Types

GridForm supports **11 field types** via the `fields` prop array. Below is a complete reference.

### Field Configuration Format

All fields in the `fields` array share these common properties:

```typescript
{
  name: string;          // Required - field name
  label?: React.ReactNode;  // Field label
  size: 1-12;           // Grid column width (1-12)
  validation?: RegisterOptions;  // React Hook Form validation
  onUpdate?: (value) => void;    // Callback on value change
  defaultValue?: any;   // Initial value
}
```

### 1. Text Input Fields

Supports all HTML5 input types:

```tsx
{
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' |
        'date' | 'time' | 'search' | 'color',
  name: 'fieldName',
  label: 'Field Label',
  size: 6,
  placeholder: 'Enter value...',
  validation: {
    required: 'This field is required',
    pattern: {
      value: /regex/,
      message: 'Invalid format'
    }
  }
}
```

### 2. Textarea Field

```tsx
{
  type: 'textarea',
  name: 'description',
  label: 'Description',
  size: 12,
  rows: 6,
  placeholder: 'Enter details...',
  validation: {
    required: true,
    minLength: { value: 50, message: 'At least 50 characters' }
  }
}
```

### 3. Select Field

```tsx
{
  type: 'select',
  name: 'country',
  label: 'Country',
  size: 4,
  options: ['', 'USA', 'Canada', 'UK'],  // Array format
  // OR
  options: { low: 1, medium: 2, high: 3 },  // Object format
  validation: { required: 'Please select a country' }
}
```

### 4. Checkbox Field

```tsx
{
  type: 'checkbox',
  name: 'terms',
  description: 'I agree to the terms',  // Checkbox label
  label: 'Agreement',  // Field group label
  size: 6,
  defaultValue: false,
  multiline: true,
  spacing: 'tight',
  validation: { required: 'You must agree' }
}
```

### 5. Radio Group Field

```tsx
{
  type: 'radio-group',
  name: 'experience',
  label: 'Experience Level',
  size: 6,
  options: [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    {
      label: 'Advanced',
      value: 'advanced',
      infotip: { info: 'For experts only' }
    }
  ],
  validation: { required: 'Please select one' }
}
```

### 6. Nested Checkboxes Field

Hierarchical checkbox structures with parent-child relationships:

```tsx
{
  type: 'nested-checkboxes',
  name: 'technologies',
  label: 'Select Technologies',
  size: 12,
  defaultValue: ['react', 'node'],
  options: [
    {
      value: 'frontend',
      label: 'Frontend',
      options: [
        {
          value: 'react',
          label: 'React',
          options: [
            { value: 'nextjs', label: 'Next.js' },
            { value: 'remix', label: 'Remix' }
          ]
        },
        { value: 'vue', label: 'Vue' }
      ]
    },
    {
      value: 'backend',
      label: 'Backend',
      options: [
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' }
      ]
    }
  ]
}
```

### 7. File Upload Field

```tsx
{
  type: 'file',
  name: 'resume',
  label: 'Upload Resume',
  size: 9,
  validation: {
    required: true,
    validate: (files: FileList) => {
      const file = files.item(0);
      const allowedTypes = ['application/pdf', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        return 'Only PDF or JPEG files allowed';
      }
      return true;
    }
  }
}
```

### 8. Custom Field

Complete control over field rendering while maintaining validation:

```tsx
{
  type: 'custom',
  name: 'customField',
  label: 'Custom Input',
  size: 12,
  render: ({ error, setValue, register }) => (
    <Input
      error={!!error}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Custom input"
    />
  ),
  validation: { required: true }
}
```

### 9. Custom Group Field

Custom rendering without FormGroup wrapper:

```tsx
{
  type: 'custom-group',
  name: 'customGroup',
  size: 12,
  render: ({ error, setValue }) => (
    <FormGroup label="Custom Label" width="100%">
      <Input
        error={!!error}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormGroup>
  )
}
```

### 10. Hidden Field

```tsx
{
  type: 'hidden',
  name: 'userId',
  defaultValue: '12345'
}
```

### 11. Sweet Container Field

Honeypot field for spam prevention (invisible to users):

```tsx
{
  type: 'sweet-container',
  name: 'honeypot',
  label: 'Please leave empty',
  defaultValue: ''
}
```

## GridForm Sections

Group related fields with section titles and layouts:

### Section Structure

```tsx
{
  title: 'Section Title',
  as: 'h2' | 'h3' | 'h4',  // Heading element (default: 'h2')
  variant: 'title-xs' | 'title-sm' | 'title-md' | 'title-lg',
  layout: 'center' | 'left',  // Default: 'center'
  titleWrapperProps: { color: 'primary' },  // Box props for title
  fields: [/* field objects */]
}
```

### Center Layout (Default)

Title spans full width, fields below:

```tsx
<GridForm
  fields={[
    {
      title: 'Personal Information',
      as: 'h3',
      variant: 'title-md',
      fields: [
        {
          label: 'First Name',
          name: 'firstName',
          type: 'text',
          size: 6,
          validation: { required: true },
        },
        {
          label: 'Last Name',
          name: 'lastName',
          type: 'text',
          size: 6,
          validation: { required: true },
        },
      ],
    },
  ]}
  submit={{ contents: 'Submit', size: 4 }}
  onSubmit={handleSubmit}
/>
```

### Left Layout

Title in left 3 columns, fields in remaining 9 columns (responsive):

```tsx
{
  title: 'Account Settings',
  layout: 'left',
  variant: 'title-xs',
  fields: [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      size: 4
    }
  ]
}
```

### Multiple Sections

Section breaks automatically appear between sections:

```tsx
<GridForm
  fields={[
    {
      title: 'Personal Info',
      fields: [
        /* fields */
      ],
    },
    {
      title: 'Account Settings',
      fields: [
        /* fields */
      ],
    },
    {
      title: 'Preferences',
      fields: [
        /* fields */
      ],
    },
  ]}
  submit={{ contents: 'Save', size: 4 }}
  onSubmit={handleSubmit}
/>
```

## Advanced Validation

GridForm uses react-hook-form's `RegisterOptions` for powerful validation:

### Built-in Validation Rules

```typescript
validation: {
  required: true | string,
  min: number | { value: number, message: string },
  max: number | { value: number, message: string },
  minLength: number | { value: number, message: string },
  maxLength: number | { value: number, message: string },
  pattern: { value: RegExp, message: string },
  validate: (value) => boolean | string,
  deps: string | string[],  // Re-validate when dependencies change
}
```

### Pattern Validation Examples

```tsx
// Email with custom pattern
{
  name: 'email',
  type: 'email',
  validation: {
    required: 'Email is required',
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
      message: 'Invalid email address'
    }
  }
}

// Password with requirements
{
  name: 'password',
  type: 'password',
  validation: {
    required: true,
    minLength: { value: 8, message: 'Must be 8+ characters' },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Must contain uppercase, lowercase, and number'
    }
  }
}
```

### Custom Validation Functions

```tsx
// File type and size validation
{
  name: 'file',
  type: 'file',
  validation: {
    validate: (files: FileList) => {
      const file = files.item(0);
      if (!file) return 'File is required';

      const allowedTypes = ['application/pdf', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        return 'Only PDF or JPEG files allowed';
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return 'File must be smaller than 5MB';
      }

      return true;
    }
  }
}

// Cross-field validation
{
  name: 'confirmEmail',
  type: 'email',
  validation: {
    required: true,
    validate: (value, formValues) => {
      return value === formValues.email || 'Emails must match';
    },
    deps: ['email']  // Re-validate when email changes
  }
}
```

### Validation Modes

```tsx
<GridForm
  validation="onSubmit" | "onChange" | "onTouched" | "all"
  // onSubmit (default): Validate only on submit
  // onChange: Validate on every change
  // onTouched: Validate after field is touched
  // all: Validate on both change and blur
  fields={fields}
  submit={{
    contents: 'Submit',
    disabled: ({ isValid }) => !isValid  // Disable until valid
  }}
  onSubmit={handleSubmit}
/>
```

## GridForm Props Reference

```typescript
<GridForm
  // Required
  fields={[/* field objects or section objects */]}
  submit={{
    contents: React.ReactNode,
    size: 1-12,
    position: 'left' | 'center' | 'right' | 'stretch',  // Default: 'left'
    type: 'fill' | 'cta',  // Button variant
    disabled: boolean | ((formState) => boolean),
    loading: boolean | ((formState) => boolean),
  }}
  onSubmit={(values) => void | Promise<void>}

  // Optional
  cancel={{
    children: React.ReactNode,
    onClick: () => void,
    href: string,
  }}
  validation="onSubmit" | "onChange" | "onTouched" | "all"
  defaultValues={{ fieldName: value }}
  resetOnSubmit={boolean}  // Reset form after submit
  disableFieldsOnSubmit={boolean}  // Disable all fields during submit

  // Layout
  columnGap={{ _: 8, sm: 32 }}  // Responsive column gap
  rowGap={16}

  // Required text
  hideRequiredText={boolean}
  requiredTextProps={{ color: 'primary' }}

  // Other
  className={string}
/>
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

### Basic contact form with fields array

```tsx
import { GridForm } from '@codecademy/gamut';

function ContactForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Process form data
  };

  return (
    <GridForm
      onSubmit={handleSubmit}
      fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
        },
      ]}
      submitText="Send Message"
    />
  );
}
```

### Form with built-in validation

```tsx
import { GridForm } from '@codecademy/gamut';

function SignupForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Process validated form data
  };

  return (
    <GridForm
      onSubmit={handleSubmit}
      fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          validation: {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address',
          },
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          required: true,
          description: 'Must be at least 8 characters',
          validation: {
            minLength: 8,
            message: 'Password must be at least 8 characters',
          },
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          required: true,
          validation: (value, values) => {
            if (value !== values.password) {
              return 'Passwords must match';
            }
          },
        },
      ]}
      submitText="Sign Up"
    />
  );
}
```

### Form with react-hook-form

```tsx
import { useForm } from 'react-hook-form';
import { GridForm } from '@codecademy/gamut';

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
    <GridForm
      onSubmit={handleSubmit(onSubmit)}
      fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          register: register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }),
          error: errors.email?.message,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          register: register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }),
          error: errors.password?.message,
        },
      ]}
      submitText="Log In"
    />
  );
}
```

### Multi-section form

```tsx
import { GridForm } from '@codecademy/gamut';

function ProfileForm() {
  return (
    <GridForm
      onSubmit={handleSubmit}
      sections={[
        {
          title: 'Personal Information',
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              required: true,
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          title: 'Contact Information',
          fields: [
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              required: true,
            },
            { name: 'phone', label: 'Phone', type: 'tel' },
          ],
        },
      ]}
      submitText="Save Profile"
      cancelText="Cancel"
      onCancel={handleCancel}
    />
  );
}
```

### Form with conditional fields

```tsx
import { useState } from 'react';
import { GridForm } from '@codecademy/gamut';

function SubscriptionForm() {
  const [planType, setPlanType] = useState('free');

  const fields = [
    {
      name: 'plan',
      label: 'Plan Type',
      type: 'radio',
      required: true,
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Pro', value: 'pro' },
      ],
      onChange: (e) => setPlanType(e.target.value),
    },
  ];

  // Add payment fields conditionally
  if (planType === 'pro') {
    fields.push(
      {
        name: 'cardNumber',
        label: 'Card Number',
        type: 'text',
        required: true,
      },
      {
        name: 'expiry',
        label: 'Expiry Date',
        type: 'text',
        placeholder: 'MM/YY',
        required: true,
      }
    );
  }

  return (
    <GridForm onSubmit={handleSubmit} fields={fields} submitText="Subscribe" />
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
