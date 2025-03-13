// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, DataTable, FlexBox, Text } from '@codecademy/gamut';
import { BlueprintWhite } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

import { DataTableTemplate } from '../examples';

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

export const CustomEmptyState: Story = {
  args: {
    rows: [],
    shadow: true,
    scrollable: true,
    height: '45vh',
    minHeight: '300px',
    emptyMessage: (
      <Box as="tbody" width="100%">
        <Box as="tr" width="inherit">
          <FlexBox
            bg="paleBlue"
            border={2}
            borderColor="border-tertiary"
            borderRadius="md"
            zIndex={1}
            as="th"
            center
            flexDirection="column"
            left="calc(50% - 160px)"
            p={16}
            position="sticky"
            top="calc(50% - 66px)"
            width="320px"
          >
            <BlueprintWhite aria-hidden width="200px" />
            <Text fontFamily="monospace" mt={16}>
              Nothing to see here!
            </Text>
          </FlexBox>
        </Box>
      </Box>
    ),
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
