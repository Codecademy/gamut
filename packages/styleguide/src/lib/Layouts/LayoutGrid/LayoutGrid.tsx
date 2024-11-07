import { Column, ColumnProps, LayoutGrid } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import { Example } from './examples';

const meta: Meta<typeof LayoutGrid> = {
  component: LayoutGrid,
  args: { gap: 24 },
};

export default meta;
type Story = StoryObj<typeof LayoutGrid>;

const columns = [
  { size: 12 },
  ...new Array(2).fill({ size: 6 }),
  ...new Array(3).fill({ size: 4 }),
  ...new Array(4).fill({ size: 3 }),
  ...new Array(6).fill({ size: 2 }),
  ...new Array(12).fill({ size: 1 }),
];

const gapColumns = [
  { size: 12 },
  ...new Array(2).fill({ size: 6 }),
  ...new Array(3).fill({ size: 4 }),
];

const rowColumns = new Array(12).fill({ size: 3 });

const offsets = [
  { offset: 2, size: 4 },
  { size: 2 },
  { size: 2 },
  { size: 4 },
  { size: 8 },
  { offset: { _: 6, md: 4, lg: 2 }, size: 6 },
  { offset: { _: 0, md: 4 }, size: 6 },
];

const renderColumnChildren = (
  arr: { size: ColumnProps['size']; offset?: ColumnProps['offset'] }[],
  id: string
) => {
  return arr.map((props, i) => (
    <Column key={`${id}-${i * 1}`} {...props}>
      <Example>{props?.size?.toString()}</Example>
    </Column>
  ));
};

export const Default: Story = {
  args: {
    children: <>{renderColumnChildren(columns, 'rowspan')}</>,
  },
};

export const GridGap: Story = {
  args: {
    children: <>{renderColumnChildren(gapColumns, 'grid-gap')}</>,
  },
};

export const RowHeight: Story = {
  args: {
    rowHeight: '75',
    children: <>{renderColumnChildren(rowColumns, 'row-height')}</>,
  },
};

export const Offset: Story = {
  args: {
    rowHeight: '75',
    children: <>{renderColumnChildren(offsets, 'offset')}</>,
  },
};
