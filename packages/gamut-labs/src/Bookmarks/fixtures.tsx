import { CrossDeviceBookmarkParts } from './types';

export const mockBookmarkParts: CrossDeviceBookmarkParts = {
  icon: jest.fn(() => <div>IMA BOOKMARKS BUTTON</div>),
  buttonAriaLabel: 'Bookmarks - greatest thing since sliced bread',
  desktop: jest.fn(() => <div>DESKTOP BOOKMARKS CONTENT</div>),
  mobile: jest.fn(() => <div>MOBILE BOOKMARKS CONTENT</div>),
  onEnable: jest.fn(),
};
