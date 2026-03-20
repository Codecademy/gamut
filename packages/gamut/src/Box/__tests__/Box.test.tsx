import { setupRtl } from '@codecademy/gamut-tests';

import { Box, FlexBox, GridBox } from '..';

describe('Box', () => {
  const renderView = setupRtl(Box, { children: 'box content' });

  it('renders children', () => {
    const { view } = renderView();

    view.getByText('box content');
  });

  it('renders as a div by default', () => {
    const { view } = renderView();

    expect(view.getByText('box content').tagName.toLowerCase()).toBe('div');
  });
});

describe('FlexBox', () => {
  const renderView = setupRtl(FlexBox, { children: 'flex content' });

  it('renders children', () => {
    const { view } = renderView();

    view.getByText('flex content');
  });
});

describe('GridBox', () => {
  const renderView = setupRtl(GridBox, { children: 'grid content' });

  it('renders children', () => {
    const { view } = renderView();

    view.getByText('grid content');
  });
});
