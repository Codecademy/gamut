import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  AppHeaderSubMenuMobile,
  AppHeaderSubMenuMobileProps,
} from './../index';

const subMenuHeading = 'Community';
const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';
const onClick = jest.fn();
const handleClose = jest.fn();

const props: AppHeaderSubMenuMobileProps = {
  item: {
    dataTestId: '',
    id: 'test-link',
    text: subMenuHeading,
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
  handleClose: handleClose,
  onClick: onClick,
};

const renderAppHeaderSubMenuMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderSubMenuMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderSubMenuMobile', () => {
  it('displays the sub menu title', () => {
    renderAppHeaderSubMenuMobile();
    expect(screen.getByRole('heading').innerHTML).toBe(subMenuHeading);
  });

  it('renders the sub menu links', () => {
    renderAppHeaderSubMenuMobile();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('creates sublinks with the provided hrefs', () => {
    renderAppHeaderSubMenuMobile();
    expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(
      sublink1Href
    );
    expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual(
      sublink2Href
    );
  });

  it('links back to the main menu', () => {
    renderAppHeaderSubMenuMobile();
    screen.getByText('Full Menu').click();
    expect(handleClose).toHaveBeenCalled();
  });
});
