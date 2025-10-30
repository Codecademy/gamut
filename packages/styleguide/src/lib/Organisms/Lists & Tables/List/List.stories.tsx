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
  StopSignIcon,
  StreakIcon,
  TrophyIcon,
} from '@codecademy/gamut-icons';
import { Keyhole } from '@codecademy/gamut-illustrations';
import { Background, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { DisableContainerQueryExample, simpleRows } from '../examples';

const meta: Meta<typeof List> = {
  component: List,
  subcomponents: { ListRow: ListRow as React.ComponentType<unknown> },
  args: {},
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    spacing: 'condensed',
  },
  render: (args) => <ListExample {...args} />,
};

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
          <ListCol size="md" type="header">
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

const TableNonExpandableExample: React.FC<ListProps> = (args) => {
  return (
    <List {...args}>
      {rows.map(({ name, role, ship }, i) => (
        <ListRow key={`table-row-${i}`}>
          <ListCol size="lg" type="header">
            <Text fontWeight={700} truncate="ellipsis" truncateLines={1}>
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
          <ListCol type="control">
            <IconButton
              icon={MiniKebabMenuIcon}
              size="small"
              tip="Options"
              tipProps={{ placement: 'floating' }}
            />
          </ListCol>
        </ListRow>
      ))}
    </List>
  );
};

export const TableNonExpandable: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => <TableNonExpandableExample {...args} />,
};

export const Plain: Story = {
  args: { spacing: 'condensed', variant: 'plain' },
  render: (args) => (
    <Box bg="red" width={1}>
      <ListExample {...args} />
    </Box>
  ),
};

const DangerousListRow = styled(ListRow)(
  css({
    bg: 'background-error',
    color: 'feedback-error',
    fontWeight: 'bold',
    borderRadius: 'sm',
  })
);

const BorderedListRow = styled(ListRow)(
  css({
    border: 1,
    borderColor: 'primary',
    borderRadius: 'md',
  })
);

const PlainStyledExample: React.FC = () => {
  return (
    <List variant="plain">
      <ListRow>
        <ListCol size="xl">A List item</ListCol>
        <ListCol size="md">Some normal content</ListCol>
      </ListRow>
      {/* eslint-disable-next-line no-alert */}
      <DangerousListRow onClick={() => alert('Danger!')}>
        <ListCol size="xl">A dangerous styled item</ListCol>
        <ListCol size="md">More styled content</ListCol>
        <ListCol fill justify="right" size="sm">
          <StopSignIcon size={24} />
        </ListCol>
      </DangerousListRow>
      <ListRow>
        <ListCol size="xl">Another List item</ListCol>
        <ListCol size="md">Standard content</ListCol>
      </ListRow>
      <BorderedListRow>
        <ListCol size="xl">A Custom Bordered Item</ListCol>
        <ListCol size="md">With custom border</ListCol>
      </BorderedListRow>
    </List>
  );
};

export const PlainStyled: Story = {
  render: () => <PlainStyledExample />,
};

