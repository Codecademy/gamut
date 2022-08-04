import { ButtonBaseElements, IconButton, Popover } from '@codecademy/gamut';
import React, { useRef } from 'react';

import { AnimatedHeaderZone } from '../AppHeader/shared';
import { CrossDeviceStateProps } from '../GlobalHeader/types';
import { CrossDeviceBookmarkParts } from './types';

type BookmarkComponentsPairProps = CrossDeviceStateProps & {
  bookmarkParts?: CrossDeviceBookmarkParts;
  view: 'desktop' | 'mobile';
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

  const id = 'bookmarks';

  const toggleVisible = () => {
    setOpenCrossDeviceItemId((oldVal) => (oldVal === id ? '' : id));
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
        >
          <>{bookmarkParts.desktop()}</>
        </Popover>
      ) : (
        bookmarkParts.mobile()
      )}
    </AnimatedHeaderZone>,
  ] as const;
};
