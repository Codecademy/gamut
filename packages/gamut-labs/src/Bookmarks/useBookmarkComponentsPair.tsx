import { ButtonBaseElements, IconButton, Popover } from '@codecademy/gamut';
import { useRef } from 'react';

import { AnimatedHeaderZone } from '../AppHeader/shared';
import {
  CrossDeviceItemId,
  CrossDeviceStateProps,
} from '../GlobalHeader/types';
import { CrossDeviceBookmarkParts, CrossDeviceBookmarksView } from './types';

export type BookmarkComponentsPairProps = CrossDeviceStateProps & {
  bookmarkParts?: CrossDeviceBookmarkParts;
  view: CrossDeviceBookmarksView;
  isAnon: boolean;
};

export const useBookmarkComponentsPair = ({
  openCrossDeviceItemId,
  setOpenCrossDeviceItemId,
  bookmarkParts,
  view,
  isAnon,
}: BookmarkComponentsPairProps) => {
  const buttonRef = useRef<ButtonBaseElements>(null);

  if (!bookmarkParts) {
    return [null, null];
  }

  const id = CrossDeviceItemId.BOOKMARKS;

  const toggleVisible = () => {
    if (openCrossDeviceItemId !== id) {
      bookmarkParts.onEnable();
    }

    setOpenCrossDeviceItemId(
      openCrossDeviceItemId === id ? CrossDeviceItemId.UNSET : id
    );
  };

  const onRequestCloseHandler = () => {
    // When on the mobile view, we don't want the desktop handler to fire.
    if (window.innerWidth >= 1200) {
      setOpenCrossDeviceItemId(CrossDeviceItemId.UNSET);
    }
  };

  return [
    {
      id,
      type: 'render-element',
      renderElement: () => (
        <IconButton
          aria-label={bookmarkParts.buttonAriaLabel}
          onClick={toggleVisible}
          variant="interface"
          icon={bookmarkParts.icon}
          role="menuitem"
          tabIndex="-1"
          ref={buttonRef}
          display={{ _: isAnon ? 'none' : 'inline-flex', xs: 'inline-flex' }}
          key={`${id}-${view}-button`}
        />
      ),
    },
    <AnimatedHeaderZone
      visible={openCrossDeviceItemId === id}
      key={`${id}-${view}-content`}
    >
      {view === 'desktop' ? (
        <Popover
          align="right"
          verticalOffset={1}
          outline
          isOpen
          targetRef={buttonRef}
          onRequestClose={onRequestCloseHandler}
        >
          <>{bookmarkParts.desktop()}</>
        </Popover>
      ) : (
        bookmarkParts.mobile()
      )}
    </AnimatedHeaderZone>,
  ] as const;
};
