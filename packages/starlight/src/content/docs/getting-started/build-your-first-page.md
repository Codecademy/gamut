---
title: Build your first page
description: A hands-on tutorial that takes you from an installed Gamut app to a working page with layout, typography, a card, and a button.
sidebar:
  order: 2
---

This tutorial builds a small "welcome" page using five Gamut components: `Background`, `GridBox`, `Text`, `Card`, and `FillButton`. By the end you'll have a real page and a feel for how Gamut components compose.

It assumes you've completed [Installation](/getting-started/installation/) and have `GamutProvider` wrapping your app.

## 1. Lay down a colored surface

`Background` paints a semantic color behind its children and keeps text inside it readable in both color modes. Start your page component with one:

```tsx title="WelcomePage.tsx"
import { Background } from '@codecademy/gamut-styles';

export const WelcomePage = () => (
  <Background bg="beige" p={32}>
    {/* content goes here */}
  </Background>
);
```

Run your app. You should see a full-width beige panel with 32px of padding and nothing in it yet.

## 2. Add a heading

Drop in `Text` for the page title. The `as` prop controls which HTML element renders, independent of the visual style:

```tsx
import { Background } from '@codecademy/gamut-styles';
import { Text } from '@codecademy/gamut';

export const WelcomePage = () => (
  <Background bg="beige" p={32}>
    <Text as="h1" fontSize={32} fontWeight="title">
      Welcome to Gamut
    </Text>
  </Background>
);
```

Refresh — you now have a styled heading sitting in the beige panel.

## 3. Arrange content in a grid

`GridBox` is a `display: grid` container that accepts Gamut's spacing and layout props. Use it to lay a card next to some supporting copy:

```tsx
import { Background } from '@codecademy/gamut-styles';
import { Text } from '@codecademy/gamut';
import { GridBox } from '@codecademy/gamut';

export const WelcomePage = () => (
  <Background bg="beige" p={32}>
    <Text as="h1" fontSize={32} fontWeight="title">
      Welcome to Gamut
    </Text>
    <GridBox
      gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
      gap={24}
      mt={24}
    >
      <Text>
        Gamut components read theme values for color, spacing, and typography,
        so this page already matches the rest of a Gamut app.
      </Text>
      {/* card goes here */}
    </GridBox>
  </Background>
);
```

The `gridTemplateColumns` object is a responsive prop: one column on small screens, two from the `sm` breakpoint up.

## 4. Add a card with a call to action

`Card` gives you a contained surface with optional shadow and hover behavior. Put a `FillButton` inside it:

```tsx
import { Background } from '@codecademy/gamut-styles';
import { Card } from '@codecademy/gamut';
import { FillButton } from '@codecademy/gamut';
import { GridBox } from '@codecademy/gamut';
import { Text } from '@codecademy/gamut';

export const WelcomePage = () => (
  <Background bg="beige" p={32}>
    <Text as="h1" fontSize={32} fontWeight="title">
      Welcome to Gamut
    </Text>
    <GridBox
      gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
      gap={24}
      mt={24}
    >
      <Text>
        Gamut components read theme values for color, spacing, and typography,
        so this page already matches the rest of a Gamut app.
      </Text>
      <Card shadow="soft" p={24}>
        <Text as="h2" fontSize={20} fontWeight="title" mb={8}>
          Ready to keep going?
        </Text>
        <Text mb={16}>
          Explore the component reference to see everything available to you.
        </Text>
        <FillButton variant="primary" href="/components/">
          Browse components
        </FillButton>
      </Card>
    </GridBox>
  </Background>
);
```

## 5. Check your work

You should now have a page with:

- A beige background panel with consistent padding.
- A page heading and supporting copy.
- A responsive two-column layout that collapses to one column on narrow screens.
- A card containing a secondary heading, copy, and a primary button that links to the component reference.

Every prop you used above — `bg`, `p`, `gap`, `mt`, `shadow`, `variant` — comes from Gamut's shared system props or a component's own variant list, which is why they work the same way across components. The [Components](/components/) reference documents the full prop table for each one, and each component page's **Variants** section shows every value a prop like `shadow` or `variant` can take.

## Next steps

- Skim [Using this site](/getting-started/using-this-site/) to learn how the rest of the docs are organized.
- Read a [Guide](/guides/) for a specific task, like theming your app or building a form.
- Look up a component's full API in [Components](/components/).
