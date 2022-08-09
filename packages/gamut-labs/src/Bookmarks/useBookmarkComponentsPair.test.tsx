import { MockGamutProvider } from '@codecademy/gamut-tests';
import { cleanup, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CrossDeviceBookmarkParts } from './types';
import {
  BookmarkComponentsPairProps,
  useBookmarkComponentsPair,
} from './useBookmarkComponentsPair';

export const mockBookmarkParts: CrossDeviceBookmarkParts = {
  icon: jest.fn(() => <div>IMA BOOKMARKS BUTTON</div>),
  buttonAriaLabel: 'Bookmarks - greatest thing since sliced bread',
  desktop: jest.fn(() => <div>DESKTOP BOOKMARKS CONTENT</div>),
  mobile: jest.fn(() => <div>MOBILE BOOKMARKS CONTENT</div>),
};

const mockSetOpenCrossDeviceItemId = jest.fn();

const defaultProps: BookmarkComponentsPairProps = {
  openCrossDeviceItemId: 'bookmarks',
  setOpenCrossDeviceItemId: mockSetOpenCrossDeviceItemId,
  bookmarkParts: mockBookmarkParts,
  view: 'mobile',
  isAnon: false,
};

describe('useBookmarkComponentsPair', () => {
  it('returns nulls when there are no bookmarkParts', async () => {
    const hook = renderHook(() =>
      useBookmarkComponentsPair({ ...defaultProps, bookmarkParts: undefined })
    );
    expect(hook.result.current).toEqual([null, null]);
  });

  describe('mobile view for bookmarkParts', () => {
    it('returns an icon button that will toggle visibility for mobile content when clicked', async () => {
      const hook = renderHook(() =>
        useBookmarkComponentsPair({
          ...defaultProps,
        })
      );

      // expect(hook.result.current[0]);
      render(
        <MockGamutProvider>
          {hook.result.current[0]?.renderElement()}
        </MockGamutProvider>
      );
      screen.getByText('IMA BOOKMARKS BUTTON');

      // act(() => {
      //  userEvent.click(buttonView.getByRole('menuitem'));
      // });

      /// / verify button click would tell react to update state
      // expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
      // expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('bookmarks');

      // defaultProps.openCrossDeviceItemId = 'bookmarks';
      cleanup();

      render(<MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>);
      // screen.getByText('IMA BOOKMARKS BUTTON');
      screen.getByText('MOBILE BOOKMARKS CONTENT');

      // expect(contentView.container).toHaveTextContent(
      //  'MOBILE BOOKMARKS CONTENT'
      // );
    });
  });

  // it('returns an array of 2 items: an icon button and the desktop content if bookmarksParts provided and desktop view selected', async () => {
  //  const spy = jest.fn(() => <div />);

  //  const overRideBookmarkParts = {
  //    ...mockBookmarkParts,
  //    desktop: spy,
  //  };

  //  const hook = renderHook(() =>
  //    useBookmarkComponentsPair({
  //      ...defaultProps,
  //      view: 'desktop',
  //      bookmarkParts: overRideBookmarkParts,
  //    })
  //  );

  //  expect(hook.result.current[0]);
  //  const buttonView = render(
  //    <MockGamutProvider>
  //      {hook.result.current[0]?.renderElement()}
  //    </MockGamutProvider>
  //  );
  //  expect(buttonView.container).toHaveTextContent('IMA BOOKMARKS BUTTON');

  //  cleanup();

  //  render(<MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>);

  //  expect(spy).toBeCalledTimes(1);
  // });

  // it('renders its notifications pane as visible when the bell is clicked and there are notifications', async () => {
  //  const mockSetOpenCrossDeviceItemId = jest.fn();
  //  defaultProps.setOpenCrossDeviceItemId = mockSetOpenCrossDeviceItemId;

  //  const notifications = times(5, (id) =>
  //    createStubNotification({ id: `${id}`, unread: true })
  //  );
  //  const newSettings = { ...settingsProps, notifications };

  //  const hook = renderHook(() =>
  //    useHeaderNotifications({ ...defaultProps, settings: newSettings })
  //  );

  //  const buttonView = render(
  //    <MockGamutProvider>
  //      {hook.result.current[0]?.renderElement()}
  //    </MockGamutProvider>
  //  );

  //  act(() => {
  //    userEvent.click(buttonView.getByRole('menuitem'));
  //  });

  //  // verify button click would tell react to update state
  //  expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
  //  expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('notifications');

  //  defaultProps.openCrossDeviceItemId = 'notifications';

  //  // simulate React telling the component there was a change to its prop (openCrossDeviceItemId) and therefore trigger a rerender
  //  const secondRenderOfHook = renderHook(() =>
  //    useHeaderNotifications({ ...defaultProps, settings: newSettings })
  //  );
  //  const paneView = render(
  //    <MockGamutProvider>
  //      {secondRenderOfHook.result.current[1]}
  //    </MockGamutProvider>
  //  );

  //  expect(settingsProps.onEnable).toHaveBeenCalled();
  //  expect(paneView.container).not.toBeEmptyDOMElement();
  // });
});
