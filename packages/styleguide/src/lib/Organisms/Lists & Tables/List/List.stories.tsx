import {
  Box,
  FillButton,
  FlexBox,
  IconButton,
  List,
  ListCol,
  ListRow,
  TableHeader,
  Text,
  TextButton,
} from '@codecademy/gamut';
import {
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
import type { ComponentType } from 'react';

import { DisableContainerQueryExample, simpleRows } from '../examples';
import { listStoryRows as rows } from './listStoryData';

const meta: Meta<typeof List> = {
  title: 'Organisms/Lists & Tables/List/List',
  component: List,
  subcomponents: {
    ListRow: ListRow as ComponentType<unknown>,
    TableHeader: TableHeader as ComponentType<unknown>,
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    spacing: 'condensed',
  },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const NormalSpacing: Story = {
  args: { spacing: 'normal' },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const CondensedSpacing: Story = {
  args: { spacing: 'condensed' },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const CompactSpacing: Story = {
  args: { spacing: 'compact' },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const Table: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const Plain: Story = {
  args: { spacing: 'condensed', variant: 'plain' },
  render: (args) => {
    return (
      <Box width={1}>
        <List {...args}>
          {rows.map(({ name, ship }) => (
            <ListRow key={name}>
              <ListCol size="md" type="header">
                {name}
              </ListCol>
              <ListCol fill>{ship}</ListCol>
            </ListRow>
          ))}
        </List>
      </Box>
    );
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship, role }) => (
          <ListRow key={name}>
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
  },
};

export const Block: Story = {
  args: {
    variant: 'block',
    spacing: 'condensed',
  },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const OrderedList: Story = {
  args: {
    variant: 'table',
    as: 'ol',
    spacing: 'condensed',
  },
  render: (args) => {
    return (
      <List {...args}>
        {rows.map(({ name, ship }) => (
          <ListRow key={name}>
            <ListCol size="md" type="header">
              {name}
            </ListCol>
            <ListCol fill>{ship}</ListCol>
          </ListRow>
        ))}
      </List>
    );
  },
};

export const NormalSpacingGuide: Story = {
  args: { spacing: 'normal' },
  render: (args) => {
    return (
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
  },
};

export const CondensedSpacingGuide: Story = {
  args: { spacing: 'condensed' },
  render: (args) => {
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
  },
};

export const CondensedTableGuide: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => {
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
  },
};

export const SpaceSystemProps: Story = {
  args: {
    p: 16,
  },
  render: (args) => {
    return (
      <Background bg="beige">
        <List {...args}>
          {rows.map(({ name, ship }) => (
            <ListRow key={name}>
              <ListCol size="md" type="header">
                {name}
              </ListCol>
              <ListCol fill>{ship}</ListCol>
            </ListRow>
          ))}
        </List>
      </Background>
    );
  },
};

export const DisableContainerQuery: Story = {
  args: {},
  render: () => {
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
  },
};
