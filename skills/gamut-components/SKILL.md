---
name: gamut-components
description: Use Gamut React components correctly with proper props and patterns
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut'
  audience: developers
  type: component-library
---

## What I do

I help you use Gamut components correctly by providing guidance on:

- Component selection and usage patterns
- Prop interfaces and TypeScript types
- Layout components (Box, FlexBox, GridBox)
- Typography components (Text)
- Interactive components (Tabs, Disclosure, Drawer, Flyout, Menu)
- Form components (GridForm)
- Navigation components (Anchor, Breadcrumbs, SkipToContent)
- Utility components (Badge, Tag, Coachmark, Overlay, PopoverContainer)

## When to use me

Use this skill when you need to:

- Implement UI components from the Gamut design system
- Understand which component to use for a specific use case
- Access component props and TypeScript interfaces
- Follow Codecademy's component patterns and best practices
- Build layouts using the Box system
- Implement accessible interactive components

## Storybook documentation

View live examples and interactive documentation:

- **Box System**: https://gamut.codecademy.com/?path=/docs/layouts-box--docs
- **Text Typography**: https://gamut.codecademy.com/?path=/docs/typography-text--docs
- **Tabs**: https://gamut.codecademy.com/?path=/docs/organisms-tabs--docs
- **Disclosure**: https://gamut.codecademy.com/?path=/docs/molecules-disclosure--docs
- **All Components**: https://gamut.codecademy.com/

## Key concepts

### Box System

Gamut uses a powerful Box system for layouts:

```tsx
import { Box, FlexBox, GridBox } from '@codecademy/gamut';

// Basic Box with variance props
<Box p={16} bg="background" borderRadius="md">
  Content
</Box>

// FlexBox for flexbox layouts
<FlexBox gap={8} alignItems="center">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</FlexBox>

// GridBox for grid layouts
<GridBox columns="1fr 2fr" gap={16}>
  <Box>Sidebar</Box>
  <Box>Main content</Box>
</GridBox>
```

**Available props on Box components:**

- Layout: `display`, `width`, `height`, `minWidth`, `maxWidth`, `overflow`, etc.
- Spacing: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`
- Colors: `bg`, `color`, `textColor`
- Borders: `border`, `borderRadius`, `borderColor`, `borderWidth`
- Positioning: `position`, `top`, `right`, `bottom`, `left`, `zIndex`
- FlexBox specific: `gap`, `rowGap`, `columnGap`, `alignItems`, `justifyContent`, `flexDirection`, `flexWrap`
- GridBox specific: `columns`, `rows`, `gap`, `rowGap`, `columnGap`, `areas`

### Typography

Use the Text component for all text rendering:

```tsx
import { Text } from '@codecademy/gamut';

// With variant
<Text variant="title-lg">Heading</Text>
<Text variant="p-base">Body text</Text>

// With semantic element
<Text as="h1" variant="title-xl">Main heading</Text>

// With states
<Text center>Centered text</Text>
<Text highlight>Highlighted text</Text>

// With truncation
<Text truncate="ellipsis" truncateLines={2}>
  Long text that will truncate
</Text>
```

**Available variants:**

- Titles: `title-xs`, `title-sm`, `title-md`, `title-lg`, `title-xl`
- Paragraphs: `p-sm`, `p-base`, `p-lg`
- Code: `code`
- Labels: `label`

**Available states:**

- `center`: Center align text
- `block`: Display as block
- `highlight`: Add background highlight
- `screenreader`: Visually hidden, screen reader only
- `smooth`: Enable font smoothing

### Tabs

Use Tabs for tabbed navigation and content:

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@codecademy/gamut';

<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>;
```

For navigation tabs:

```tsx
import { TabNav, TabNavLink } from '@codecademy/gamut';

<TabNav>
  <TabNavLink href="/page1">Page 1</TabNavLink>
  <TabNavLink href="/page2">Page 2</TabNavLink>
</TabNav>;
```

### Disclosure (Accordion/Collapsible)

Use Disclosure for expandable content:

```tsx
import {
  Disclosure,
  DisclosureButton,
  DisclosureBody,
} from '@codecademy/gamut';

<Disclosure>
  <DisclosureButton>Click to expand</DisclosureButton>
  <DisclosureBody>Hidden content</DisclosureBody>
</Disclosure>;
```

### Forms

Use GridForm for structured forms:

```tsx
import {
  GridForm,
  GridFormInputGroup,
  GridFormButtons,
} from '@codecademy/gamut';

<GridForm onSubmit={handleSubmit}>
  <GridFormInputGroup name="email" label="Email" type="email" required />
  <GridFormButtons submitText="Submit" onCancel={handleCancel} />
</GridForm>;
```

## Important patterns

### Component composition

Gamut components are designed to be composed together:

```tsx
<FlexBox flexDirection="column" gap={16}>
  <Box bg="primary" p={24} borderRadius="lg">
    <Text variant="title-md" color="white">
      Title
    </Text>
  </Box>
  <FlexBox gap={8}>
    <Badge>New</Badge>
    <Tag>React</Tag>
  </FlexBox>
</FlexBox>
```

