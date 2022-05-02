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
      popover: [
        {
          title: 'sopranos',
          description: 'ok',
          data: [
            {
              id: 'a',
              type: 'link',
              text: 'junior',
              trackingTarget: 'a',
              href: 'dd',
            },
            {
              id: 'b',
              type: 'link',
              text: 'christopher',
              trackingTarget: 'b',
              href: '/abc',
            },
          ],
        },
      ],
    },
  });

  describe('on key down', () => {
    it('makes links accessible', () => {
      const { view } = renderView();
      const menuElement = view.getByText('catalog');

      expect(view.getAllByRole('link', { hidden: true })).toHaveLength(3);
      menuElement.focus();
      fireEvent.keyDown(menuElement, { key: KEY_CODES.DOWN });

      expect(view.getAllByRole('link')).toHaveLength(3);
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
