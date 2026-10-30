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

## Suggestion

`Suggestion` variant is a clickable chip for offering dynamic, context-relevant options (possible responses or next actions). It's interactive, so pass `onClick` rather than `href`:

```jsx
<Tag variant="suggestion" onClick={() => {}}>Suggestion</Tag>
<Tag size="large" variant="suggestion" onClick={() => {}}>Large suggestion</Tag>
```

## With icon

```jsx
const { SomeIcon } = window.CodecademyGamut; // pick a real name from components/icons.md

<Tag variant="readOnly" icon={SomeIcon}>
  Labeled
</Tag>;
```
