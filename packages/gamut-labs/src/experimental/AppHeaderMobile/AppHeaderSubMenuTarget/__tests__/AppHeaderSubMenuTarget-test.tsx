import { AppHeaderDropdownItem } from '@codecademy/gamut-labs/src/experimental/AppHeader/AppHeaderElements/types';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderSubMenuTarget, AppHeaderSubMenuTargetProps } from '../index';

const sublink1Href = 'https://google.com';
const openSubMenu = jest.fn();

const mockItem: AppHeaderDropdownItem = {
  dataTestId: 'test-target',
  id: 'test-target',
  text: 'submenu target',
  trackingTarget: 'tracking data',
  type: 'dropdown',
  popover: [createMockAppHeaderLinkItem('sublink-1', sublink1Href, 'forum')],
};

const props: AppHeaderSubMenuTargetProps = {
  item: mockItem,
  openSubMenu,
};

const renderAppHeaderSubMenuTarget = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderSubMenuTarget {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderSubMenuTarget', () => {
  it('calls openSubMenu when the submenu target link is clicked', () => {
    renderAppHeaderSubMenuTarget();
    screen.getByText('submenu target').click();
    expect(openSubMenu).toHaveBeenCalled();
  });
});
