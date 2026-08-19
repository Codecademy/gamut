---
sidebar_position: 1
---

# Alert

Communicates a status, confirmation, or warning that isn't tied to a
specific form field.

**Status:** Stable · **Source:** `packages/gamut/src/Alert/Alert.tsx`

:::note Template exemplar
This page follows the component page template from ADR 0001 §3 exactly —
use it as the reference when migrating or writing any other component
page. The section order and heading names below are fixed; don't add or
rename sections.
:::

## Usage

Reach for `Alert` when the _system_ needs to tell the reader something —
their action succeeded, something needs attention, or a feature is new —
independent of any single form field. For field-level validation, use the
error/description regions documented in
[Building forms](../../guides/building-forms.md) instead.

### Best practices

- Lead with the outcome, not the mechanism ("Your changes were saved," not
  "The save request completed").
- Keep the message to one or two sentences; use `cta` for anything that
  needs a follow-up action rather than embedding a link in the body text.
- Prefer `type="subtle"` for low-urgency, persistent context, and reserve
  `type="error"` / `type="notice"` for things that need attention now.

### When NOT to use

- The message is about a specific input, not the page as a whole — use a
  form field's inline error/description region instead (see
  [Inputs & forms](../inputs-forms/index.md)).
- The message should disappear on its own after a few seconds — use
  [Toast](./toast.md) instead.
- You're explaining a UI element the reader is currently focused on, rather
  than announcing something — use a [Tip](./tips.md) instead.
- The content needs to interrupt the reader and block the page until
  dismissed — use [Modal](../overlays/modal.md) instead.

### Anatomy

```text
┌──────────────────────────────────────────────────┐
│ [icon]  Message text                 [CTA] [✕]   │
└──────────────────────────────────────────────────┘
```

- **Icon** — set automatically by `type`; decorative (`aria-hidden`)
- **Message** — the `children` content
- **CTA** — optional, from the `cta` prop
- **Close button** — appears only when `onClose` is passed

## Patterns

### Dismiss an alert and track that it was dismissed

The interesting part here is the state and handler around the component,
not a prop value — that's what makes this a Pattern rather than a Variant.

```jsx live
function DismissibleAlert() {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) {
    return (
      <FillButton onClick={() => setDismissed(false)}>
        Show alert again
      </FillButton>
    );
  }

  return (
    <Alert type="notice" onClose={() => setDismissed(true)}>
      Your session will expire in 5 minutes.
    </Alert>
  );
}
```

### Confirm a successful action with a follow-up

Pairs with the tutorial in [Build your first page](../../getting-started/build-your-first-page.md#3-handle-submission-feedback).

```jsx live
function SubmitConfirmation() {
  const [submitted, setSubmitted] = React.useState(false);

  return submitted ? (
    <Alert
      type="success"
      onClose={() => setSubmitted(false)}
      cta={{
        text: 'View details',
        onClick: () => alert('Navigate to details'),
      }}
    >
      Your feedback was submitted.
    </Alert>
  ) : (
    <FillButton onClick={() => setSubmitted(true)}>Submit feedback</FillButton>
  );
}
```

## Variants

Every value of `type`, rendered with no other props set:

```jsx live
<Alert type="general">General — neutral, default styling.</Alert>
```

```jsx live
<Alert type="success">Success — the action completed.</Alert>
```

```jsx live
<Alert type="error">Error — something went wrong.</Alert>
```

```jsx live
<Alert type="notice">Notice — needs attention soon.</Alert>
```

```jsx live
<Alert type="feature">Feature — highlighting something new.</Alert>
```

```jsx live
<Alert type="subtle">Subtle — low-urgency, persistent context.</Alert>
```

`placement` controls whether the alert sits inline in the page flow or
floats above it:

```jsx live
<Alert type="notice" placement="inline">
  Inline placement.
</Alert>
```

```jsx live
<Alert type="notice" placement="floating">
  Floating placement.
</Alert>
```

`type="subtle"` only supports `placement="inline"` — Alert enforces this
regardless of what's passed.

## Accessibility

- Both the inline and floating rendering (`AlertBanner`/`AlertBox`) default
  to `role="status"` and `aria-live="polite"`, so assistive tech announces
  the message when it appears without stealing focus. Override
  `aria-label` (defaults to `"alert banner"` / `"alert box"`) if the
  surrounding context needs a more specific name.
- The type icon is `aria-hidden` — it's decorative reinforcement of
  `type`, not the only signal of meaning.
- Alert does not trap focus and is not modal; it doesn't intercept
  keyboard navigation.
- Where an alert's content can be expanded or collapsed inline, the toggle
  control uses `aria-expanded`, `aria-controls`, and `aria-describedby` to
  convey state — there's no custom keyboard handling to test beyond the
  toggle button's native `Enter`/`Space` activation.
- No RTL-specific behavior beyond Gamut's standard logical-property
  layout (see [Migrating to logical properties](../../guides/migrating-to-logical-properties.md)).

## Props

| Prop               | Type                                                                       | Default                                               | Notes                                                                |
| ------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `type`             | `'general' \| 'success' \| 'error' \| 'notice' \| 'feature' \| 'subtle'`   | `'general'`                                           | Sets icon and color                                                  |
| `placement`        | `'inline' \| 'floating'`                                                   | `'floating'`                                          | Forced to `'inline'` when `type="subtle"`                            |
| `children`         | `ReactNode`                                                                | —                                                     | Required; the message content                                        |
| `onClose`          | `() => void`                                                               | —                                                     | Renders a close button when provided                                 |
| `cta`              | `Omit<FillButtonProps, 'variant' \| 'mode' \| 'size'> & { text?: string }` | —                                                     | Optional follow-up action                                            |
| `closeButtonProps` | `{ disabled?, ref?, tip?, tipAlignment? }`                                 | `tip: 'Close alert'`, `tipAlignment: 'bottom-center'` | Customizes the close button's tooltip; `hidden` is not settable here |
| `hidden`           | `boolean`                                                                  | `false`                                               | Sets `tabIndex={-1}` on internal interactive elements                |
| `className`        | `string`                                                                   | —                                                     | Passed through to the root element                                   |

## Playground

Edit the props below directly:

```jsx live
<Alert
  type="notice"
  placement="floating"
  onClose={() => {}}
  cta={{ text: 'Learn more', onClick: () => alert('CTA clicked') }}
>
  Edit this code to try different props.
</Alert>
```
