---
name: gamut-icons
description: Use 300+ icons from the Gamut icon library
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/gamut-icons'
  audience: developers
---

## Overview

Gamut provides 300+ SVG icon components. This skill covers:

- Finding and importing icons
- Sizing and coloring icons
- Icon props and customization
- Accessibility best practices
- Icon naming conventions

## Key concepts

### Icon Components

All icons are exported as React components from `@codecademy/gamut-icons`:

```tsx
import {
  AddBoldIcon,
  CloseIcon,
  AlertIcon,
  CheckIcon,
} from '@codecademy/gamut-icons';

<AddBoldIcon />
<CloseIcon size={24} />
<AlertIcon color="red" />
```

### Icon Props

All icon components accept these props:

- `size`: Number | string - Icon size (default: 16)
- `color`: String - Icon color (CSS color value or theme token)
- `title`: String - Accessible title for the icon
- `aria-label`: String - ARIA label for accessibility
- `className`: String - CSS class name
- All SVG element props (e.g., `onClick`, `style`, etc.)

```tsx
<AlertIcon
  size={32}
  color="warning"
  title="Warning"
  aria-label="Warning icon"
/>
```

### Sizing Icons

Icons can be sized using the `size` prop:

```tsx
// Small icons
<CloseIcon size={12} />
<CloseIcon size={16} />  // Default

// Medium icons
<CloseIcon size={24} />
<CloseIcon size={32} />

// Large icons
<CloseIcon size={48} />
<CloseIcon size={64} />
```

You can also use string values:

```tsx
<CloseIcon size="1em" />   // Scales with font size
<CloseIcon size="100%" />  // Fills container
```

### Coloring Icons

Icons inherit the current text color by default:

```tsx
<Text color="primary">
  <CheckIcon /> {/* Icon will be primary color */}
  Success
</Text>
```

Or set color explicitly:

```tsx
<CheckIcon color="green" />
<CheckIcon color="#00ff00" />
<CheckIcon color="rgb(0, 255, 0)" />
```

Use theme color tokens:

```tsx
<AlertIcon color="danger" />
<CheckIcon color="success" />
<InfoIcon color="info" />
```

### Icon Count

Gamut provides **300+ icons** across the library:

- **333 regular icons** in the standard icon set
- **33 mini icons** for smaller UI elements

### Icon Naming Convention

Icon names follow this pattern:

- PascalCase
- Descriptive name
- Ends with "Icon"

Examples:

- `AlertIcon` - Alert/warning icon
- `CloseIcon` - Close/X icon
- `AddBoldIcon` - Bold plus/add icon
- `ArrowChevronRightIcon` - Right-pointing chevron
- `PersonFilledIcon` - Filled person icon

### Icon Categories

Icons are organized by purpose:

**Navigation:**

- `ArrowChevronDownIcon`
- `ArrowChevronRightIcon`
- `ArrowChevronRightBoldIcon`
- `HouseEntranceIcon`
- `LinkIcon`
- `HyperlinkIcon`

**Actions:**

- `AddBoldIcon`
- `CloseIcon`
- `CopyIcon`
- `DownloadIcon`
- `FileEditIcon`
- `FileSearchIcon`
- `ForkIcon`
- `LockIcon`
- `UnlockHeavyIcon`
- `MinimizeBarIcon`
- `SynchronizeRefreshArrowIcon`
- `TranslateIcon`

**Status/Alerts:**

- `AlertIcon`
- `AlertFilledIcon`
- `InformationalIcon`
- `InfoCircleIcon`
- `StopSignIcon`
- `InProgressIcon`

**People:**

- `PersonIcon`
- `PersonFilledIcon`
- `PersonChatIcon`
- `PeopleIcon`
- `MultipleUsersIcon`

**Learning:**

- `LearnIcon`
- `LessonIcon`
- `QuizIcon`
- `AssessmentsIcon`
- `BookLibraryIcon`
- `ExperienceIcon`
- `ExploreIcon`
- `ObjectiveIcon`
- `OverviewIcon`
- `PortfolioProjectIcon`
- `ProfessionalCertificateIcon`
- `ProjectsIcon`
- `TrackIcon`

**Technology:**

- `DataScienceIcon`
- `DataVisualizationIcon`
- `ItIcon`
- `MobileDevelopmentIcon`
- `RailsIcon`
- `SwiftIcon`
- `FilePyIcon`
- `MarkdownIcon`
- `TypeIcon`

**UI Elements:**

