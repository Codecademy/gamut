# Tag

Categorization/labeling — see `components/index.md`: `Tag` = categorization, `Badge` = status.

## Variant examples

```jsx
const { Tag } = window.CodecademyGamut;

<Tag variant="readOnly">Read-only</Tag>
<Tag size="large" variant="readOnly">Large read-only</Tag>
```

## Selection (dismissible)

`Selection` variant is for user-removable filter/choice tags — pass `onDismiss`:

```jsx
<Tag variant="selection" onDismiss={() => {}}>Selection</Tag>
<Tag disabled variant="selection" onDismiss={() => {}}>Selection disabled</Tag>
```

## Navigation

`Navigation` variant renders as a link — pass `href`:

```jsx
<Tag variant="navigation" href="/">
  Navigation
</Tag>
```

## With icon

```jsx
const { SomeIcon } = window.CodecademyGamut; // pick a real name from components/icons.md

<Tag variant="readOnly" icon={SomeIcon}>
  Labeled
</Tag>;
```
