import { setupRtl } from '@codecademy/gamut-tests';

import { AppWrapper } from '..';

const renderView = setupRtl(AppWrapper, { children: 'content' });

describe('AppWrapper', () => {
  it('renders children', () => {
    const { view } = renderView();

    view.getByText('content');
  });

  it('renders as a div', () => {
    const { view } = renderView();

    expect(view.container.firstChild?.nodeName.toLowerCase()).toBe('div');
  });
});
