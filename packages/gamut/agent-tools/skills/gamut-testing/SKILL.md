---
name: gamut-testing
description: Write unit tests for React components that use Gamut. Apply when setting up test files, wrapping components with MockGamutProvider, using setupRtl, or when tests are manually mocking Gamut components instead of using the shared test utilities.
---

# Gamut Testing

Source: `@codecademy/gamut-tests` — [`index.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-tests/src/index.tsx)

---

## Core rule: never mock Gamut components

Do not use `jest.mock('@codecademy/gamut')` or manually mock individual Gamut components in test files. This silently bypasses emotion's theme context, produces tests that can't catch real rendering failures, and requires every test file to maintain its own fragile mock list.

Use `MockGamutProvider` or `setupRtl` — both are designed for exactly this purpose.

---

## What `MockGamutProvider` does

`MockGamutProvider` wraps `GamutProvider` with test-safe settings:

- `useCache={false}` — disables emotion's style injection cache so styles are predictable across tests
- `useGlobals={false}` — disables global CSS (Reboot, Typography, CSS Variables) to avoid side effects between test files
- `theme={coreTheme}` — provides the full Gamut token set so styled components resolve correctly

You should never construct a `GamutProvider` manually in a test. Use `MockGamutProvider`.

---

## Decision guide

| Scenario | Use |
|---|---|
| Standard component unit test | `setupRtl` from `@codecademy/gamut-tests` |
| Test that needs to vary `useLogicalProperties` | `render` + `MockGamutProvider` directly |
| Test that needs `ColorMode` context | `render` + `MockGamutProvider` + `<ColorMode>` |
| Visual test mock / Storybook wrapper | `MockGamutProvider` directly |

---

## `setupRtl` — preferred pattern

`setupRtl` from `@codecademy/gamut-tests` wraps `setupRtl` from `component-test-setup` with `MockGamutProvider` automatically. You do not need to add `MockGamutProvider` yourself.

```tsx
import { setupRtl } from '@codecademy/gamut-tests';

import { MyComponent } from '../MyComponent';

const renderView = setupRtl(MyComponent, {
  label: 'Default label',
  onClick: jest.fn(),
});

it('renders the label', () => {
  const { view } = renderView();
  expect(view.getByText('Default label')).toBeInTheDocument();
});

it('accepts prop overrides', () => {
  const { view } = renderView({ label: 'Override' });
  expect(view.getByText('Override')).toBeInTheDocument();
});
```

`renderView` returns `{ view, props, update }`:
- `view` — RTL `RenderResult` (getByRole, getByText, etc.)
- `props` — the resolved props passed to the component (useful for asserting on jest.fn() mocks)
- `update` — re-render with updated props without remounting

### Accessing mock functions via `props`

```tsx
it('calls onClick when clicked', async () => {
  const { view, props } = renderView();
  await userEvent.click(view.getByRole('button'));
  expect(props.onClick).toHaveBeenCalled();
});
```

---

## `MockGamutProvider` directly — when you need more control

Use `render` + `MockGamutProvider` when `setupRtl` doesn't give enough control over the wrapper — for example, when testing both logical and physical CSS property modes, or when adding `ColorMode`.

```tsx
import { MockGamutProvider } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';

it('uses logical properties when enabled', () => {
  const { container } = render(
    <MockGamutProvider useLogicalProperties>
      <MyComponent width="200px" />
    </MockGamutProvider>
  );
  // assert on inlineSize rather than width
});
```

### Testing both logical and physical property modes

```tsx
describe.each([
  { useLogicalProperties: true, widthProp: 'inlineSize' },
  { useLogicalProperties: false, widthProp: 'width' },
])(
  'useLogicalProperties=$useLogicalProperties',
  ({ useLogicalProperties, widthProp }) => {
    it(`uses ${widthProp}`, () => {
      const { container } = render(
        <MockGamutProvider useLogicalProperties={useLogicalProperties}>
          <MyComponent width="200px" />
        </MockGamutProvider>
      );
      expect(container.firstChild).toHaveStyle({ [widthProp]: '200px' });
    });
  }
);
```

---

## Emotion style assertions

Install `@emotion/jest` matchers once per test file to enable CSS-in-JS assertions:

```tsx
import { matchers } from '@emotion/jest';

expect.extend(matchers);
```

Then assert on styles:

```tsx
expect(element).toHaveStyle({ borderRadius: '2px' });
expect(element).toHaveStyleRule('padding', '1rem');
```

Use `theme` from `@codecademy/gamut-styles` to avoid hardcoding token values:

```tsx
import { theme } from '@codecademy/gamut-styles';

expect(element).toHaveStyle({ columnGap: theme.spacing[40] });
```

---

## Visual test wrappers

When creating mock components for visual tests or Storybook, wrap with `MockGamutProvider` and `ColorMode`:

```tsx
import { MockGamutProvider } from '@codecademy/gamut-tests';
import { ColorMode } from '@codecademy/gamut-styles';

export const MyComponentMock: React.FC<ComponentProps<typeof MyComponent>> = (props) => (
  <MockGamutProvider>
    <ColorMode mode="light">
      <MyComponent {...props} />
    </ColorMode>
  </MockGamutProvider>
);
```

---

## Common anti-patterns

| Anti-pattern | Fix |
|---|---|
| `jest.mock('@codecademy/gamut', () => ({ ... }))` | Remove mock; use `setupRtl` or `MockGamutProvider` |
| `jest.mock('@codecademy/gamut-styles', ...)` | Remove mock; `MockGamutProvider` handles theme context |
| Wrapping with `GamutProvider` directly in tests | Use `MockGamutProvider` — it sets `useCache={false}` and `useGlobals={false}` |
| Repeating `render(<MockGamutProvider>...</MockGamutProvider>)` in every test | Extract with `setupRtl`; define `renderView` once above the `describe` block |
| One `setupRtl` call per `it` block | Define `renderView` once outside `describe`, call it inside each `it` |
| Asserting on raw CSS token strings | Import `theme` from `@codecademy/gamut-styles` and use `theme.spacing[n]`, `theme.fontSize`, etc. |
