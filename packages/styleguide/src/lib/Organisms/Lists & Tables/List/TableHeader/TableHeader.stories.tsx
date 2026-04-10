import { List, ListCol, ListProps, ListRow, TableHeader } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { listStoryRows as rows } from '../listStoryData';

const meta: Meta<typeof TableHeader> = {
  title: 'Organisms/Lists & Tables/List/TableHeader',
  component: TableHeader,
  args: {},
};

export default meta;
type ListCompositionStory = StoryObj<typeof List>;

const TableWithHeaderExample: React.FC<ListProps> = (args) => (
  <List {...args} as="table" variant="table">
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

export const WithTableHeader: ListCompositionStory = {
  args: { spacing: 'condensed' },
  render: (args) => <TableWithHeaderExample {...args} />,
};
