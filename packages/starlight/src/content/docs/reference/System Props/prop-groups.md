---
title: Prop groups
description: Every system prop group and what it covers.
---

Each group below is one example of what it covers, not an exhaustive prop list. For every individual prop in a group — its exact CSS properties, its scale, and its transform — open that group's own page in Storybook (for example, [Layout](https://gamut.codecademy.com/?path=/docs/foundations-system-props-layout--docs)) and see its prop table; that table is generated live from `variance/config.ts`, so it can't drift out of sync the way a static copy here would.

## Layout

Layout props control the visual structure and dimensions of elements — how components take up space, their display behavior, and how they align within their containers.

```tsx
const LayoutExample = styled.div(system.layout);

<LayoutExample
  display="flex"
  width="50%"
  height="300px"
  verticalAlign="middle"
/>;
```

## Space

Space props apply margin and padding consistently, referencing the theme's spacing scale — including responsive array syntax.

```tsx
const SpaceExample = styled.div(system.space);

<SpaceExample p={8} my={[16, 24, 32]} />;
```

## Typography

Typography props connect to the theme's font family, size, weight, and line-height scales, alongside text transforms and decorations.

```tsx
const TextExample = styled.p(system.typography);

<TextExample fontSize={16} fontFamily="accent" textTransform="uppercase" />;
```

## Color

Color props control foreground, background, and border colors, restricted to the theme's color palette. `bg` is a shorthand for background color.

```tsx
const ColorExample = styled.div(system.color);

<ColorExample bg="navy" textColor="gray-100" borderColor="blue" />;
```

## Border

Border props add and style borders on any side of an element, with directional props and horizontal/vertical shorthands. `borderRadius` references the theme's `borderRadii` scale.

```tsx
const BorderExample = styled.div(system.border);

<BorderExample
  border={1}
  borderLeft="none"
  borderRightStyle="dotted"
  borderRadius="md"
/>;
```

## Flex

Flex props control flexbox layouts end to end — container behavior and individual item properties alike.

```tsx
const FlexExample = styled.div(system.flex);

<FlexExample flex={1} justifyContent="center" alignItems="flex-start" />;
```

## Grid

Grid props control CSS Grid layouts — templates, auto-placement, and gaps between items.

```tsx
const GridExample = styled.div(system.grid);

<GridExample
  gridTemplateColumns="max-content 1fr max-content"
  columnGap={32}
/>;
```

## Background

Background props control background images and patterns — sizing, positioning, and repetition. For solid background colors, use the color props instead.

```tsx
const BackgroundExample = styled.div(system.background);

<BackgroundExample background={`url(${myBg})`} backgroundSize="cover" />;
```

## Positioning

Positioning props control how an element is placed within its parent and its stacking order — `position`, the individual edge props (or the `inset` shorthand for all four at once), and `zIndex`.

```tsx
const PositioningExample = styled.div(system.positioning);

<PositioningExample position="absolute" zIndex={2} top="0" left="0" />;
```

## Shadow

Shadow props add box and text shadows, using standard CSS shadow syntax.

```tsx
const ShadowExample = styled.div(system.shadow);

<ShadowExample
  boxShadow="0 0 4px rgba(0, 0, 0, .15)"
  textShadow="0 0 4px rgba(0, 0, 0, .15)"
/>;
```

## List

List props adjust bullet styles, positioning, and custom marker images when a component renders as a `ul` or `ol`. For richer list features, see [List](/components/data-display/list--tables/list/list/).

```tsx
const ListExample = styled.div(system.list);

<ListExample
  as="ul"
  listStyleType="square"
  listStylePosition="inside"
  listStyleImage="none"
>
  <ListExample as="li">a list item</ListExample>
</ListExample>;
```

`border`, `color`, `positioning`, and `space` props all support both physical and logical CSS properties, resolved by `useLogicalProperties` on `GamutProvider` — see [Migrating to logical properties](/guides/migrating-to-logical-properties/).
