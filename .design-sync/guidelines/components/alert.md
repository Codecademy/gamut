# Alert

Inline status/feedback banner. **The variant prop is `type`, not `variant`** — easy to guess wrong since most other Gamut components use `variant`.

## Variant examples

```jsx
const { Alert } = window.CodecademyGamut;

<Alert type="general" cta={{ children: 'Resend verification' }} onClose={() => {}}>
  Please verify your email so we can make sure your account is secure.
</Alert>

<Alert type="success">Success! Your content has been assigned.</Alert>

<Alert type="feature" cta={{ children: 'Add your name' }}>
  Update your profile with your name to help your team with account management.
</Alert>

<Alert type="notice" cta={{ children: 'Learn more' }}>
  Maintenance: Codecademy will be offline between 2AM and 4AM EST.
</Alert>

<Alert type="error">
  We were unable to add this team member. Please refresh the page and try again.
</Alert>

<Alert type="subtle" cta={{ children: 'Learn more' }}>Subtly alerting the user</Alert>
```

## Props

- `type` — `'general' | 'success' | 'feature' | 'notice' | 'error' | 'subtle'`.
- `cta` — optional call-to-action button config (`{ children: string, onClick?, ... }`). Pass `cta={{ children: '' }}` explicitly only if the source design shows a CTA slot with no label; omit `cta` entirely otherwise.
- `onClose` — pass to make the alert dismissible; renders a close control.

## When to use / not use

See `components/index.md` — a page-level status callout (not a per-row status) is an `Alert`, not `<Text color="feedback-error">` — that's always an `Alert` reinvention. For a per-row status indicator, use `Badge` instead (`guidelines/recipes/data-list-with-status.md`).
