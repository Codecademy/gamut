# Animations

`Animation` is not a single component — it is a **namespace of controlled containers for predictable animations** exported from `@codecademy/gamut`. Each primitive handles one specific animation pattern. Use these instead of writing raw CSS keyframes, inline `transition` styles, or pulling in a third-party motion library directly.

## Cross-cutting rule: animations contain content, not click targets

**Animations should never be the click target of actions.** They wrap the content being animated, not the element that triggers the animation. The action element (`FillButton`, `StrokeButton`, etc.) goes on the outside; the animation primitive goes around the visual content that should animate.

❌ Wrong — `onClick` on the animation container:

```tsx
<Rotation onClick={handleClick}>
  <MiniChevronDownIcon />
</Rotation>
```

✅ Right — action element wraps the animation:

```tsx
<StrokeButton onClick={handleClick}>
  <Rotation>
    <MiniChevronDownIcon />
  </Rotation>
</StrokeButton>
```

## Animation primitives

### `Rotation`

A container that rotates its children. Common use: rotating an arrow icon to indicate expand/collapse state.

**Props:**

- `rotated: boolean` — whether the container is rotated. Defaults to 180° (half a rotation).
- `degrees: number` — degrees to rotate, must be under 360. Default: `180`.
- `height: number` — container height. Default: `16`.
- `width: number` — container width. Default: `16`.
- `aria-hidden: boolean`
- `children: ReactNode | ReactNode[]`

**Example:**

```tsx
<StrokeButton onClick={toggleExpanded}>
  <Rotation rotated={isExpanded}>
    <MiniChevronDownIcon />
  </Rotation>
</StrokeButton>
```

### `ExpandInCollapseOut`

A container that applies an expand-and-collapse animation to its children. Uses Framer Motion; the initial and exit state is `"collapsed"`, the animation target is `"expanded"`.

**Required pattern:** wrap in `<AnimatePresence>` from `framer-motion` and conditionally render the component based on a state variable.

**Props:**

- `children: ReactNode | ReactNode[]`

**Example:**

```tsx
import { AnimatePresence } from 'framer-motion';

<FlexBox column>
  <Box>
    <FillButton onClick={toggleExpanded}>Show details</FillButton>
  </Box>
  <Box mt={8}>
    <AnimatePresence>
      {isExpanded && (
        <ExpandInCollapseOut>
          {/* content to animate in and out */}
        </ExpandInCollapseOut>
      )}
    </AnimatePresence>
  </Box>
</FlexBox>;
```

### `FadeInSlideOut`

A container that fades children in when appearing and slides them out when disappearing. Uses Framer Motion with three states: `initial`, `visible`, `exit`.

**Required pattern:** wrap in `<AnimatePresence>` and **conditionally render** the component using `&&` or a ternary. The animation is triggered when the component is **added to or removed from the DOM** — not by changing styles or props.

**Props:**

- `children: ReactNode | ReactNode[]`

**Example:**

```tsx
import { AnimatePresence } from 'framer-motion';

const [isVisible, setIsVisible] = useState(false);

<FlexBox column>
  <Box>
    <FillButton onClick={() => setIsVisible(!isVisible)}>
      {isVisible ? 'Hide' : 'Show'}
    </FillButton>
  </Box>
  <Box height="50px" mt={8}>
    <AnimatePresence>
      {isVisible && (
        <FadeInSlideOut>
          <Box border={1} p={8}>
            {/* content to animate */}
          </Box>
        </FadeInSlideOut>
      )}
    </AnimatePresence>
  </Box>
</FlexBox>;
```

## Required pattern for enter/exit animations

Both `ExpandInCollapseOut` and `FadeInSlideOut` require this exact structure:

1. **Wrap in `<AnimatePresence>`** from `framer-motion`.
2. **Conditionally render** the animation component (`&&` or ternary), driven by a state variable.
3. **Toggle the state** to trigger the animation — never toggle styles, `display`, `opacity`, or other props.

Changing styles will NOT trigger these animations. Only mount/unmount triggers them.

## Rules

1. **Always use Gamut animation primitives** for transitions and motion. Never write raw CSS keyframes, inline `transition` styles, or import a third-party motion library directly when a Gamut primitive covers the case.
2. **Never put click handlers on animation containers.** The action element wraps the animation, not the other way around.
3. **For enter/exit animations**, always wrap in `AnimatePresence` and drive visibility via conditional rendering — never via CSS show/hide.
4. **Import `AnimatePresence` from `framer-motion`**, which is available as a peer dependency through Gamut.
