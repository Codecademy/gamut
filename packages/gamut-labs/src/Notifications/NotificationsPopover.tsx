import { FlexBox, Popover } from '@codecademy/gamut';
import * as React from 'react';

import { CrossDeviceItemId } from '../GlobalHeader/types';
import { NotificationsContents } from './NotificationsContents';
import { NotificationsRendererProps } from './types';

export const NotificationsPopover: React.FC<NotificationsRendererProps> = ({
  bellRef,
  setOpenCrossDeviceItemId,
  ...props
}) => {
  const onRequestCloseHandler = () => {
    // When on the mobile view, we don't want the desktop handler to fire.
    if (window.innerWidth >= 1200) {
      setOpenCrossDeviceItemId?.(CrossDeviceItemId.UNSET);
    }
  };
  return (
    <Popover
      align="right"
      verticalOffset={1}
      outline
      isOpen
      targetRef={bellRef}
      onRequestClose={onRequestCloseHandler}
    >
      <FlexBox bg="white" textAlign="left" width={360}>
        <NotificationsContents {...props} />
      </FlexBox>
    </Popover>
  );
};
