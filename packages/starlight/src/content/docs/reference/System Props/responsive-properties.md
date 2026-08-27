---
title: Responsive properties
description: The array/object syntax every system prop accepts for breakpoint- and container-query-driven values.
---

Every system prop accepts a responsive syntax, so breakpoint-driven behavior is visible at the point a prop is set, rather than hidden inside a separate media query elsewhere.

```tsx
<Box display={{ _: 'none', sm: 'block', c_md: 'flex' }} />
```

## Object syntax

Keyed by breakpoint name; unordered, so it's easiest to read when only a few breakpoints need a value:

```tsx
<Text fontSize={{ lg: 26 }} />
<Text fontSize={{ _: 14, xl: 64 }} />
```

## Array syntax

Ordered left to right, matching breakpoint order exactly — easiest to read when every breakpoint gets a value:

```tsx
<Text fontSize={[14, 16, 18, 20, 26, 64]} />
```

Skip a breakpoint with an empty slot. Unlike the object syntax, a skipped array slot still explicitly sets that breakpoint to `undefined`, rather than falling through to the next set value:

```tsx
<Column size={[12, , 6]} />
```

## Breakpoints

Media-query breakpoints: `_` (none), `xs`, `sm`, `md`, `lg`, `xl`.

Container-query breakpoints: `c_base`, `c_xs`, `c_sm`, `c_md`, `c_lg`, `c_xl` — resolving to the same widths as their media-query counterparts, but as `@container` rules instead of `@media` ones.

## Container queries

Container queries adapt a component to its parent's width instead of the viewport, so the same component looks right regardless of where it sits in a layout. They require the parent to declare itself as a CSS container, typically via `containerType="inline-size"`:

```tsx
<FlexBox containerType="inline-size">
  <Box display={{ _: 'none', sm: 'block', c_md: 'flex' }} />
</FlexBox>
```

Set a fallback media-query value alongside any container-query value, for browsers that don't support container queries yet.

## Best practices

- Use media breakpoints for page-level layout shifts; use container queries for components that need to react to their own allotted space, not the viewport.
- Always declare a `containerType` on the element whose descendants should listen for container breakpoints.
- Prefer object syntax for isolated, single-breakpoint overrides; prefer array syntax when a value changes at every breakpoint in sequence.
