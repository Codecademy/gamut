import { setupRtl } from '@codecademy/gamut-tests';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderMainMenuMobile } from '../index';

const action = jest.fn();

const link1Href = 'https://codecademy.com';
const link2Href = 'https://codecademy.com/resources/blog';

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
  onSearch: jest.fn(),
  getItemType: jest.fn(),
});

describe('AppHeaderMainMenuMobile', () => {
  it('renders links for the items with type link and type fill-button', () => {
    const { view } = renderView();
    const linkArray = view
      .getAllByRole('menuitem')
      .map((node) => node.getAttribute('href'))
      .filter((node) => !!node);
    expect(linkArray).toStrictEqual([link1Href, link2Href, fillButtonHref]);
  });

  it('renders a target button for the items with type dropdown', () => {
    const { view } = renderView();
    const targetButton = view.getByLabelText('open resources target submenu');
    expect(targetButton).toHaveTextContent('resources target');
  });

  it('does not render the submenu on load', () => {
    const { view } = renderView();
    expect(view.queryByTestId(idToTestId(sublink1Id))).not.toBeInTheDocument();
    expect(view.queryByTestId(idToTestId(sublink2Id))).not.toBeInTheDocument();
  });

  it('renders a submenu when its target button is clicked', () => {
    const { view } = renderView();
    const targetButton = view.getByText('resources target');
    targetButton.click();
    expect(action).toHaveBeenCalled();
    expect(view.getByTestId(idToTestId(sublink1Id)));
    expect(view.getByTestId(idToTestId(sublink2Id)));
  });

  it('renders the profile submenu when its target button is clicked', () => {
    const { view } = renderView();
    const targetButton = view.getByText('user name');
    targetButton.click();
    expect(action).toHaveBeenCalled();
    expect(view.getByTestId(idToTestId(profileLink1Id)));
    expect(view.getByTestId(idToTestId(profileLink2Id)));
  });
});
