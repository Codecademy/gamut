import {
  Box,
  FillButton,
  FlexBox,
  IconButton,
  List,
  ListCol,
  ListProps,
  ListRow,
  Text,
  TextButton,
} from '@codecademy/gamut';
import {
  MiniDeleteIcon,
  MiniKebabMenuIcon,
  StarIcon,
  StreakIcon,
  TrophyIcon,
} from '@codecademy/gamut-icons';
import { ColorMode } from '@codecademy/gamut-styles';
import React from 'react';

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

export const DemoTemplate: React.FC = (args) => {
  return (
    <List {...args}>
      {rows.map(({ name, ship }) => (
        <ListRow>
          <ListCol size="md">{name}</ListCol>
          <ListCol fill>{ship}</ListCol>
        </ListRow>
      ))}
    </List>
  );
};

export const CondensedTemplate: React.FC<ListProps> = (args, { mode }) => (
  <ColorMode mode={mode}>
    <List {...args}>
      {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
        <ListRow key={key}>
          <ListCol size="lg" type="header">
            <Text fontWeight={700} truncate="ellipsis">
              {name}
            </Text>
          </ListCol>
          <ListCol size="lg" collapse>
            <Text variant="p-small" color="text-disabled" truncate="ellipsis">
              {role}
            </Text>
          </ListCol>
          <ListCol size="lg" fill collapse>
            <Text variant="p-small" color="text-disabled" truncate="ellipsis">
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
            <IconButton icon={MiniKebabMenuIcon} size="small" />
            <IconButton icon={MiniDeleteIcon} size="small" />
          </ListCol>
        </ListRow>
      ))}
    </List>
  </ColorMode>
);

export const NormalTemplate: React.FC<ListProps> = (args, { mode }) => (
  <ColorMode mode={mode}>
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
          <ListCol size="md" fill collapse>
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
  </ColorMode>
);

const sizes = ['content', 'sm', 'md', 'lg', 'xl'];

export const ColumnTemplate = () => {
  return (
    <List spacing="condensed">
      {sizes.map((size) => (
        <ListRow>
          <ListCol size={size} fill={size === 'fill'}>
            <Box height={1} flex={1} p={8} bg="background-selected">
              {size}
            </Box>
          </ListCol>
        </ListRow>
      ))}
    </List>
  );
};

export const ColumnModifierTemplate = () => {
  return (
    <List spacing="condensed">
      <ListRow>
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
        <ListCol size="md" collapse>
          <Box height={1} flex={1} p={8} bg="background-selected">
            Medium - Collapse
          </Box>
        </ListCol>
      </ListRow>
    </List>
  );
};

export const ResponsiveAnatomyTemplate = () => {
  return (
    <List spacing="condensed">
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
        <ListCol type="control" size="md" collapse>
          <Box height={1} flex={1} p={8} bg="background-selected">
            Controls
          </Box>
        </ListCol>
      </ListRow>
    </List>
  );
};

export const ResponsiveTemplate = () => {
  return (
    <List spacing="condensed">
      <ListRow>
        <ListCol size="lg" type="header">
          <Text fontWeight={700} truncate="ellipsis">
            Header
          </Text>
        </ListCol>
        <ListCol size="lg" collapse>
          <Text variant="p-small" color="text-disabled" truncate="ellipsis">
            Content
          </Text>
        </ListCol>
        <ListCol size="lg" fill collapse>
          <Text variant="p-small" color="text-disabled" truncate="ellipsis">
            Content
          </Text>
        </ListCol>
        <ListCol type="control">
          <IconButton icon={MiniKebabMenuIcon} size="small" />
          <IconButton icon={MiniDeleteIcon} size="small" />
        </ListCol>
      </ListRow>
    </List>
  );
};
