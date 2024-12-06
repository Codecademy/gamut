import { LayoutGrid } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import {
  columns,
  gapColumns,
  offsetColumns,
  renderColumnChildren,
  rowColumns,
  rowspanColumns,
} from './examples';

const meta: Meta<typeof LayoutGrid> = {
  component: LayoutGrid,
  args: { gap: 24 },
};

export default meta;
type Story = StoryObj<typeof LayoutGrid>;

export const Default: Story = {
  render: ({ gap }) => (
    <LayoutGrid gap={gap}>
      {renderColumnChildren(columns, 'rowspan')}
    </LayoutGrid>
  ),
};

export const GridGap: Story = {
  render: ({ gap }) => (
    <LayoutGrid gap={gap}>
      {renderColumnChildren(gapColumns, 'grid-gap')}
    </LayoutGrid>
  ),
};

export const RowHeight: Story = {
  render: ({ gap }) => (
    <LayoutGrid gap={gap} rowHeight="75">
      {renderColumnChildren(rowColumns, 'row-height')}
    </LayoutGrid>
  ),
};

export const Offset: Story = {
  render: ({ gap }) => (
    <LayoutGrid gap={gap} rowHeight="75">
      {renderColumnChildren(offsetColumns as any, 'offset')}
    </LayoutGrid>
  ),
};

export const Rowspans: Story = {
  render: ({ gap }) => (
    <LayoutGrid gap={gap} rowHeight="75">
      {renderColumnChildren(rowspanColumns[0], 'rowspan', rowspanColumns[1])}
    </LayoutGrid>
  ),
};
