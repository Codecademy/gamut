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
