import {
  Box,
  ExpandControl,
  FillButton,
  FlexBox,
  IconButton,
  List,
  ListCol,
  ListProps,
  ListRow,
  Rotation,
  Text,
  TextButton,
} from '@codecademy/gamut';
import {
  ArrowChevronDownIcon,
  HouseEntranceIcon,
  MiniDeleteIcon,
  MiniKebabMenuIcon,
  StarIcon,
  StreakIcon,
  TrophyIcon,
} from '@codecademy/gamut-icons';
import { Keyhole } from '@codecademy/gamut-illustrations';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof List> = {
  component: List,
  subcomponents: { ListRow: ListRow as React.ComponentType<unknown> },
  args: {},
};

export default meta;
type Story = StoryObj<typeof List>;

const rows = [
  { name: 'Jean Luc Picard', role: 'Captain', ship: 'USS Enterprise' },
  { name: 'Wesley Crusher', role: 'Deus Ex Machina', ship: 'USS Enterprise' },
  {
    name: 'Geordie LaForge',
    role: 'Chief Engineer / Rascal',
    ship: 'Borg Cube',
  },
  {
    name: 'Data',
    role: 'Lt. Commander / Scamp',
    ship: 'He is a ship',
  },
];

const ListExample: React.FC = (args) => {
  return (
    <List {...args}>
      {rows.map(({ name, ship }) => (
        <ListRow>
          <ListCol type="header" size="md">
            {name}
          </ListCol>
          <ListCol fill>{ship}</ListCol>
        </ListRow>
      ))}
    </List>
  );
};

export const NormalSpacing: Story = {
  args: { spacing: 'normal' },
  render: (args) => <ListExample {...args} />,
};

export const CondensedSpacing: Story = {
  args: { spacing: 'condensed' },
  render: (args) => <ListExample {...args} />,
};

export const CompactSpacing: Story = {
  args: { spacing: 'compact' },
  render: (args) => <ListExample {...args} />,
};

export const Table: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => <ListExample {...args} />,
};

export const Default: Story = {
  args: {
    spacing: 'condensed',
  },
  render: (args) => <ListExample {...args} />,
};

const ListCardExample: React.FC = (args) => {
  return (
    <List {...args}>
      {rows.map(({ name, ship, role }) => (
        <ListRow>
          <ListCol size="xl">
            <Text variant="title-lg" truncate="ellipsis" truncateLines={1}>
              {name}
            </Text>
          </ListCol>
          <ListCol>
            <FlexBox flexDirection="column" p={4}>
              <Keyhole height="6rem" />
              {role}
            </FlexBox>
          </ListCol>
          <ListCol size="xl" fill>
            <FlexBox
              flexDirection="column"
              height="8rem"
              bg="palePink"
              justifyContent="center"
              alignItems="center"
              p={8}
            >
              <HouseEntranceIcon size={40} />
              {ship}
            </FlexBox>
          </ListCol>
        </ListRow>
      ))}
    </List>
  );
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
  render: (args) => <ListCardExample {...args} />,
};

export const Block: Story = {
  args: {
    variant: 'block',
    spacing: 'condensed',
  },
  render: (args) => <ListExample {...args} />,
};

export const OrderedList: Story = {
  args: {
    variant: 'table',
    as: 'ol',
    spacing: 'condensed',
  },
  render: (args) => <ListExample {...args} />,
};

const sizes = ['content', 'sm', 'md', 'lg', 'xl'] as const;

const ColumnExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      {sizes.map((size: 'content' | 'sm' | 'md' | 'lg' | 'xl') => (
        <ListRow>
          <ListCol size={size}>
            <Box height={1} flex={1} p={8} bg="background-selected">
              {size}
            </Box>
          </ListCol>
        </ListRow>
      ))}
    </List>
  );
};

export const ColumnSizing: Story = {
  render: (args) => <ColumnExample {...args} />,
};

const FillingEmptySpaceExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      <ListRow>
        <ListCol size="md">
          <Box height={1} flex={1} p={8} bg="background-selected">
            Medium
          </Box>
        </ListCol>
        <ListCol size="md" fill>
          <Box height={1} flex={1} p={8} bg="background-selected">
            Medium - Fill
          </Box>
        </ListCol>
        <ListCol size="md">
          <Box height={1} flex={1} p={8} bg="background-selected">
            Medium
          </Box>
        </ListCol>
        <ListCol size="md" fill>
          <Box height={1} flex={1} p={8} bg="background-selected">
            Medium - Fill
          </Box>
        </ListCol>
        <ListCol size="md">
          <Box height={1} flex={1} p={8} bg="background-selected">
            Medium
          </Box>
        </ListCol>
      </ListRow>
    </List>
  );
};

export const FillingEmptySpace: Story = {
  render: (args) => <FillingEmptySpaceExample {...args} />,
};

const JustificationExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      <ListRow>
        <ListCol size="md" fill>
          Left
        </ListCol>
        <ListCol size="md" justify="right" fill>
          Right
        </ListCol>
      </ListRow>
    </List>
  );
};

export const Justification: Story = {
  render: (args) => <JustificationExample {...args} />,
};

const HorizontalScrollingExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
        <ListRow key={key}>
          <ListCol size="lg" type="header">
            <Text fontWeight={700} truncate="ellipsis" truncateLines={1}>
              {name}
            </Text>
          </ListCol>
          <ListCol size="lg">
            <Text
              variant="p-small"
              color="text-disabled"
              truncate="ellipsis"
              truncateLines={1}
            >
              {role}
            </Text>
          </ListCol>
          <ListCol size="lg" fill>
            <Text
              variant="p-small"
              color="text-disabled"
              truncate="ellipsis"
              truncateLines={1}
            >
              {ship}
            </Text>
          </ListCol>
          <ListCol size="sm">
            <Text variant="p-small" color="text-disabled" lineHeight="title">
              <StreakIcon verticalAlign="bottom" mr={8} />
              87%
            </Text>
          </ListCol>
          <ListCol size="sm">
            <Text variant="p-small" color="text-disabled" lineHeight="title">
              <TrophyIcon verticalAlign="bottom" mr={8} />
              48%
            </Text>
          </ListCol>
          <ListCol size="sm">
            <Text variant="p-small" color="text-disabled" lineHeight="title">
              <StarIcon verticalAlign="bottom" mr={8} />
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
};

export const HorizontalScrolling: Story = {
  args: { spacing: 'condensed', scrollable: true },
  render: (args) => <HorizontalScrollingExample {...args} />,
};

const ResponsiveAnatomyExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      <ListRow>
        <ListCol type="header" size="md">
          <Box height={1} flex={1} p={8} bg="background-selected">
            Header
          </Box>
        </ListCol>
        <ListCol size="md">
          <Box height={1} flex={1} p={8} bg="background-selected">
            Content
          </Box>
        </ListCol>
        <ListCol size="md" fill>
          <Box height={1} flex={1} p={8} bg="background-selected">
            Content
          </Box>
        </ListCol>
        <ListCol type="control" size="md">
          <Box height={1} flex={1} p={8} bg="background-selected">
            Controls
          </Box>
        </ListCol>
      </ListRow>
    </List>
  );
};

export const ResponsiveAnatomy: Story = {
  parameters: {
    docs: { inlineStories: false, iframeHeight: 180 },
  },
  render: (args) => <ResponsiveAnatomyExample {...args} />,
};

const ResponsiveExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      <ListRow>
        <ListCol size="lg" type="header">
          <Text fontWeight={700} truncate="ellipsis" truncateLines={1}>
            Ordered List Header
          </Text>
        </ListCol>
        <ListCol size="lg">
          <Text
            variant="p-small"
            color="text-disabled"
            truncate="ellipsis"
            truncateLines={1}
          >
            Content
          </Text>
        </ListCol>
        <ListCol size="lg" fill>
          <Text
            variant="p-small"
            color="text-disabled"
            truncate="ellipsis"
            truncateLines={1}
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
};

export const Responsive: Story = {
  args: { as: 'ol' },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 180,
    },
  },
  render: (args) => <ResponsiveExample {...args} />,
};

