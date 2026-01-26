---
name: gamut-patterns
description: Use background patterns and visual textures to enhance your UI designs
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut-patterns'
  audience: designers, developers
  type: component-library
---

## What I do

I help you use Gamut patterns effectively by providing guidance on:

- Selecting the right background pattern for your design
- Implementing pattern components in React
- Customizing pattern density and styling
- Using patterns to add visual interest and depth
- Following Codecademy's design system patterns

## When to use me

Use this skill when you need to:

- Add visual texture and depth to backgrounds
- Create visual interest in sections or components
- Implement brand-consistent pattern designs
- Understand the available pattern library
- Customize pattern appearance and sizing
- Enhance empty states or hero sections with patterns

## Available patterns

Gamut provides 28 pattern variations organized by style and density:

### Pattern styles

**Dots**

- Simple circular dot pattern
- Great for subtle background texture
- Available in all density levels

**Waves**

- Flowing wave pattern
- Creates movement and energy
- Works well for headers and hero sections

**Grid**

- Regular grid pattern
- Perfect for structured, modern looks
- Provides a clean, geometric appearance

**Lines**

- Parallel or intersecting line patterns
- Creates motion and direction
- Useful for dividing sections

**Stripes**

- Horizontal or diagonal stripe pattern
- Classic and timeless
- Versatile for many design contexts

**Organic**

- Flowing, natural-looking shapes
- Soft and approachable
- Great for creative or artistic contexts

**Geometric**

- Modern geometric shapes
- Abstract and contemporary
- Perfect for tech-forward designs

**Herringbone**

- Classic herringbone/chevron pattern
- Sophisticated and structured
- Adds visual sophistication

**Hexagons**

- Hexagon tessellation pattern
- Modern and technical
- Works well for tech products

### Pattern densities

Each pattern style is available in three density levels:

**Dense**

- High density, more visual impact
- Creates bold, statement-making backgrounds
- Use when you want the pattern to be prominent

```tsx
<PatternDots density="dense" />
```

**Regular (Default)**

- Medium density, balanced appearance
- Provides texture without overwhelming content
- Recommended for most use cases

```tsx
<PatternDots density="regular" />
```

**Loose**

- Low density, subtle texture
- Creates gentle visual interest
- Use when pattern should be understated

```tsx
<PatternDots density="loose" />
```

## Using patterns in your application

### Basic pattern usage

```tsx
import { PatternDots } from '@codecademy/gamut-patterns';
import { Box, Text } from '@codecademy/gamut';

function HeroSection() {
  return (
    <Box position="relative" p={48} bg="primary">
      <PatternDots
        density="regular"
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        opacity={0.1}
      />
      <Box position="relative" zIndex={1} textAlign="center">
        <Text variant="title-xl" color="white">
          Welcome to our service
        </Text>
      </Box>
    </Box>
  );
}
```

### Pattern as background

```tsx
import { PatternWaves } from '@codecademy/gamut-patterns';
import { Box, Text } from '@codecademy/gamut';

function SectionWithPattern() {
  return (
    <Box position="relative" overflow="hidden" p={32}>
      <PatternWaves
        density="loose"
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        opacity={0.15}
        color="background-secondary"
      />
      <Box position="relative" zIndex={1}>
        <Text variant="title-lg">Section with visual interest</Text>
      </Box>
    </Box>
  );
}
```

### Colored patterns

```tsx
import { PatternGrid } from '@codecademy/gamut-patterns';
import { Box } from '@codecademy/gamut';

// Pattern inherits color from parent
<Box color="primary">
  <PatternGrid density="regular" width={200} height={200} />
</Box>

// Or specify color directly
<PatternGrid
  density="regular"
  width={200}
  height={200}
  color="var(--color-primary)"
/>
```

### Pattern with opacity

```tsx
import { PatternLines } from '@codecademy/gamut-patterns';
import { Box } from '@codecademy/gamut';

// Subtle pattern overlay
<Box p={24} bg="background">
  <PatternLines
    density="loose"
    width="100%"
    height="100%"
    position="absolute"
    top={0}
    left={0}
    opacity={0.08}
  />
</Box>;
```

### Empty state with pattern

