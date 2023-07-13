import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderDropdown } from '..';

const testDropdownTexts = ['Test SubLink 1 Text', 'Test Sublink 2 Text'];
const testDropdownUrls = ['test-sublink-url-1', 'test-sublink-url-2'];

const renderView = setupRtl(AppHeaderDropdown, {
  action: jest.fn(),
  item: {
    dataTestId: '',
    id: 'target-link',
    text: 'Test Link',
    popover: [
      createMockAppHeaderLinkItem(
        'link-0',
        testDropdownUrls[0],
        testDropdownTexts[0]
      ),
      createMockAppHeaderLinkItem(
        'link-1',
        testDropdownUrls[1],
        testDropdownTexts[1]
      ),
    ],
    trackingTarget: '',
    type: 'dropdown',
  },
});

describe('AppHeaderDropdown', () => {
  it('displays sublinks text upon expanding the dropdown', () => {
    const { view } = renderView();
    fireEvent.click(view.getByRole('button'));
    view.getByText(testDropdownTexts[0]);
    view.getByText(testDropdownTexts[1]);
  });

  it('sublinks link to the provided hrefs', () => {
    const { view } = renderView();
    fireEvent.click(view.getByRole('button'));
    expect(
      view.getAllByRole('menuitem').map((node) => node.getAttribute('href'))
    ).toStrictEqual(testDropdownUrls);
  });
});