const ListCardExample: React.FC = (args) => {
  return (
    <List {...args}>
      {rows.map(({ name, ship, role }) => (
        <ListRow>
          <ListCol fill>
            <Text truncate="ellipsis" truncateLines={1} variant="title-lg">
              {name}
            </Text>
          </ListCol>
          <ListCol>
            <FlexBox flexDirection="column" p={4}>
              <Keyhole height="6rem" />
              {role}
            </FlexBox>
          </ListCol>
          <ListCol size="xl">
            <FlexBox
              alignItems="center"
              bg="palePink"
              flexDirection="column"
              height="8rem"
              justifyContent="center"
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
            <Box bg="background-selected" flex={1} height={1} p={8}>
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
};

export const FillingEmptySpace: Story = {
  render: (args) => <FillingEmptySpaceExample {...args} />,
};

const JustificationExample: React.FC<ListProps> = (args) => {
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
};

export const HorizontalScrolling: Story = {
  args: { spacing: 'condensed', scrollable: true },
  render: (args) => <HorizontalScrollingExample {...args} />,
};

const ResponsiveAnatomyExample: React.FC<ListProps> = (args) => {
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
        <ListCol fill size="md">
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
            color="text-disabled"
            lineHeight="title"
            mt={4}
            variant="p-small"
          >
            <StreakIcon mb={4} mr={8} size={18} verticalAlign="middle" />
            87%
          </Text>
        </ListCol>
        <ListCol fill size="sm">
          <Text
            color="text-disabled"
            lineHeight="title"
            mt={4}
            variant="p-small"
          >
            <TrophyIcon mb={4} mr={8} size={18} verticalAlign="middle" />
            48%
          </Text>
        </ListCol>
        <ListCol fill size="sm">
          <Text
            color="text-disabled"
            lineHeight="title"
            mt={4}
            variant="p-small"
          >
            <StarIcon mb={4} mr={8} size={18} verticalAlign="middle" />
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
      <Text as="span" color="text-accent" fontWeight="bold">
        {name}
      </Text>
      ,{' '}
      <Text as="span" color="text-accent" fontWeight="bold">
        {role}
      </Text>{' '}
      of the{' '}
      <Text as="span" color="text-accent" fontWeight="bold">
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
    <ListCol fill size="md">
      <FlexBox column>
        <Text color="text-disabled" textTransform="uppercase" variant="p-small">
          Rank
        </Text>
        <Text variant="title-xs">{role}</Text>
      </FlexBox>
    </ListCol>
    <ListCol fill size="sm">
      <Text color="text-disabled" lineHeight="title" mt={4} variant="p-small">
        <StreakIcon mb={4} mr={8} size={18} verticalAlign="middle" />
        87%
      </Text>
    </ListCol>
    <ListCol fill size="sm">
      <Text color="text-disabled" lineHeight="title" mt={4} variant="p-small">
        <TrophyIcon mb={4} mr={8} size={18} verticalAlign="middle" />
        48%
      </Text>
    </ListCol>
    <ListCol fill size="sm">
      <Text color="text-disabled" lineHeight="title" mt={4} variant="p-small">
        <StarIcon mb={4} mr={8} size={18} verticalAlign="middle" />
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
      expanded={isExpanded}
      key={key}
      renderExpanded={() => <ExpandedRow name={name} role={role} ship={ship} />}
    >
      <ExpandedColumns name={name} role={role} ship={ship} />
      <ListCol size="lg" type="control">
        <TextButton>Hail</TextButton>
        <ExpandControl
          disabled={false}
          expanded={isExpanded}
          onExpand={() => setExpanded(!isExpanded)}
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
            key={key}
            name={name}
            role={role}
            ship={ship}
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
      renderExpanded={() => <ExpandedRow name={name} role={role} ship={ship} />}
      onClick={() => setExpanded(!isExpanded)}
    >
      <ExpandedColumns name={name} role={role} ship={ship} />
      <ListCol size="xl" type="control">
        <FlexBox center mt={{ _: 8, xs: 0 }} pl={{ _: 0, xs: 16 }} width={1}>
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
          <ExpandableRowClick key={key} name={name} role={role} ship={ship} />
        ))}
      </List>
    </Box>
  </Background>
);

export const ExpandedRowGuide: Story = {
  render: (args) => <ExpandedTemplateRowClick {...args} />,
};

const ExpandableTableExample: React.FC<ListProps> = ({ variant }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (key: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <List variant={variant}>
      {rows.map(({ name, role, ship }, i) => {
        const key = `table-expandable-${i}`;
        const isExpanded = expandedRows.has(key);
        return (
          <ListRow
            expanded={isExpanded}
            key={key}
            renderExpanded={() => <ExpandedRow name={name} role={role} ship={ship} />}
            onClick={() => toggleRow(key)}
          >
            <ListCol size="lg" type="header">
              <Text fontWeight={700} truncate="ellipsis" truncateLines={1}>
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
            <ListCol size="lg" type="control">
              <FlexBox center mt={{ _: 8, xs: 0 }} pl={{ _: 0, xs: 16 }} width={1}>
                <Rotation rotated={isExpanded}>
                  <ArrowChevronDownIcon color="secondary" />
                </Rotation>
              </FlexBox>
            </ListCol>
          </ListRow>
        );
      })}
    </List>
  );
};

export const TableExpandable: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => <ExpandableTableExample {...args} />,
};

export const SpaceSystemProps: Story = {
  args: {
    p: 16,
  },
  render: (args) => (
    <Background bg="beige">
      <ListExample {...args} />
    </Background>
  ),
};

const ListDisableContainerQueryExample: React.FC<ListProps> = () => {
  const defaultComponent = (
    <List spacing="condensed" variant="table">
      {simpleRows.map(({ name, ship }) => (
        <ListRow key={name}>
          <ListCol size="md" type="header">
            {name}
          </ListCol>
          <ListCol fill>{ship}</ListCol>
          <ListCol justify="right" type="control">
            {ship}
          </ListCol>
        </ListRow>
      ))}
    </List>
  );

  const disabledComponent = (
    <List disableContainerQuery spacing="condensed" variant="table">
      {simpleRows.map(({ name, ship }) => (
        <ListRow key={name}>
          <ListCol size="md" type="header">
            {name}
          </ListCol>
          <ListCol fill>{ship}</ListCol>
          <ListCol justify="right" type="control">
            {ship}
          </ListCol>
        </ListRow>
      ))}
    </List>
  );

  return (
    <DisableContainerQueryExample
      componentName="List"
      defaultComponent={defaultComponent}
      disabledComponent={disabledComponent}
    />
  );
};

export const DisableContainerQuery: Story = {
  args: {},
  render: () => <ListDisableContainerQueryExample />,
};
