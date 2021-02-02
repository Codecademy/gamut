import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import {
  AppHeaderMainMenuMobile,
  AppHeaderMainMenuMobileProps,
} from './../index';

const action = jest.fn();

const link1Href = 'https://codecademy.com';
const link2Href = 'https://news.codecademy.com';

const sublink1Id = 'sublink-1';
const sublink2Id = 'sublink-2';
const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';

const idToTestId = (id: string) => {
  return `app-header-link-${id}`;
};

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
        createMockAppHeaderLinkItem(sublink1Id, sublink1Href, 'cheatsheet'),
        createMockAppHeaderLinkItem(sublink2Id, sublink2Href, 'blog'),
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

  it('does not render the submenu on load', () => {
    expect(
      screen.queryByTestId(idToTestId(sublink1Id))
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(idToTestId(sublink2Id))
    ).not.toBeInTheDocument();
  });

  it('renders a submenu when its target button is clicked', () => {
    renderAppHeaderMainMenuMobile();
    const targetButton = screen.getByRole('button');
    targetButton.click();
    expect(action).toHaveBeenCalled();
    expect(screen.getByTestId(idToTestId(sublink1Id)));
    expect(screen.getByTestId(idToTestId(sublink2Id)));
  });
});
