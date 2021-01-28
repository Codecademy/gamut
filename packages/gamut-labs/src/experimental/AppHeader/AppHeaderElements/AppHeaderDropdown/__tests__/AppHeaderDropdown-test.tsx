import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderDropdown, AppHeaderDropdownProps } from '..';

const testDropdownTexts = ['Test SubLink 1 Text', 'Test Sublink 2 Text'];
const testDropdownUrls = ['test-sublink-url-1', 'test-sublink-url-2'];

const props: AppHeaderDropdownProps = {
  baseZIndex: 1,
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
  onClick: jest.fn(),
};

const renderAppHeaderDropdown = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderDropdown {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderDropdown', () => {
  it('displays sublinks text upon expanding the dropdown', () => {
    renderAppHeaderDropdown();
    screen.getByRole('button').click();
    expect(screen.getByText(testDropdownTexts[0]));
    expect(screen.getByText(testDropdownTexts[1]));
  });

  it('sublinks link to the provided hrefs', () => {
    renderAppHeaderDropdown();
    screen.getByRole('button').click();
    expect(
      screen.getAllByRole('link').map((node) => node.getAttribute('href'))
    ).toStrictEqual(testDropdownUrls);
  });
});
