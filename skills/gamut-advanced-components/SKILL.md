---
name: gamut-advanced-components
description: Advanced patterns, composition, and performance optimization with Gamut
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut'
  audience: advanced-developers
---

## Overview

This skill covers advanced techniques for building with Gamut components. It helps you:

- Build reusable custom components
- Optimize performance (memoization, lazy loading)
- Implement advanced styling and theming
- Create compound component patterns
- Debug and test complex implementations

## Advanced component composition

### Building a custom form component

Create a reusable form component that abstracts common patterns:

```tsx
import { GridForm, Button } from '@codecademy/gamut';
import { ReactNode } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  validation?: Record<string, any>;
  description?: string;
}

interface CustomFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitText?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

export function CustomForm({
  fields,
  onSubmit,
  submitText = 'Submit',
  isLoading = false,
  children,
}: CustomFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <GridForm onSubmit={handleSubmit} fields={fields}>
      {children}
      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        {submitText}
      </Button>
    </GridForm>
  );
}
```

### Creating compound components

Build components that work together for better composability:

```tsx
import { Box, Text, FlexBox } from '@codecademy/gamut';
import { ReactNode, createContext, useContext, useState } from 'react';

interface AccordionContextType {
  openId: string | null;
  onToggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export function Accordion({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openId, onToggle: setOpenId }}>
      <Box>{children}</Box>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  id,
  title,
  children,
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
}) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = context.openId === id;

  return (
    <Box border="1px solid" borderColor="border" borderRadius="md" mb={8}>
      <Box
        p={16}
        bg={isOpen ? 'background-secondary' : 'background'}
        cursor="pointer"
        onClick={() => context.onToggle(isOpen ? '' : id)}
      >
        <Text variant="title-sm">{title}</Text>
      </Box>
      {isOpen && (
        <Box p={16} borderTop="1px solid" borderTopColor="border">
          {children}
        </Box>
      )}
    </Box>
  );
}

// Usage
<Accordion>
  <AccordionItem id="item1" title="What is Gamut?">
    Gamut is Codecademy's design system...
  </AccordionItem>
  <AccordionItem id="item2" title="How do I use it?">
    Install via npm and wrap your app with GamutProvider...
  </AccordionItem>
</Accordion>;
```

## Performance optimization

### Memoization for expensive components

```tsx
import { memo, useMemo } from 'react';
import { Box, Text } from '@codecademy/gamut';

interface DataListItemProps {
  item: any;
  onSelect?: (item: any) => void;
}

// Memoize to prevent unnecessary re-renders
const DataListItem = memo(function DataListItem({
  item,
  onSelect,
}: DataListItemProps) {
  return (
    <Box
      p={12}
      cursor="pointer"
      _hover={{ bg: 'background-secondary' }}
      onClick={() => onSelect?.(item)}
    >
      <Text>{item.name}</Text>
    </Box>
  );
});

export function DataList({ items, onSelect }: any) {
  // Memoize expensive computations
  const sortedItems = useMemo(() => {
    return items.slice().sort((a: any, b: any) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <Box>
      {sortedItems.map((item: any) => (
        <DataListItem key={item.id} item={item} onSelect={onSelect} />
      ))}
    </Box>
  );
}
```

### Lazy loading components

```tsx
import { lazy, Suspense } from 'react';
import { Box, Text } from '@codecademy/gamut';

const HeavyChart = lazy(() => import('./HeavyChart'));
const FeatureShimmer = lazy(() =>
  import('@codecademy/gamut').then((m) => ({ default: m.FeatureShimmer }))
);

export function DashboardPage() {
  return (
    <Box>
      <Text variant="title-lg" mb={24}>
        Dashboard
      </Text>

      <Suspense fallback={<FeatureShimmer width="100%" height={400} />}>
        <HeavyChart />
      </Suspense>
    </Box>
  );
}
```

## Advanced styling patterns

### Creating styled variants

```tsx
import { Box, BoxProps } from '@codecademy/gamut';
import { ReactNode } from 'react';

interface CardVariant {
  elevated?: boolean;
  interactive?: boolean;
  disabled?: boolean;
}

export function StyledCard({
  children,
  elevated = false,
  interactive = false,
  disabled = false,
}: BoxProps & CardVariant & { children: ReactNode }) {
  return (
    <Box
      p={24}
      borderRadius="lg"
      border={elevated ? 'none' : '1px solid'}
      borderColor={elevated ? undefined : 'border'}
      boxShadow={elevated ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'}
      bg={disabled ? 'background-disabled' : 'background'}
      cursor={interactive ? 'pointer' : 'default'}
      opacity={disabled ? 0.6 : 1}
      transition="all 0.2s ease"
      _hover={
        interactive && !disabled
          ? { boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }
          : undefined
      }
    >
      {children}
    </Box>
  );
}
```

### Theme-aware styling

