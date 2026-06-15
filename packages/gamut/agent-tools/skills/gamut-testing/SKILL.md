---
name: gamut-testing
description: Use this skill when writing or fixing unit tests for React components that use Gamut — prefer setupRtl from @codecademy/gamut-tests, harness patterns for useLogicalProperties and ColorMode, RTL/dir testing, emotion matchers, or removing jest.mock of @codecademy/gamut / gamut-styles.
---

# Gamut Testing

Source: `@codecademy/gamut-tests` — [`index.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-tests/src/index.tsx)

---

---

## What `MockGamutProvider` does (under `setupRtl`)

`MockGamutProvider` forwards to `GamutProvider` with:

- `useCache={false}` — stable Emotion output across tests
- `useGlobals={false}` — no global Reboot/Typography bleed between files
- `theme={theme}` — full token theme for styled components
- Optional `useLogicalProperties` — forwarded for logical vs physical CSS in variance

You normally do not import `MockGamutProvider` for plain component tests; `setupRtl` already wraps the component under test once. Import it inside a harness when the SUT needs a non-default provider flag or extra wrappers (see below).

---

## Decision guide

| Scenario                                                         | Prefer                                                                                                                                                                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Default unit test for a Gamut (or app) component                 | `setupRtl(Component, defaultProps)` once per file / describe                                                                                                                                                                   |
| Vary `useLogicalProperties` across cases                         | Harness that accepts `useLogicalProperties` and wraps `MockGamutProvider`, then `setupRtl(Harness, defaults)`; pass overrides per `it` / `describe.each`                                                                       |
| Need `ColorMode` (or other context) around the SUT               | Harness with `<ColorMode>` inside the tree, then `setupRtl(Harness)` — no need for raw `render` unless you are testing the provider itself                                                                                     |
| `dir` / RTL behavior (e.g. mirrored layout, `useElementDir`)     | Keep using `setupRtl` for the component; set `document.documentElement.setAttribute('dir', 'rtl' \| 'ltr')` (and scroll/viewport stubs if needed) in `beforeEach` / `afterEach`; reset `dir` after tests so suites do not leak |
| Storybook-only mock, chromatic-style wrapper, or non-RTL harness | `MockGamutProvider` (± `ColorMode`) in the exported wrapper component                                                                                                                                                          |

---

## `setupRtl` — primary pattern

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

- `view` — RTL `RenderResult` (`getByRole`, `getByLabelText`, `getByText`, …)
- `props` — resolved props (handy for `jest.fn()` assertions)
- `update` — re-render with new props without remounting

### Query and interaction habits (RTL)

- Prefer `getByRole`, `getByLabelText`, and accessible names over CSS selectors or snapshotting class strings unless you are explicitly testing styling.
- Prefer `@testing-library/user-event` over `fireEvent` when simulating real input (import `userEvent` from `@testing-library/user-event` in current major versions).

### Accessing mock functions via `props`

```tsx
import userEvent from '@testing-library/user-event';

it('calls onClick when clicked', async () => {
  const { view, props } = renderView();
  await userEvent.click(view.getByRole('button'));
  expect(props.onClick).toHaveBeenCalled();
});
```

---

## Harness + `setupRtl` when the wrapper is not default

`setupRtl` always wraps with `MockGamutProvider` with default props. To vary `useLogicalProperties`, add `ColorMode`, or compose other providers, define a small harness and pass `setupRtl` that harness — still one `renderView` factory, still `props` / `update` ergonomics.

### Varying `useLogicalProperties` (logical vs physical CSS)

```tsx
import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';

import { MyComponent } from '../MyComponent';

type HarnessProps = React.ComponentProps<typeof MyComponent> & {
  useLogicalProperties?: boolean;
};

const MyHarness = ({ useLogicalProperties, ...rest }: HarnessProps) => (
  <MockGamutProvider useLogicalProperties={useLogicalProperties}>
    <MyComponent {...rest} />
  </MockGamutProvider>
);

const renderView = setupRtl(MyHarness, { width: '200px' });

describe.each([
  { useLogicalProperties: true as const, widthProp: 'inlineSize' as const },
  { useLogicalProperties: false as const, widthProp: 'width' as const },
])(
  'useLogicalProperties=$useLogicalProperties',
  ({ useLogicalProperties, widthProp }) => {
    it(`uses ${widthProp}`, () => {
      const { view } = renderView({ useLogicalProperties });
      expect(view.getByTestId('my-component-root')).toHaveStyle({
        [widthProp]: '200px',
      });
    });
  }
);
```

The outer `setupRtl` wrapper adds a default `MockGamutProvider`; the harness’s inner `MockGamutProvider` sets `useLogicalProperties` for the subtree under test (nested `GamutProvider` / theme is the nearest one Emotion and variance see).

### `ColorMode` without abandoning `setupRtl`

```tsx
import { ColorMode } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';

const DarkHarness = (props: React.ComponentProps<typeof MyComponent>) => (
  <ColorMode mode="dark">
    <MyComponent {...props} />
  </ColorMode>
);

const renderDark = setupRtl(DarkHarness, { title: 'Hi' });
```

Use `MockGamutProvider` only inside the harness if you also need a non-default Gamut flag and `ColorMode` in the same tree; otherwise `setupRtl(DarkHarness)` is enough.

---

## Raw `render` + `MockGamutProvider` — rare

Reserve `render` from `@testing-library/react` + manual `MockGamutProvider` for cases where a harness would be more obscure than a single inline tree (e.g. highly dynamic one-off trees). If the same wrapper appears more than once, switch to a harness + `setupRtl`.

---

## RTL / `dir` and document-level behavior

Some components (e.g. overlays that call `useElementDir`) resolve direction from `document.documentElement` when there is no real target node. For those tests:

- Set `document.documentElement.setAttribute('dir', 'rtl')` (or `'ltr'`) around the scenario, `unmount` between LTR and RTL assertions when re-rendering, and restore `dir` in `afterEach` so other tests start clean.
- Combine with the harness pattern above when `useLogicalProperties` affects which longhand wins (`left` vs `insetInlineStart`, etc.).

---

## Emotion style assertions

Install `@emotion/jest` matchers if you absolutely need to enable CSS-in-JS assertions:

```tsx
import { matchers } from '@emotion/jest';

expect.extend(matchers);
```

Then assert on styles:

```tsx
expect(element).toHaveStyle({ borderRadius: '2px' });
expect(element).toHaveStyleRule('padding', '1rem');
```

Use `theme` from `@codecademy/gamut-styles` instead of hardcoding token strings:

```tsx
import { theme } from '@codecademy/gamut-styles';

expect(element).toHaveStyle({ columnGap: theme.spacing[40] });
```

---

## Visual test wrappers and Storybook

Exported mocks and stories may wrap with `MockGamutProvider` and `ColorMode` explicitly (no `setupRtl` in Storybook):

```tsx
import { MockGamutProvider } from '@codecademy/gamut-tests';
import { ColorMode } from '@codecademy/gamut-styles';

export const MyComponentMock: React.FC<ComponentProps<typeof MyComponent>> = (
  props
) => (
  <MockGamutProvider>
    <ColorMode mode="light">
      <MyComponent {...props} />
    </ColorMode>
  </MockGamutProvider>
);
```

---

## Common anti-patterns

| Anti-pattern                                                      | Fix                                                                                                |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `jest.mock('@codecademy/gamut', () => ({ ... }))`                 | Remove; use `setupRtl` (or harness + `setupRtl`)                                                   |
| `jest.mock('@codecademy/gamut-styles', ...)`                      | Remove; `MockGamutProvider` / `setupRtl` supplies theme                                            |
| `GamutProvider` in test files                                     | Use `MockGamutProvider` only when building a harness or story; default tests go through `setupRtl` |
| `import { setupRtl } from 'component-test-setup'` in Gamut / apps | Import `setupRtl` from `@codecademy/gamut-tests` so `MockGamutProvider` is applied                 |
| Repeated `render(<MockGamutProvider>…`                            | Harness + `setupRtl`, or a shared `renderView` factory                                             |
| One `setupRtl` call per `it`                                      | Define `renderView` once outside `describe`, call it inside each `it`                              |
| Asserting raw CSS strings for tokens                              | Use `theme` from `@codecademy/gamut-styles`                                                        |
| Leaking `dir="rtl"` between tests                                 | Reset `document.documentElement` in `afterEach`                                                    |
