import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { AppHeaderLogoItem } from '../../types';
import { AppHeaderLogo } from '..';

const testUrl = 'https://codecademy.com';
const action = jest.fn();

const item: AppHeaderLogoItem = {
  id: '1dfa',
  href: testUrl,
  type: 'logo',
  pro: false,
  enterprise: false,
  trackingTarget: 'tracking target',
};

const renderView = setupRtl(AppHeaderLogo, {
  action,
  item,
});

describe('AppHeaderLogo', () => {
  it('renders a logo', () => {
    const { view } = renderView();
    view.getByTitle('Codecademy Logo');
  });

  describe('when item.checkMini is set to true', () => {
    it('shows mini logo when window width is within 1200', () => {
      global.innerWidth = 1200;

      const { view } = renderView({
        item: { ...item, pro: true, checkMini: true },
      });
      view.getByTitle('Codecademy Logo Mini');
    });

    it('shows mini logo when window width is within 1260', () => {
      global.innerWidth = 1260;

      const { view } = renderView({
        item: { ...item, pro: true, checkMini: true },
      });
      view.getByTitle('Codecademy Logo Mini');
    });

    it('does NOT show the mini logo when window width is 1199 (outside the 1200-1260 range)', () => {
      global.innerWidth = 1199;

      const { view } = renderView({
        item: { ...item, pro: false, checkMini: true },
      });
      view.getByTitle('Codecademy Logo');
    });

    it('does NOT show the mini logo when window width is 1261 (outside the 1200-1260 range)', () => {
      global.innerWidth = 1261;

      const { view } = renderView({
        item: { ...item, pro: true, checkMini: true },
      });
      view.getByTitle('Codecademy Pro Logo');
    });
  });

  it('does NOT show the mini logo even if in the 1200-1260 range when item.checkMini is not set', () => {
    global.innerWidth = 1230;

    const { view } = renderView({ item: { ...item, pro: false } });
    view.getByTitle('Codecademy Logo');
  });

  it('does NOT show the mini logo even if in the 1200-1260 range when item.checkMini is false', () => {
    global.innerWidth = 1230;

    const { view } = renderView({
      item: { ...item, pro: true, checkMini: false },
    });
    view.getByTitle('Codecademy Pro Logo');
  });

  it('shows the pro logo when user has pro subscription', () => {
    const { view } = renderView({ item: { ...item, pro: true } });
    view.getByTitle('Codecademy Pro Logo');
  });

  it('links to the provided href', () => {
    const { view } = renderView();
    const link = view.getByRole('menuitem');
    expect(link).toHaveAttribute('href', testUrl);
  });

  it('calls action() when clicked', () => {
    const { view } = renderView();
    fireEvent.click(view.getByRole('menuitem'));
    expect(action).toHaveBeenCalled();
  });
});
