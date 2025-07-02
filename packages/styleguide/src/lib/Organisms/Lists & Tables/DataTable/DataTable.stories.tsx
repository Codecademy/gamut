// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DataTable } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import { CustomEmptyState, DataTableTemplate } from '../examples';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  args: {
    id: 'crew',
    idKey: 'name',
    query: { sort: { name: 'desc', role: 'asc' } },
    rows: [
      {
        name: 'Jean Luc Picard',
        'a very important role': 'Captain',
        ship: 'USS Enterprise',
      },
      {
        name: 'Wesley Crusher',
        'a very important role': 'Deus Ex Machina',
        ship: 'USS Enterprise',
      },
      {
        name: 'Geordie LaForge',
        'a very important role': 'Chief Engineer / Rascal',
        ship: 'Borg Cube',
      },
      {
        name: 'Data',
        'a very important role': 'Lt. Commander / Scamp',
        ship: 'He is a ship',
      },
      {
        name: `Miles Edward O'Brien, 24th Century Man`,
        'a very important role': 'Command Master Chief',
        ship: 'Deep Space 9',
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
      {
        label: 'Rank',
        key: 'a very important role',
        size: 'lg',
        sortable: true,
      },
      { label: 'Ship', key: 'ship', size: 'lg', sortable: true, fill: true },
    ],
    spacing: 'condensed',
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FullDataTable: Story = {
  render: () => <DataTableTemplate />,
};

export const EmptyState: Story = {
  args: {
    rows: [],
    shadow: true,
    scrollable: true,
    height: '45vh',
    minHeight: '300px',
  },
  render: (args) => <DataTable {...args} />,
};

export const EmptyStateCustom: Story = {
  args: {
    rows: [],
    shadow: true,
    scrollable: true,
    height: '45vh',
    minHeight: '300px',
    emptyMessage: <CustomEmptyState />,
  },
  render: (args) => <DataTable {...args} />,
};

export const LoadingRows: Story = {
  args: { loading: true, shadow: true },
};

export const Scrollable: Story = {
  args: { shadow: true },
};

export const Default: Story = {
  args: {},
};

export const RowBreakpointMd: Story = {
  args: {
    columns: [
      { label: 'Name', key: 'name', size: 'md', sortable: true },
      {
        label: 'Rank',
        key: 'a very important role',
        size: 'md',
        sortable: true,
      },
      { label: 'Ship', key: 'ship', size: 'md', sortable: true, fill: true },
    ],
    header: true,
    height: 'auto',
    idKey: 'name',
    rowBreakpoint: 'md',
    rows: [
      {
        name: 'Jean-Luc Picard',
        'a very important role': 'Captain',
        ship: 'Enterprise-D',
      },
      {
        name: 'William Riker',
        'a very important role': 'Commander',
        ship: 'Enterprise-D',
      },
      {
        name: 'Data',
        'a very important role': 'Lt. Commander',
        ship: 'Enterprise-D',
      },
    ],
    spacing: 'condensed',
    shadow: true,
    scrollable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates using the `rowBreakpoint` prop with `DataTable`.\nRows will be rendered in a stacked (grid) layout on screens smaller than the medium (md) breakpoint and change to a traditional horizontal table row starting at the md breakpoint.',
      },
    },
  },
};
