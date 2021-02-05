import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderSubMenuMobile, AppHeaderSubMenuMobileProps } from '..';

const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';
const onClick = jest.fn();
const handleClose = jest.fn();

const props: AppHeaderSubMenuMobileProps = {
  item: {
    dataTestId: '',
    id: 'test-link',
    text: 'menu heading',
    trackingTarget: '',
    type: 'dropdown',
    popover: [
      {
        dataTestId: '',
        id: 'sublink-1',
        text: 'forum',
        href: sublink1Href,
        trackingTarget: '',
        type: 'link',
      },
      {
        dataTestId: '',
        id: 'sublink-2',
        text: 'blog',
        href: sublink2Href,
        trackingTarget: '',
        type: 'link',
      },
    ],
  },
  handleClose,
  onClick,
};

const renderAppHeaderSubMenuMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderSubMenuMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderSubMenuMobile', () => {
  it('creates sublinks with the provided hrefs', () => {
    renderAppHeaderSubMenuMobile();
    const linkArray = screen
      .getAllByRole('link')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual([sublink1Href, sublink2Href]);
  });

  it('calls handleClose when the menu link is clicked', () => {
    renderAppHeaderSubMenuMobile();
    screen.getByText('Full Menu').click();
    expect(handleClose).toHaveBeenCalled();
  });
});