```tsx
import { PatternOrganic } from '@codecademy/gamut-patterns';
import { Box, Text, Button } from '@codecademy/gamut';

function EmptyState() {
  return (
    <Box position="relative" p={48} textAlign="center" minHeight={400}>
      <PatternOrganic
        density="loose"
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        opacity={0.1}
      />
      <Box position="relative" zIndex={1}>
        <Text variant="title-lg" mb={16}>
          No items yet
        </Text>
        <Text variant="p-base" color="text-secondary" mb={24}>
          Create your first item to get started
        </Text>
        <Button variant="primary">Create Item</Button>
      </Box>
    </Box>
  );
}
```

### Pattern dividers

```tsx
import { PatternGeometric } from '@codecademy/gamut-patterns';
import { Box, Text } from '@codecademy/gamut';

function DividedSections() {
  return (
    <Box>
      <Box p={32}>
        <Text>Section 1</Text>
      </Box>

      {/* Pattern divider */}
      <Box height={100} position="relative" overflow="hidden">
        <PatternGeometric
          density="regular"
          width="100%"
          height="100%"
          opacity={0.2}
        />
      </Box>

      <Box p={32}>
        <Text>Section 2</Text>
      </Box>
    </Box>
  );
}
```

## Pattern selection guide

Choose patterns based on your design goals:

| Pattern     | Best for                        | Density guide    |
| ----------- | ------------------------------- | ---------------- |
| Dots        | Subtle texture, professional    | Loose or Regular |
| Waves       | Movement, energy, headers       | Regular or Dense |
| Grid        | Modern, structured, tech        | Regular          |
| Lines       | Direction, dividers, motion     | Loose or Regular |
| Stripes     | Classic, timeless, versatile    | Regular          |
| Organic     | Creative, approachable, soft    | Loose            |
| Geometric   | Contemporary, abstract, bold    | Regular or Dense |
| Herringbone | Sophisticated, premium, classic | Regular          |
| Hexagons    | Technical, modern, innovative   | Regular          |

## Pattern props

All pattern components support these common props:

- `density: 'dense' | 'regular' | 'loose'` - Pattern density level (default: 'regular')
- `width: number | string` - Pattern width (typically 100% for backgrounds)
- `height: number | string` - Pattern height (typically 100% for backgrounds)
- `color?: string` - Pattern color (inherits from parent or CSS var)
- `opacity?: number` - Opacity value (0-1), useful for subtle overlays
- `position?: string` - CSS position property
- `top?: number | string` - Top positioning
- `left?: number | string` - Left positioning
- `className?: string` - Custom CSS class

## Best practices

### Use patterns intentionally

- Patterns should enhance, not distract
- Keep pattern opacity low (0.1-0.2) for backgrounds
- Use patterns to draw attention to important sections
- Maintain consistency with your brand identity

### Performance

- Patterns are optimized SVG components
- They load efficiently without external image requests
- Use appropriate sizing for your use case

### Accessibility

- Ensure sufficient contrast between pattern and text
- Use patterns as decorative elements (not essential information)
- Test with different contrast settings

```tsx
// Good: Pattern with sufficient contrast
<Box bg="primary" p={32}>
  <PatternWaves density="loose" opacity={0.15} />
  <Text color="white" position="relative" zIndex={1}>
    High contrast text
  </Text>
</Box>
```

### Mobile responsiveness

```tsx
import { PatternDots } from '@codecademy/gamut-patterns';

function ResponsivePattern() {
  return (
    <PatternDots
      density={{ mobile: 'loose', tablet: 'regular', desktop: 'dense' }}
      width="100%"
      height="100%"
    />
  );
}
```

## Common combinations

**Professional & Clean**

- Pattern: Grid (Loose)
- Opacity: 0.08
- Use case: SaaS dashboards, corporate sites

**Creative & Energetic**

- Pattern: Waves (Regular)
- Opacity: 0.15
- Use case: Creative portfolios, startup sites

**Modern & Bold**

- Pattern: Geometric (Dense)
- Opacity: 0.2
- Use case: Tech products, hero sections

**Classic & Timeless**

- Pattern: Stripes or Herringbone (Regular)
- Opacity: 0.1
- Use case: Premium brands, heritage companies

## Dependencies

Gamut patterns requires:

- `react` ^17.0.2 || ^18.2.0
- `react-dom` ^17.0.2 || ^18.2.0

The package is installed as:

```bash
yarn add @codecademy/gamut-patterns
```

Or use `@codecademy/gamut-kit` to install all Gamut packages together.