- `BadgeIcon`
- `CalendarIcon`
- `ClockIcon`
- `AlarmClockIcon`
- `CloudIcon`
- `InteractiveCursorIcon`
- `KeyboardIcon`
- `ListIcon`
- `MarkerIcon`
- `MicrophoneIcon`
- `PhoneIcon`
- `PinIcon`
- `RoundPinIcon`
- `TagIcon`
- `QrCodeScanIcon`
- `ClosedCaptionIcon`
- `VolumeControlMediumIcon`

**Media/Social:**

- `GithubIcon`
- `TwitterIcon`
- `SpotifyIcon`
- `TikTokIcon`
- `DiscordOutlineIcon`
- `GplusIcon`

**Gamification:**

- `RibbonFilledIcon`
- `RocketIcon`
- `TrophyIcon`
- `StarCircleIcon`
- `RatingStarCircleIcon`
- `SmileyStarEyesIcon`
- `ThumbsUpFilledIcon`

**Recent Additions (2025):**

- `CoachingIcon` - Coaching/mentorship
- `AdminIcon` - Administration
- `HierarchyIcon` - Organizational hierarchy
- `SkillsoftIcon` - Skillsoft branding

**Special:**

- `AiChatSparkIcon`
- `AiChatSparkFilledIcon`
- `FaviconIcon`
- `FaviconSolidIcon`
- `FallbackSkillIcon`
- `EmailFilledIcon`
- `OneTimeIcon`
- `PathChangeIcon`
- `PipExitIcon`
- `ResponsiveIcon`
- `SavingBankIcon`
- `VisaIcon`
- `CoachingIcon`
- `CommunityIcon`
- `ProgrammingTeamChatIcon`

## Common patterns

### Icon with text

```tsx
<FlexBox gap={8} alignItems="center">
  <CheckIcon size={20} color="success" />
  <Text>Completed</Text>
</FlexBox>
```

### Interactive icon button

```tsx
<button onClick={handleClose}>
  <CloseIcon size={24} aria-label="Close dialog" />
</button>
```

### Icon in a styled component

```tsx
import styled from '@emotion/styled';
import { AlertIcon } from '@codecademy/gamut-icons';

const StyledAlertIcon = styled(AlertIcon)`
  margin-right: 8px;
  vertical-align: middle;
`;

<StyledAlertIcon size={20} />;
```

### Decorative vs. semantic icons

**Decorative icons** (hide from screen readers):

```tsx
<button>
  <AddBoldIcon aria-hidden="true" />
  <span>Add Item</span>
</button>
```

**Semantic icons** (provide meaning):

```tsx
<CloseIcon aria-label="Close dialog" role="img" />
```

### Icon with dynamic color

```tsx
const StatusIcon = ({
  status,
}: {
  status: 'success' | 'error' | 'warning';
}) => {
  const colorMap = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
  };

  const IconComponent = {
    success: CheckIcon,
    error: CloseIcon,
    warning: AlertIcon,
  }[status];

  return <IconComponent color={colorMap[status]} size={20} />;
};
```

## Accessibility

Always consider accessibility when using icons:

1. **Icons with text:** Make the icon decorative with `aria-hidden="true"`

```tsx
<button>
  <SaveIcon aria-hidden="true" />
  Save
</button>
```

2. **Icons without text:** Provide an accessible label

```tsx
<button>
  <CloseIcon aria-label="Close menu" />
</button>
```

3. **Informational icons:** Use `role="img"` and `title`

```tsx
<AlertIcon
  role="img"
  title="Warning: This action cannot be undone"
  aria-label="Warning"
/>
```

## Storybook Documentation

Browse all available icons interactively in Storybook:

- **[Icon Gallery](https://gamut.codecademy.com/?path=/docs/atoms-icon--docs)** - View all icons with search and filtering

## Dependencies

The package requires:

- `@emotion/react` ^11.4.0
- `@emotion/styled` ^11.3.0
- `react` ^17.0.2 || ^18.2.0

Install with:

```bash
yarn add @codecademy/gamut-icons
```

## Finding icons

All available icons are located in `packages/gamut-icons/src/svg/regular/` (regular icons) and `packages/gamut-icons/src/svg/mini/` (mini icons) as SVG files. The component name is the SVG filename converted to PascalCase with "Icon" suffix.

Example:

- `alert-filled-icon.svg` → `AlertFilledIcon`
- `arrow-chevron-right-bold-icon.svg` → `ArrowChevronRightBoldIcon`
- `ai-chat-spark-icon.svg` → `AiChatSparkIcon`

To find all available icons, check the exports in `packages/gamut-icons/src/index.ts` or browse the SVG files.
