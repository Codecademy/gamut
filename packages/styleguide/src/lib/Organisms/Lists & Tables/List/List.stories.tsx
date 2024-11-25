import {
  Box,
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
  MiniChevronDownIcon,
  MiniDeleteIcon,
  MiniKebabMenuIcon,
  StarIcon,
  StreakIcon,
  TrophyIcon,
} from '@codecademy/gamut-icons';
import { Keyhole } from '@codecademy/gamut-illustrations';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof List> = {
  component: List,
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
}

export const CondensedSpacing: Story = {
  args: { spacing: 'condensed' },
  render: (args) => <ListExample {...args} />,
}

export const CompactSpacing: Story = {
  args: { spacing: 'compact' },
  render: (args) => <ListExample {...args} />,
}

export const Table: Story = {
  args: { spacing: 'condensed', variant: 'table' },
  render: (args) => <ListExample {...args} />,
}

export const Default: Story = {
  args: {
    spacing: 'condensed'
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
    variant: 'card'
  },
  render: (args) => <ListCardExample {...args} />,
};

export const Block: Story = {
  args: {
    variant: 'block',
    spacing: 'condensed'
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
