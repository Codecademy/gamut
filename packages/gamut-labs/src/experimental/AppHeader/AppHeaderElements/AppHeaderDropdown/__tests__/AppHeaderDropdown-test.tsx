import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

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
    renderView();
    screen.getByRole('button').click();
    expect(screen.getByText(testDropdownTexts[0]));
    expect(screen.getByText(testDropdownTexts[1]));
  });

  it('sublinks link to the provided hrefs', () => {
    renderView();
    screen.getByRole('button').click();
    expect(
      screen.getAllByRole('link').map((node) => node.getAttribute('href'))
    ).toStrictEqual(testDropdownUrls);
  });
});
