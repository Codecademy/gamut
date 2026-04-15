import {
  Box,
  ExpandControl,
  FlexBox,
  List,
  ListCol,
  ListRow,
  Rotation,
  Text,
  TextButton,
} from '@codecademy/gamut';
import {
  ArrowChevronDownIcon,
  StarIcon,
  StopSignIcon,
  StreakIcon,
  TrophyIcon,
} from '@codecademy/gamut-icons';
import { Background, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { listStoryRows as rows } from '../listStoryData';

const meta: Meta<typeof ListRow> = {
  title: 'Organisms/Lists & Tables/List/ListRow',
  component: ListRow,
  args: {},
};

export default meta;
type Story = StoryObj<typeof ListRow>;
/** Stories that demonstrate ListRow behavior but configure the parent `List`. */
type ListCompositionStory = StoryObj<typeof List>;

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

export const PlainStyled: Story = {
  render: () => {
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
  },
};

interface ExpandableRowProps {
  name: string;
  role: string;
  ship: string;
  rowKey: string;
}

const ExpandedRow: React.FC<Omit<ExpandableRowProps, 'rowKey'>> = ({
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

const ExpandedColumns: React.FC<Omit<ExpandableRowProps, 'rowKey'>> = ({
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
  rowKey: string;
}> = ({ name, role, ship, rowKey }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <ListRow
      expanded={isExpanded}
      key={rowKey}
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

export const ExpandableButtonGuide: ListCompositionStory = {
  render: (args) => {
    return (
      <Background bg="black">
        <Box p={8}>
          <List {...args}>
            {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
              <ExpandableButtonClickRow
                key={key}
                name={name}
                role={role}
                rowKey={key}
                ship={ship}
              />
            ))}
          </List>
        </Box>
      </Background>
    );
  },
};

const ExpandableRowClick: React.FC<ExpandableRowProps> = ({
  name,
  role,
  ship,
  rowKey,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <ListRow
      expanded={isExpanded}
      key={rowKey}
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

export const ExpandedRowGuide: ListCompositionStory = {
  render: (args) => {
    return (
      <Background bg="black">
        <Box p={8}>
          <List {...args}>
            {rows.map(({ name, role, ship }, i, _, key = `example-row-${i}`) => (
              <ExpandableRowClick
                key={key}
                name={name}
                role={role}
                rowKey={key}
                ship={ship}
              />
            ))}
          </List>
        </Box>
      </Background>
    );
  },
};
