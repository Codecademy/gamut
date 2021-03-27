import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderMainMenuMobile } from '../index';

const action = jest.fn();

const link1Href = 'https://codecademy.com';
const link2Href = 'https://news.codecademy.com';

const fillButtonTestId = 'app-header-link-sign-up';
const fillButtonText = 'sign up';
const fillButtonHref = 'codecademy.com/sign-up';

const sublink1Id = 'sublink-1';
const sublink2Id = 'sublink-2';
const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';

const profileLink1Id = 'profile-link-1';
const profileLink2Id = 'profile-link-2';
const profileLink1Href = 'test.io';
const profileLink2Href = 'stackoverflow.com';

const idToTestId = (id: string) => {
  return `app-header-link-${id}`;
};

const renderView = setupRtl(AppHeaderMainMenuMobile, {
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
    {
      dataTestId: '',
      id: 'test-profile-link',
      text: 'profile target',
      userDisplayName: 'user name',
      trackingTarget: '',
      type: 'profile-dropdown',
      avatar: '',
      popover: [
        [
          createMockAppHeaderLinkItem(
            profileLink1Id,
            profileLink1Href,
            'profile link'
          ),
        ],
        [
          createMockAppHeaderLinkItem(
            profileLink2Id,
            profileLink2Href,
            'my account'
          ),
        ],
      ],
    },
    {
      id: 'sign-up-btn',
      dataTestId: fillButtonTestId,
      type: 'fill-button',
      href: fillButtonHref,
      text: fillButtonText,
      trackingTarget: 'sign-up-tracking',
    },
  ],
});

describe('AppHeaderMainMenuMobile', () => {
  beforeEach(() => {
    renderView();
  });
  it('renders links for the items with type link and type fill-button', () => {
    const linkArray = screen
      .getAllByRole('link')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual([link1Href, link2Href, fillButtonHref]);
  });

  it('renders a target button for the items with type dropdown', () => {
    const targetButton = screen.getAllByRole('button')[0];
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
    const targetButton = screen.getByText('resources target');
    targetButton.click();
    expect(action).toHaveBeenCalled();
    expect(screen.getByTestId(idToTestId(sublink1Id)));
    expect(screen.getByTestId(idToTestId(sublink2Id)));
  });

  it('renders the profile submenu when its target button is clicked', () => {
    const targetButton = screen.getByText('user name');
    targetButton.click();
    expect(action).toHaveBeenCalled();
    expect(screen.getByTestId(idToTestId(profileLink1Id)));
    expect(screen.getByTestId(idToTestId(profileLink2Id)));
  });
});
