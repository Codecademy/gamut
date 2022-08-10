import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { AppHeaderCatalogDropdown, KEY_CODES } from '..';

describe('AppHeaderCatalogDropdown', () => {
  const renderView = setupRtl(AppHeaderCatalogDropdown, {
    item: {
      text: 'catalog',
      id: 'the-catalog',
      type: 'catalog-dropdown',
      trackingTarget: 'fine',
    },
  });

  describe('on key down', () => {
    it('makes links accessible', () => {
      const { view } = renderView();
      const menuElement = view.getByText('catalog');

      expect(
        view.getAllByRole('link', { hidden: true }).length
      ).toBeLessThanOrEqual(26);
      menuElement.focus();
      fireEvent.keyDown(menuElement, { key: KEY_CODES.DOWN });

      expect(view.getAllByRole('link').length).toBeLessThanOrEqual(26);
    });
    it('focuses on first title and description section', () => {
      const { view } = renderView();
      const menuElement = view.getByText('catalog');
      menuElement.focus();

      fireEvent.keyDown(menuElement, { key: KEY_CODES.DOWN });

      const [first] = view.getAllByTestId('title-description-section');
      expect(first).toHaveFocus();
    });
  });
});