const NormalSpacingGuideExample: React.FC<ListProps> = (args) => (
  <List {...args}>
    {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
      <ListRow key={key}>
        <ListCol size="lg" type="header">
          <FlexBox column>
            <Text
              color="text-disabled"
              textTransform="uppercase"
              variant="p-small"
            >
              {ship}
            </Text>
            <Text variant="title-xs">{name}</Text>
          </FlexBox>
        </ListCol>
        <ListCol size="md" fill>
          <FlexBox column>
            <Text
              color="text-disabled"
              textTransform="uppercase"
              variant="p-small"
            >
              Rank
            </Text>
            <Text variant="title-xs">{role}</Text>
          </FlexBox>
        </ListCol>
        <ListCol fill size="sm">
          <Text
            variant="p-small"
            color="text-disabled"
            lineHeight="title"
            mt={4}
          >
            <StreakIcon size={18} verticalAlign="middle" mr={8} mb={4} />
            87%
          </Text>
        </ListCol>
        <ListCol fill size="sm">
          <Text
            variant="p-small"
            color="text-disabled"
            lineHeight="title"
            mt={4}
          >
            <TrophyIcon size={18} verticalAlign="middle" mr={8} mb={4} />
            48%
          </Text>
        </ListCol>
        <ListCol fill size="sm">
          <Text
            variant="p-small"
            color="text-disabled"
            lineHeight="title"
            mt={4}
          >
            <StarIcon size={18} verticalAlign="middle" mr={8} mb={4} />
            66%
          </Text>
        </ListCol>
        <ListCol size="lg" type="control">
          <TextButton mr={16}>Hail</TextButton>
          <FillButton>Engage</FillButton>
        </ListCol>
      </ListRow>
    ))}
  </List>
);

export const NormalSpacingGuide: Story = {
  args: { spacing: 'normal' },
  render: (args) => <NormalSpacingGuideExample {...args} />,
};

