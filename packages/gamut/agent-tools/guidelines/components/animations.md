# Animations

`Animation` is a namespace of controlled containers from `@codecademy/gamut` — one primitive per pattern. Use these instead of raw CSS keyframes, inline `transition`, or third-party motion libraries when a Gamut primitive covers the case.

Storybook: [Atoms / Animation](https://gamut.codecademy.com/?path=/docs-atoms-animation--docs)

## Cross-cutting rule: animations contain content, not click targets

Never put `onClick` on the animation container. The action element (`FillButton`, `StrokeButton`, etc.) wraps the animation; the primitive wraps the visual content that animates.

```tsx
// Wrong
<Rotation onClick={handleClick}>
  <MiniChevronDownIcon />
</Rotation>

// Right
<StrokeButton onClick={handleClick}>
  <Rotation>
    <MiniChevronDownIcon />
  </Rotation>
</StrokeButton>
```

## Primitives

### `Rotation`

Rotates children — common for expand/collapse chevrons.

Props: `rotated`, `degrees` (default `180`), `height`, `width`, `aria-hidden`, `children`

```tsx
<StrokeButton onClick={toggleExpanded}>
  <Rotation rotated={isExpanded}>
    <MiniChevronDownIcon />
  </Rotation>
</StrokeButton>
```

### `ExpandInCollapseOut`

Expand/collapse via Framer Motion. Required: wrap in `<AnimatePresence>` and conditionally render.

```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isExpanded && <ExpandInCollapseOut>{/* content */}</ExpandInCollapseOut>}
</AnimatePresence>;
```

### `FadeInSlideOut`

Fade in / slide out via Framer Motion. Required: `<AnimatePresence>` + conditional mount — toggling CSS does not trigger the animation.

```tsx
<AnimatePresence>
  {isVisible && (
    <FadeInSlideOut>
      <Box border={1} p={8}>
        {/* content */}
      </Box>
    </FadeInSlideOut>
  )}
</AnimatePresence>
```

## Rules

1. Prefer Gamut animation primitives over raw keyframes or ad-hoc motion libraries.
2. Never put click handlers on animation containers.
3. Enter/exit: `AnimatePresence` + conditional render — not CSS show/hide.
4. Import `AnimatePresence` from `framer-motion` (peer dependency via Gamut).
