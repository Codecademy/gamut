import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  AppHeaderSubMenuMobile,
  AppHeaderSubMenuMobileProps,
} from './../index';

const subMenuHeading = 'Community';
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
        href: 'google.com',
        trackingTarget: '',
        type: 'link',
      },
      {
        dataTestId: '',
        id: 'sublink-2',
        text: 'blog',
        href: 'medium.com',
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
    screen.getByRole('heading').click();
    expect(onClick).toHaveBeenCalled();
  });

  // it('renders the sub menu links', () => {
  //   renderAppHeaderSubMenuMobile();
  //   screen.getByRole('link').click();
  //   expect(onClick).toHaveBeenCalled();
  // });

  // it('sublinks link to the provided hrefs', () => {
  //   renderAppHeaderDropdown();
  //   screen.getByRole('button').click();
  //   expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(
  //     testDropdownUrls[0]
  //   );
  //   expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual(
  //     testDropdownUrls[1]
  //   );
  // });

  it('links back to the main menu', () => {
    renderAppHeaderSubMenuMobile();
    screen.getByText('main menu').click();
    expect(handleClose).toHaveBeenCalled();
  });
});
