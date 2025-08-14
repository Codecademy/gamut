// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, DataTable, FlexBox, Text } from '@codecademy/gamut';
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
          <DataTable
            id="default-table-query"
            idKey="name"
            rows={simpleRows}
            columns={simpleColumns}
            spacing="condensed"
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
          <DataTable
            id="disabled-table-query"
            idKey="name"
            rows={simpleRows}
            columns={simpleColumns}
            spacing="condensed"
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
