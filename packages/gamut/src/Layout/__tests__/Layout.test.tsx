import { setupRtl } from '@codecademy/gamut-tests';
import { within } from '@testing-library/react';

import { Column, LayoutGrid } from '..';

const renderLayoutGrid = setupRtl(LayoutGrid, { children: 'grid content' });
const renderColumn = setupRtl(Column, { children: 'column content' });

describe('LayoutGrid', () => {
  it('renders children', () => {
    const { view } = renderLayoutGrid();

    view.getByText('grid content');
  });
});

describe('Column', () => {
  it('renders children', () => {
    const { view } = renderColumn();

    within(view.container).getByText('column content');
  });

  it('renders with a size prop', () => {
    const { view } = renderColumn({ size: 6 });

    within(view.container).getByText('column content');
  });

  it('renders with an offset prop', () => {
    const { view } = renderColumn({ offset: 2 });

    within(view.container).getByText('column content');
  });
});
