// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, DataList, DataTable, FlexBox, Text } from '@codecademy/gamut';
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

export const FullDataList: Story = {
  render: () => <DataListTemplate />,
};

export const Default: Story = {
  args: {},
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

const DisableContainerQueryExample = (args) => {
  const simpleRows = [
    { name: 'Jean Luc Picard', role: 'Captain' },
    { name: 'Wesley Crusher', role: 'Deus Ex Machina' },
  ];

  const simpleColumns = [
    { key: 'name', header: 'Name', type: 'header', size: 'md' },
    { key: 'role', header: 'Role', fill: true },
  ];

  return (
    <FlexBox flexDirection="column" gap={24}>
      <Box>
        <Text mb={8} variant="title-sm">
          Default (Container Queries Enabled)
        </Text>
        <Box border="1px solid" borderColor="border-tertiary" maxWidth="320px" p={16}>
          <DataList
            id="default-container-query"
            idKey="name"
            rows={simpleRows}
            columns={simpleColumns}
            spacing="condensed"
            header={true}
          />
        </Box>
        <Text color="text-secondary" mt={8} variant="p-small">
          Container queries apply responsive behavior based on the container width
        </Text>
      </Box>

      <Box>
        <Text mb={8} variant="title-sm">
          With Container Queries Disabled
        </Text>
        <Box border="1px solid" borderColor="border-tertiary" maxWidth="320px" p={16}>
          <DataList
            id="disabled-container-query"
            idKey="name"
            rows={simpleRows}
            columns={simpleColumns}
            spacing="condensed"
            header={true}
            disableContainerQuery={true}
          />
        </Box>
        <Text color="text-secondary" mt={8} variant="p-small">
          Responsive behavior is based only on viewport width (media queries)
        </Text>
      </Box>
    </FlexBox>
  );
};

export const DisableContainerQuery: Story = {
  args: {},
  render: (args) => <DisableContainerQueryExample {...args} />,
};
