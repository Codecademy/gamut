---
name: gamut-illustrations
description: Use brand illustrations for empty states, onboarding, and visual storytelling
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut-illustrations'
  audience: developers
  type: component-library
---

## What I do

I help you use Gamut illustrations effectively by providing guidance on:

- Selecting the right illustration for your use case
- Implementing illustration components in React
- Customizing illustration sizing and styling
- Using illustrations for empty states and onboarding
- Following Codecademy's brand visual language

## When to use me

Use this skill when you need to:

- Add illustrations to empty states, error pages, or loading screens
- Implement onboarding visual storytelling
- Display product feature highlights
- Create engaging user experiences with brand-consistent artwork
- Understand the available illustration library
- Customize illustration appearance and sizing

## Available illustrations

Gamut provides 70+ brand illustrations organized by category:

### Celebration & Success

Illustrations for positive moments and achievements:

- Trophy, Star, Confetti, Success celebration, Party
- Achievement unlock, Milestone completion, Goal reached

**Use cases:** Success confirmations, achievement celebrations, completion screens

### Learning & Education

Illustrations for educational content and learning moments:

- Book, Lightbulb, Brain, Student, Graduation
- Learning in progress, Knowledge building, Growth

**Use cases:** Course introductions, lesson starts, learning progress indicators

### Exploration & Discovery

Illustrations for onboarding and discovering features:

- Map, Compass, Path, Journey, Adventure
- Exploration, Discovery, New horizons

**Use cases:** Onboarding flows, feature introductions, getting started guides

### Error & Empty States

Illustrations for error messages and empty content:

- Not found, Error, Warning, No results, Offline
- Something went wrong, Empty state, No data

**Use cases:** 404 pages, error screens, empty states, no results pages

### Work & Productivity

Illustrations for work-related content:

- Briefcase, Desk, Computer, Tasks, Projects
- Collaboration, Teamwork, Focus

**Use cases:** Productivity features, collaboration highlights, workspace imagery

### Technology & Development

Illustrations for technical and developer content:

- Code, Terminal, Server, API, Tools
- Debug, Build, Deploy

**Use cases:** Developer documentation, API guides, technical features

### Lifestyle & Wellness

Illustrations for wellness and lifestyle features:

- Meditation, Exercise, Nature, Community, Growth
- Wellness, Balance, Health

**Use cases:** Wellness features, community content, lifestyle highlights

## Using illustrations in your application

### Basic usage

```tsx
import { Trophy } from '@codecademy/gamut-illustrations';

function SuccessScreen() {
  return (
    <Box textAlign="center" p={32}>
      <Trophy width={200} height={200} />
      <Text variant="title-lg" mt={24}>
        Congratulations!
      </Text>
      <Text variant="p-base" color="text-secondary">
        You've completed the course!
      </Text>
    </Box>
  );
}
```

### Sizing and styling

```tsx
import { Lightbulb } from '@codecademy/gamut-illustrations';

// Custom size
<Lightbulb width={300} height={300} />

// With custom colors (if supported)
<Lightbulb width={200} height={200} color="primary" />

// Responsive sizing
<Lightbulb
  width={{ mobile: 100, tablet: 150, desktop: 200 }}
  height={{ mobile: 100, tablet: 150, desktop: 200 }}
/>
```

### Empty state pattern

```tsx
import { NoResults } from '@codecademy/gamut-illustrations';
import { Box, Text, FlexBox } from '@codecademy/gamut';

function EmptySearchResults() {
  return (
    <Box p={48} textAlign="center">
      <NoResults width={180} height={180} />
      <Text variant="title-md" mt={24} mb={8}>
        No results found
      </Text>
      <Text variant="p-base" color="text-secondary" maxWidth={400}>
        Try adjusting your search filters or keywords to find what you're
        looking for.
      </Text>
    </Box>
  );
}
```

### Onboarding screen

```tsx
import { Map } from '@codecademy/gamut-illustrations';
import { Box, Text, Button, FlexBox } from '@codecademy/gamut';

function OnboardingStep() {
  return (
    <FlexBox flexDirection="column" alignItems="center" p={32}>
      <Map width={240} height={240} />
      <Text variant="title-lg" mt={32} mb={16} textAlign="center">
        Let's Explore Your Learning Path
      </Text>
      <Text
        variant="p-base"
        color="text-secondary"
        maxWidth={500}
        textAlign="center"
        mb={32}
      >
        Choose from hundreds of courses and create a personalized learning
        journey.
      </Text>
      <Button variant="primary">Get Started</Button>
    </FlexBox>
  );
}
```

### Error screen

```tsx
import { ServerError } from '@codecademy/gamut-illustrations';
import { Box, Text, Button } from '@codecademy/gamut';

function ErrorScreen() {
  return (
    <Box p={48} textAlign="center">
      <ServerError width={200} height={200} />
      <Text variant="title-lg" mt={24} mb={8}>
        Something went wrong
      </Text>
      <Text variant="p-base" color="text-secondary" mb={24}>
        We're having trouble loading this page. Please try again.
      </Text>
      <Button variant="primary" onClick={() => window.location.reload()}>
        Refresh page
      </Button>
    </Box>
  );
}
```

## Illustration props

All illustration components support these common props:

- `width: number | string` - Illustration width (can be responsive object)
- `height: number | string` - Illustration height (can be responsive object)
- `color?: string` - Optional color override (if supported by the illustration)
- `className?: string` - CSS class for custom styling
- `aria-label?: string` - Accessible label for screen readers
- `alt?: string` - Alternative text description

## Best practices

### Use illustrations purposefully

- Choose illustrations that match the context and tone
- Ensure illustrations enhance the user experience, not distract
- Use appropriate sizing (typically 150px-300px for UI elements)
- Maintain consistent illustration usage across your application

### Accessibility

```tsx
// Always provide accessible labels
<Trophy width={200} height={200} aria-label="Achievement trophy" />

// Or use with Text nearby
<Box>
  <Trophy width={200} height={200} />
  <Text>You've earned this achievement!</Text>
</Box>
```

### Performance

- Illustrations are optimized SVG components
- They load efficiently without external image requests
- Use lazy loading for illustrations below the fold if needed

### Color customization

Some illustrations support color props for theming:

```tsx
// Using theme colors
<Lightbulb width={150} height={150} color="var(--color-primary)" />

// Wrapping for full customization
<Box color="primary">
  <Lightbulb width={150} height={150} />
</Box>
```

## Dependencies

Gamut illustrations requires:

- `react` ^17.0.2 || ^18.2.0
- `react-dom` ^17.0.2 || ^18.2.0
- `@codecademy/gamut-styles` (for theming integration)

The package is installed as:

```bash
yarn add @codecademy/gamut-illustrations
```

Or use `@codecademy/gamut-kit` to install all Gamut packages together.