```tsx
import { Box } from '@codecademy/gamut';
import { useContext } from 'react';
import { ThemeContext } from '@codecademy/gamut-styles';

export function ThemedComponent() {
  const theme = useContext(ThemeContext);

  return (
    <Box
      p={16}
      bg={theme.isDark ? 'background-dark' : 'background-light'}
      color={theme.isDark ? 'text-light' : 'text-dark'}
    >
      This component adapts to the current theme
    </Box>
  );
}
```

## Advanced form patterns

### Dynamic field validation

```tsx
import { GridForm } from '@codecademy/gamut';
import { useState } from 'react';

interface DynamicFieldProps {
  fields: any[];
  onValidationChange?: (isValid: boolean) => void;
}

export function DynamicForm({ fields, onValidationChange }: DynamicFieldProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFields = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData.get(field.name);

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.validation) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
    });

    setErrors(newErrors);
    onValidationChange?.(Object.keys(newErrors).length === 0);

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validateFields(formData);

    if (Object.keys(validationErrors).length === 0) {
      // Submit form
    }
  };

  return (
    <GridForm
      onSubmit={handleSubmit}
      fields={fields.map((field) => ({
        ...field,
        error: errors[field.name],
      }))}
    />
  );
}
```

### Conditional field rendering

```tsx
import { GridForm } from '@codecademy/gamut';
import { useState, useMemo } from 'react';

export function ConditionalForm() {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const fields = useMemo(() => {
    const baseFields = [
      { name: 'email', label: 'Email', type: 'email', required: true },
    ];

    if (formValues.email?.includes('@company.com')) {
      baseFields.push({
        name: 'department',
        label: 'Department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'engineering' },
          { label: 'Design', value: 'design' },
          { label: 'Product', value: 'product' },
        ],
      });
    }

    return baseFields;
  }, [formValues.email]);

  return (
    <GridForm
      fields={fields}
      onSubmit={(e) => {
        e.preventDefault();
        // Handle submission
      }}
      onChange={(e) => {
        const formData = new FormData(e.currentTarget);
        setFormValues(Object.fromEntries(formData));
      }}
    />
  );
}
```

## Accessibility-first patterns

### Creating an accessible modal

```tsx
import { Drawer, Overlay, Box, Text, Button } from '@codecademy/gamut';
import { useEffect, useRef } from 'react';

interface AccessibleModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function AccessibleModal({
  isOpen,
  title,
  onClose,
  children,
}: AccessibleModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Drawer
        onRequestClose={onClose}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <Box mb={24}>
          <Text id="modal-title" variant="title-lg">
            {title}
          </Text>
        </Box>

        <Box mb={24}>{children}</Box>

        <Button
          ref={closeButtonRef}
          variant="primary"
          onClick={onClose}
          autoFocus
        >
          Close
        </Button>
      </Drawer>
    </Overlay>
  );
}
```

### Creating accessible data tables

```tsx
import { Box, Text } from '@codecademy/gamut';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  caption: string;
}

export function AccessibleDataTable({
  columns,
  rows,
  caption,
}: DataTableProps) {
  return (
    <Box overflowX="auto" role="region" aria-label={caption}>
      <table style={{ width: '100%' }}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                aria-sort={col.sortable ? 'none' : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={`${idx}-${col.key}`}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
```

## Debugging and troubleshooting

### Component inspection

```tsx
// Add debug utilities to understand component behavior
export function useDebugComponent(name: string, props: any) {
  if (process.env.NODE_ENV === 'development') {
    console.group(`${name} Props`);
    console.log(props);
    console.groupEnd();
  }
}

// Usage in your component
function MyComponent(props: any) {
  useDebugComponent('MyComponent', props);
  return <Box>Component content</Box>;
}
```

### Performance profiling

```tsx
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
};

export function ProfiledComponent() {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <Box>Component to profile</Box>
    </Profiler>
  );
}
```

## Best practices

### Component design principles

1. **Single Responsibility** - Each component should have one primary purpose
2. **Composition over Inheritance** - Build complex UIs by combining simple components
3. **Props API Design** - Keep props simple and intuitive
4. **Type Safety** - Use TypeScript for better developer experience
5. **Accessibility First** - Ensure all components are accessible by default

### Performance guidelines

- Memoize expensive computations
- Use lazy loading for large components
- Minimize re-renders with proper prop dependencies
- Profile your application to identify bottlenecks
- Consider splitting large components into smaller ones

### Testing patterns

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CustomForm', () => {
  test('submits form with valid data', async () => {
    const onSubmit = jest.fn();
    render(
      <CustomForm
        fields={[{ name: 'email', label: 'Email' }]}
        onSubmit={onSubmit}
      />
    );

    const input = screen.getByLabelText('Email');
    await userEvent.type(input, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
    });
  });
});
```

## Resources and references

- **Gamut main skill**: Use for core component documentation
- **Gamut components skill**: For basic component usage
- **Gamut forms skill**: For form-specific patterns
- **React documentation**: https://react.dev (for advanced React patterns)
- **Web Accessibility Guidelines**: https://www.w3.org/WAI/guidelines/ (for accessibility best practices)
