import { setupRtl } from '@codecademy/gamut-tests';
import { RenderResult, waitFor } from '@testing-library/react';

import { Drawer } from '..';

jest.mock('react-use', () => ({
  ...jest.requireActual<{}>('react-use'),
  useMedia: () => false,
}));
const renderView = setupRtl(Drawer, {
  children: <div data-testid="drawer-content">Howdy!</div>,
});

describe('Drawer', () => {
  const expectDrawerOpen = (view: RenderResult) =>
    waitFor(() => view.getByTestId('drawer-content'));
  const expectDrawerClosed = (view: RenderResult) =>
    waitFor(() => expect(view.queryByTestId('drawer-content')).toBeNull());

  it('renders content when "expanded" is true', async () => {
    const { view } = renderView({ expanded: true });
    await expectDrawerOpen(view);
  });

  it('does not render content when "expanded" is false', async () => {
    const { view } = renderView({ expanded: false });
    await expectDrawerClosed(view);
  });
});