const CondensedSpacingGuideExample: React.FC<ListProps> = (args) => (
  <List {...args}>
    {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
      <ListRow key={key}>
        <ListCol size="lg" type="header">
          <Text fontWeight={700} truncate="ellipsis" truncateLines={1}>
            {name}
          </Text>
        </ListCol>
        <ListCol size="lg">
          <Text
            variant="p-small"
            color="text-disabled"
            truncate="ellipsis"
            truncateLines={1}
          >
            {role}
          </Text>
        </ListCol>
        <ListCol size="lg" fill>
          <Text
            variant="p-small"
            color="text-disabled"
            truncate="ellipsis"
            truncateLines={1}
          >
            {ship}
          </Text>
        </ListCol>
        <ListCol size="sm">
          <Text variant="p-small" color="text-disabled" lineHeight="title">
            <StreakIcon verticalAlign="bottom" mr={8} />
            87%
          </Text>
        </ListCol>
        <ListCol size="sm">
          <Text variant="p-small" color="text-disabled" lineHeight="title">
            <TrophyIcon verticalAlign="bottom" mr={8} />
            48%
          </Text>
        </ListCol>
        <ListCol size="sm">
          <Text variant="p-small" color="text-disabled" lineHeight="title">
            <StarIcon verticalAlign="bottom" mr={8} />
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

export const CondensedSpacingGuide: Story = {
  args: { spacing: 'condensed' },
  render: (args) => <CondensedSpacingGuideExample {...args} />,
};

export const CondensedTableGuide: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => <CondensedSpacingGuideExample {...args} />,
};

interface ExpandableRowProps {
  name: string;
  role: string;
  ship: string;
  key: string;
}

const ExpandedRow: React.FC<Omit<ExpandableRowProps, 'key'>> = ({
  name,
  role,
  ship,
}) => (
  <FlexBox bg="background-selected" column m={16} p={16}>
    <Text fontStyle="italic" smooth>
      Oh, were you expecting to find out more about{' '}
      <Text as="span" fontWeight="bold" color="text-accent">
        {name}
      </Text>
      ,{' '}
      <Text as="span" fontWeight="bold" color="text-accent">
        {role}
      </Text>{' '}
      of the{' '}
      <Text as="span" fontWeight="bold" color="text-accent">
        {ship}
      </Text>
      ? I am very sorry but that is{' '}
      <Text
        as="span"
        color="danger"
        fontWeight="bold"
        textDecoration="underline"
      >
        highly classified
      </Text>{' '}
      information.
    </Text>
  </FlexBox>
);

const ExpandedColumns: React.FC<Omit<ExpandableRowProps, 'key'>> = ({
  name,
  role,
  ship,
}) => (
  <>
    <ListCol size="lg" type="header">
      <FlexBox column>
        <Text color="text-disabled" textTransform="uppercase" variant="p-small">
          {ship}
        </Text>
        <Text variant="title-xs">{name}</Text>
      </FlexBox>
    </ListCol>
    <ListCol size="md" fill>
      <FlexBox column>
        <Text color="text-disabled" textTransform="uppercase" variant="p-small">
          Rank
        </Text>
        <Text variant="title-xs">{role}</Text>
      </FlexBox>
    </ListCol>
    <ListCol fill size="sm">
      <Text variant="p-small" color="text-disabled" lineHeight="title" mt={4}>
        <StreakIcon size={18} verticalAlign="middle" mr={8} mb={4} />
        87%
      </Text>
    </ListCol>
    <ListCol fill size="sm">
      <Text variant="p-small" color="text-disabled" lineHeight="title" mt={4}>
        <TrophyIcon size={18} verticalAlign="middle" mr={8} mb={4} />
        48%
      </Text>
    </ListCol>
    <ListCol fill size="sm">
      <Text variant="p-small" color="text-disabled" lineHeight="title" mt={4}>
        <StarIcon size={18} verticalAlign="middle" mr={8} mb={4} />
        66%
      </Text>
    </ListCol>
  </>
);

const ExpandableButtonClickRow: React.FC<{
  name: string;
  role: string;
  ship: string;
  key: string;
}> = ({ name, role, ship, key }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <ListRow
      key={key}
      expanded={isExpanded}
      renderExpanded={() => <ExpandedRow name={name} role={role} ship={ship} />}
    >
      <ExpandedColumns name={name} role={role} ship={ship} />
      <ListCol size="lg" type="control">
        <TextButton>Hail</TextButton>
        <ExpandControl
          expanded={isExpanded}
          onExpand={() => setExpanded(!isExpanded)}
          disabled={false}
        />
      </ListCol>
    </ListRow>
  );
};

const ExpandedTemplateButtonClick: React.FC<ListProps> = ({ variant }) => (
  <Background bg="black">
    <Box p={8}>
      <List variant={variant}>
        {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
          <ExpandableButtonClickRow
            name={name}
            role={role}
            ship={ship}
            key={key}
          />
        ))}
      </List>
    </Box>
  </Background>
);

export const ExpandableButtonGuide: Story = {
  render: (args) => <ExpandedTemplateButtonClick {...args} />,
};

export const ExpandableRowClick: React.FC<ExpandableRowProps> = ({
  name,
  role,
  ship,
  key,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <ListRow
      expanded={isExpanded}
      key={key}
      onClick={() => setExpanded(!isExpanded)}
      renderExpanded={() => <ExpandedRow name={name} role={role} ship={ship} />}
    >
      <ExpandedColumns name={name} role={role} ship={ship} />
      <ListCol size="xl" type="control">
        <FlexBox mt={{ _: 8, xs: 0 }} pl={{ _: 0, xs: 16 }} width={1} center>
          <Rotation rotated={isExpanded}>
            <ArrowChevronDownIcon color="secondary" />
          </Rotation>
        </FlexBox>
      </ListCol>
    </ListRow>
  );
};

const ExpandedTemplateRowClick: React.FC<ListProps> = ({ as, variant }) => (
  <Background bg="black">
    <Box p={8}>
      <List as={as} variant={variant}>
        {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
          <ExpandableRowClick name={name} role={role} ship={ship} key={key} />
        ))}
      </List>
    </Box>
  </Background>
);

export const ExpandedRowGuide: Story = {
  render: (args) => <ExpandedTemplateRowClick {...args} />,
};