### Accessibility

All Gamut components follow accessibility best practices:

- Use semantic HTML elements via the `as` prop
- Include proper ARIA attributes
- Support keyboard navigation
- Use SkipToContent for skip links
- Use HiddenText for screen reader content

### TypeScript support

All components export TypeScript types:

```tsx
import { BoxProps, TextProps } from '@codecademy/gamut';

const MyComponent: React.FC<BoxProps> = (props) => {
  return <Box {...props} />;
};
```

## Common use cases

### Building a card

```tsx
<Box
  bg="background-secondary"
  p={24}
  borderRadius="lg"
  border="1px solid"
  borderColor="border"
>
  <Text variant="title-md" mb={8}>
    Card Title
  </Text>
  <Text variant="p-base">Card content</Text>
</Box>
```

### Creating a modal

```tsx
import { Drawer, Overlay } from '@codecademy/gamut';

<Overlay>
  <Drawer onRequestClose={handleClose}>
    <Text variant="title-lg">Modal Title</Text>
    {/* Content */}
  </Drawer>
</Overlay>;
```

### Implementing a menu

```tsx
import { Menu } from '@codecademy/gamut';

<Menu>
  <Menu.Button>Options</Menu.Button>
  <Menu.List>
    <Menu.Item onSelect={handleAction1}>Action 1</Menu.Item>
    <Menu.Item onSelect={handleAction2}>Action 2</Menu.Item>
  </Menu.List>
</Menu>;
```

## Recent component additions

The following components were recently added to Gamut:

### Card

A flexible container component for displaying grouped content with optional interactive states:

```tsx
import { Card } from '@codecademy/gamut';

<Card p={24} isInteractive>
  <Text variant="title-md">Card Title</Text>
  <Text variant="p-base">Card content goes here</Text>
</Card>;
```

**Key props:**

- `isInteractive: boolean` - Adds hover and focus states for clickable cards
- Standard Box props (padding, background, border, etc.)

### FadeInSlideOut

An animation component that fades in and slides out content with smooth transitions:

```tsx
import { FadeInSlideOut } from '@codecademy/gamut';

<FadeInSlideOut isVisible={isVisible} slideDirection="up">
  <Box>Animated content</Box>
</FadeInSlideOut>;
```

**Key props:**

- `isVisible: boolean` - Controls visibility and animation state
- `slideDirection: 'up' | 'down' | 'left' | 'right'` - Direction of slide animation

### DataList

A semantic component for displaying key-value pairs or definition lists:

```tsx
import { DataList } from '@codecademy/gamut';

<DataList
  data={[
    { key: 'Status', value: 'Active' },
    { key: 'Created', value: '2024-01-15' },
  ]}
/>;
```

Perfect for displaying metadata, specifications, or structured information.

### DataTable

A comprehensive table component with sorting, filtering, and pagination support:

```tsx
import { DataTable } from '@codecademy/gamut';

<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ]}
  rows={data}
/>;
```

**Key features:**

- Column definitions with custom rendering
- Sortable columns
- Filterable content
- Pagination support

### Video

Embeds video content with proper accessibility and responsive sizing:

```tsx
import { Video } from '@codecademy/gamut';

<Video src="https://example.com/video.mp4" title="Demo video" />;
```

**Key props:**

- `src: string` - Video source URL or embed URL
- `title: string` - Accessible title for the video
- `controls: boolean` - Show native video controls (default: true)
- `autoplay: boolean` - Auto-play video (default: false)

### FeatureShimmer

A loading placeholder component with shimmer animation for content that's loading:

```tsx
import { FeatureShimmer } from '@codecademy/gamut';

<FeatureShimmer width={300} height={200} borderRadius="lg" />;
```

Used while content is loading to provide visual feedback.

### Tabs enhancements

The Tabs component now supports the `shouldForceMount` prop:

```tsx
import { Tabs } from '@codecademy/gamut';

<Tabs shouldForceMount>
  <Tabs.Tab label="Tab 1">Content 1</Tabs.Tab>
  <Tabs.Tab label="Tab 2">Content 2</Tabs.Tab>
</Tabs>;
```

**Key props:**

- `shouldForceMount: boolean` - Keeps all tab content mounted in the DOM (useful for performance-critical content or animations)

### InfoTip enhancements

The InfoTip component now supports escape key handling:

```tsx
import { InfoTip } from '@codecademy/gamut';

<InfoTip>
  <InfoTip.Trigger>Hover me</InfoTip.Trigger>
  <InfoTip.Content>Helpful information. Press ESC to close.</InfoTip.Content>
</InfoTip>;
```

The component now closes when the user presses the Escape key, improving keyboard accessibility.

## Dependencies

All Gamut components require:

- `react` ^17.0.2 || ^18.2.0
- `react-dom` ^17.0.2 || ^18.2.0
- `@emotion/react` ^11.4.0
- `@emotion/styled` ^11.3.0

The package is installed as:

```bash
yarn add @codecademy/gamut
```

Or use `@codecademy/gamut-kit` to manage all Gamut packages together.
