import { FlexBox, Popover } from '@codecademy/gamut';
import React from 'react';

import { NotificationsContents } from './NotificationsContents';
import { NotificationsRendererProps } from './types';

export const NotificationsPopover: React.FC<NotificationsRendererProps> = ({
  bellRef,
  onClose,
  ...props
}) => {
  return (
    <Popover
      align="right"
      verticalOffset={1}
      outline
      isOpen
      onRequestClose={onClose}
      targetRef={bellRef}
    >
      <FlexBox bg="white" textAlign="left" width={360}>
        <NotificationsContents {...props} />
      </FlexBox>
    </Popover>
  );
};
