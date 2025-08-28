// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DataList, DataTable, FlexBox } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import { cols, CustomEmptyState, DataListTemplate } from '../examples';

const meta: Meta<typeof DataList> = {
  component: DataList,
  args: {
    id: 'crew',
    idKey: 'name',
    query: { sort: { name: 'desc', role: 'asc' } },
    rows: [
      { name: 'Jean Luc Picard', role: 'Captain', ship: 'USS Enterprise' },
      {
        name: 'Wesley Crusher',
        role: 'Deus Ex Machina',
        ship: 'USS Enterprise',
      },
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
    ],
    columns: [
      {
        label: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
        sortable: true,
      },
      { label: 'Rank', key: 'role', size: 'lg', sortable: true },
      { label: 'Ship', key: 'ship', size: 'lg', sortable: true, fill: true },
    ],
    header: false,
    spacing: 'condensed',
    onRowSelect: () => {},
    onRowExpand: () => {},
    expandedContent: ({ row }) => (
      <FlexBox borderColor="background-hover" borderTop={1} p={16} pl={[0, 64]}>
        <DataTable
          columns={[
            { key: 'name', size: 'md' },
            { key: 'text', size: 'lg' },
          ]}
          header={false}
          id={row.name}
          idKey="id"
          rows={[
            { id: 1, name: 'Sub Row 1', text: 'Ooo very cool' },
            { id: 2, name: 'Sub Row 2', text: 'Ooo very cool' },
            { id: 3, name: 'Sub Row 3', text: 'Ooo very cool' },
          ]}
          variant="table"
        />
      </FlexBox>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  args: {},
};

export const FullDataList: Story = {
  render: () => <DataListTemplate />,
};

export const Expanded: Story = {
  args: {
    expanded: ['Data'],
  },
};

export const Selected: Story = {
  args: {
    selected: ['Data'],
  },
};

export const EmptyState: Story = {
  args: {
    columns: cols,
    header: true,
    rows: [],
    height: '45vh',
    minHeight: '300px',
  },
};

export const EmptyStateCustom: Story = {
  args: {
    columns: cols,
    header: true,
    rows: [],
    height: '45vh',
    minHeight: '300px',
    emptyMessage: <CustomEmptyState />,
  },
};
