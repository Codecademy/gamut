import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import {
  AppHeaderMainMenuMobile,
  AppHeaderMainMenuMobileProps,
} from './../index';

const link1Href = 'https://codecademy.com';
const link2Href = 'https://news.codecademy.com';

const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';
const action = jest.fn();

const props: AppHeaderMainMenuMobileProps = {
  action,
  items: [
    {
      dataTestId: '',
      id: 'test-link',
      text: 'resources target',
      trackingTarget: '',
      type: 'dropdown',
      popover: [
        createMockAppHeaderLinkItem('sublink-1', sublink1Href, 'cheatsheet'),
        createMockAppHeaderLinkItem('sublink-2', sublink2Href, 'blog'),
      ],
    },
    createMockAppHeaderLinkItem('simple-link-1', link1Href, 'simple link 1'),
    createMockAppHeaderLinkItem('simple-link-2', link2Href, 'simple link 2'),
  ],
};

const renderAppHeaderMainMenuMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderMainMenuMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderMainMenuMobile', () => {
  it('renders links for the items with type link', () => {
    renderAppHeaderMainMenuMobile();
    const linkArray = screen
      .getAllByRole('link')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual([link1Href, link2Href]);
  });

  it('renders a target button for the items with type dropdown', () => {
    renderAppHeaderMainMenuMobile();
    const targetButton = screen.getByRole('button');
    expect(targetButton).toHaveTextContent('resources target');
  });
});
