import {
  Box,
  FillButton,
  IconButton,
  List,
  ListCol,
  ListRow,
  TableHeader,
  Text,
} from '@codecademy/gamut';
import {
  MiniDeleteIcon,
  MiniKebabMenuIcon,
  StarIcon,
  StreakIcon,
  TrophyIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { listStoryRows as rows } from '../listStoryData';

const meta: Meta<typeof ListCol> = {
  title: 'Organisms/Lists & Tables/List/ListCol',
  component: ListCol,
  args: {},
};

export default meta;
/** Column demos configure the parent `List` wrapper. */
type ListCompositionStory = StoryObj<typeof List>;

const sizes = ['content', 'sm', 'md', 'lg', 'xl'] as const;

export const ColumnSizing: ListCompositionStory = {
  render: (args) => {
    return (
      <List {...args}>
        {sizes.map((size: 'content' | 'sm' | 'md' | 'lg' | 'xl') => (
          <ListRow key={size}>
            <ListCol size={size}>
              <Box bg="background-selected" flex={1} height={1} p={8}>
                {size}
              </Box>
            </ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const FillingEmptySpace: ListCompositionStory = {
  render: (args) => {
    return (
      <List {...args}>
        <ListRow>
          <ListCol size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Medium
            </Box>
          </ListCol>
          <ListCol fill size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Medium - Fill
            </Box>
          </ListCol>
          <ListCol size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Medium
            </Box>
          </ListCol>
          <ListCol fill size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Medium - Fill
            </Box>
          </ListCol>
          <ListCol size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Medium
            </Box>
          </ListCol>
        </ListRow>
      </List>
    );
  },
};

export const Justification: ListCompositionStory = {
  render: (args) => {
    return (
      <List {...args}>
        <ListRow>
          <ListCol fill size="md">
            Left
          </ListCol>
          <ListCol fill justify="right" size="md">
            Right
          </ListCol>
        </ListRow>
      </List>
    );
  },
};

export const HorizontalScrolling: ListCompositionStory = {
  args: { spacing: 'condensed', scrollable: true },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
          <ListRow key={key}>
            <ListCol size="lg" type="header">
              <Text fontWeight="title" truncate="ellipsis" truncateLines={1}>
                {name}
              </Text>
            </ListCol>
            <ListCol size="lg">
              <Text
                color="text-disabled"
                truncate="ellipsis"
                truncateLines={1}
                variant="p-small"
              >
                {role}
              </Text>
            </ListCol>
            <ListCol fill size="lg">
              <Text
                color="text-disabled"
                truncate="ellipsis"
                truncateLines={1}
                variant="p-small"
              >
                {ship}
              </Text>
            </ListCol>
            <ListCol size="sm">
              <Text color="text-disabled" lineHeight="title" variant="p-small">
                <StreakIcon mr={8} verticalAlign="bottom" />
                87%
              </Text>
            </ListCol>
            <ListCol size="sm">
              <Text color="text-disabled" lineHeight="title" variant="p-small">
                <TrophyIcon mr={8} verticalAlign="bottom" />
                48%
              </Text>
            </ListCol>
            <ListCol size="sm">
              <Text color="text-disabled" lineHeight="title" variant="p-small">
                <StarIcon mr={8} verticalAlign="bottom" />
                66%
              </Text>
            </ListCol>
            <ListCol>
              <FillButton size="small">Engage</FillButton>
            </ListCol>
            <ListCol type="control">
              <IconButton
                icon={MiniKebabMenuIcon}
                size="small"
                tip="Options"
                tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
              />
              <IconButton
                icon={MiniDeleteIcon}
                size="small"
                tip="Delete"
                tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
              />
            </ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const ResponsiveAnatomy: ListCompositionStory = {
  parameters: {
    docs: { inlineStories: false, iframeHeight: 180 },
  },
  render: (args) => {
    return (
      <List {...args}>
        <ListRow>
          <ListCol size="md" type="header">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Header
            </Box>
          </ListCol>
          <ListCol size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Content
            </Box>
          </ListCol>
          <ListCol fill size="md">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Content
            </Box>
          </ListCol>
          <ListCol size="md" type="control">
            <Box bg="background-selected" flex={1} height={1} p={8}>
              Controls
            </Box>
          </ListCol>
        </ListRow>
      </List>
    );
  },
};

export const Responsive: ListCompositionStory = {
  args: { as: 'ol' },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 180,
    },
  },
  render: (args) => {
    return (
      <List {...args}>
        <ListRow>
          <ListCol size="lg" type="header">
            <Text fontWeight="title" truncate="ellipsis" truncateLines={1}>
              Ordered List Header
            </Text>
          </ListCol>
          <ListCol size="lg">
            <Text
              color="text-disabled"
              truncate="ellipsis"
              truncateLines={1}
              variant="p-small"
            >
              Content
            </Text>
          </ListCol>
          <ListCol fill size="lg">
            <Text
              color="text-disabled"
              truncate="ellipsis"
              truncateLines={1}
              variant="p-small"
            >
              Content
            </Text>
          </ListCol>
          <ListCol type="control">
            <IconButton
              icon={MiniKebabMenuIcon}
              size="small"
              tip="Options"
              tipProps={{ placement: 'floating' }}
            />
            <IconButton
              icon={MiniDeleteIcon}
              size="small"
              tip="Delete"
              tipProps={{ placement: 'floating' }}
            />
          </ListCol>
        </ListRow>
      </List>
    );
  },
};

/** Table example: `List` is the story root so docs controls match `List` props (`spacing`, `variant`, etc.). */
export const HeaderColumnCells: ListCompositionStory = {
  render: () => {
    return (
      <List as="table" spacing="condensed" variant="table">
        <TableHeader>
          <ListCol columnHeader size="md">
            Name
          </ListCol>
          <ListCol columnHeader size="md">
            Role
          </ListCol>
          <ListCol columnHeader size="md">
            Ship
          </ListCol>
        </TableHeader>
        {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
          <ListRow key={key}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol size="md">{role}</ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const Playground: ListCompositionStory = {
  args: {
    spacing: 'condensed',
    variant: 'table',
  },
  render: (args) => {
    return (
      <List {...args} as="table">
        <TableHeader>
          <ListCol columnHeader size="md">
            Name
          </ListCol>
          <ListCol columnHeader size="md">
            Role
          </ListCol>
          <ListCol columnHeader size="md">
            Ship
          </ListCol>
        </TableHeader>
        {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
          <ListRow key={key}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol size="md">{role}</ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};
