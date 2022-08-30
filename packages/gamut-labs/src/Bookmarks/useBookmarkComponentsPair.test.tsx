import { MockGamutProvider } from '@codecademy/gamut-tests';
import { cleanup, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CrossDeviceItemId } from '../GlobalHeader/types';
import { mockBookmarkParts } from './fixtures';
import { CrossDeviceBookmarksView } from './types';
import {
  BookmarkComponentsPairProps,
  useBookmarkComponentsPair,
} from './useBookmarkComponentsPair';

const mockSetOpenCrossDeviceItemId = jest.fn();

const defaultProps: BookmarkComponentsPairProps = {
  openCrossDeviceItemId: CrossDeviceItemId.UNSET,
  setOpenCrossDeviceItemId: mockSetOpenCrossDeviceItemId,
  bookmarkParts: mockBookmarkParts,
  view: CrossDeviceBookmarksView.DESKTOP,
  isAnon: false,
};

describe('useBookmarkComponentsPair', () => {
  it('returns nulls when there are no bookmarkParts', async () => {
    const hook = renderHook(() =>
      useBookmarkComponentsPair({ ...defaultProps, bookmarkParts: undefined })
    );
    expect(hook.result.current).toEqual([null, null]);
  });

  describe('when bookmarkParts provided', () => {
    it('returns an icon button as first element in pair that when clicked will call the passed setOpenCrossDeviceItemId func to toggle bookmarks in global nav', async () => {
      const hook = renderHook(() =>
        useBookmarkComponentsPair({
          ...defaultProps,
        })
      );

      render(
        <MockGamutProvider>
          {hook.result.current[0]?.renderElement()}
        </MockGamutProvider>
      );

      act(() => {
        userEvent.click(screen.getByText('IMA BOOKMARKS BUTTON'));
      });

      // toggle bookmarks ON
      expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
      expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('bookmarks');

      // rerender with the simulated react state change from parent
      mockSetOpenCrossDeviceItemId.mockReset();

      const postUpdateHook = renderHook(() =>
        useBookmarkComponentsPair({
          ...defaultProps,
          openCrossDeviceItemId: 'bookmarks',
        })
      );

      cleanup();

      render(
        <MockGamutProvider>
          {postUpdateHook.result.current[0]?.renderElement()}
        </MockGamutProvider>
      );

      act(() => {
        userEvent.click(screen.getByText('IMA BOOKMARKS BUTTON'));
      });

      // toggle bookmarks OFF
      expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
      expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('');
    });

    const viewCases = [
      [CrossDeviceBookmarksView.DESKTOP, 'DESKTOP BOOKMARKS CONTENT'],
      [CrossDeviceBookmarksView.MOBILE, 'MOBILE BOOKMARKS CONTENT'],
    ];

    test.each(viewCases)(
      'returns a wrapped %s content component as second element in pair that respects the value of openCrossDeviceItemId to determine whether it displays the inner content',
      (view: CrossDeviceItemId, contentText) => {
        const hook = renderHook(() =>
          useBookmarkComponentsPair({
            ...defaultProps,
            view,
          })
        );

        render(<MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>);

        expect(screen.queryByText(contentText)).toBeNull();

        const postUpdateHook = renderHook(() =>
          useBookmarkComponentsPair({
            ...defaultProps,
            view,
            openCrossDeviceItemId: CrossDeviceItemId.BOOKMARKS,
          })
        );

        cleanup();

        render(
          <MockGamutProvider>
            {postUpdateHook.result.current[1]}
          </MockGamutProvider>
        );

        screen.getByText(contentText);
      }
    );
  });
});
