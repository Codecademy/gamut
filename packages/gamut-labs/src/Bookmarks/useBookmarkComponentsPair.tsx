import { ButtonBaseElements, IconButton, Popover } from '@codecademy/gamut';
import React, { useRef } from 'react';

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
    const currentView = document.body.offsetWidth < 1200 ? 'mobile' : 'desktop';
    if (view !== currentView) {
      setOpenCrossDeviceItemId(CrossDeviceItemId.UNSET);
    }
  };

  // const keyUpHandler = (evt: KeyboardEvent) => {
  //   if (evt.key === 'Escape') {
  //     setOpenCrossDeviceItemId(CrossDeviceItemId.UNSET);
  //   };
  // };

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
          // onKeyUp={keyUpHandler}
        >
          <>{bookmarkParts.desktop()}</>
        </Popover>
      ) : (
        bookmarkParts.mobile()
      )}
    </AnimatedHeaderZone>,
  ] as const;
};
