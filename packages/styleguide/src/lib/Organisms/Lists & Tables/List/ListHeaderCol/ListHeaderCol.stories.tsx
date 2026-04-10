import { List, ListCol, ListRow, TableHeader } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { listStoryRows as rows } from '../listStoryData';

const meta: Meta<typeof List> = {
  title: 'Organisms/Lists & Tables/List/ListHeaderCol',
  /** Examples use `List` as the root so controls match `List` props (`spacing`, `variant`, etc.). */
  component: List,
  args: {},
};

export default meta;
type ListCompositionStory = StoryObj<typeof List>;

const HeaderColumnCellsExample: React.FC = () => (
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

export const HeaderColumnCells: ListCompositionStory = {
  render: () => <HeaderColumnCellsExample />,
};

export const Playground: ListCompositionStory = {
  args: {
    spacing: 'condensed',
    variant: 'table',
  },
  render: (args) => (
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
  ),
};
