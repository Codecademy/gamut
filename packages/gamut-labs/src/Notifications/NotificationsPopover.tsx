import { FlexBox } from '@codecademy/gamut';
import React from 'react';

import { Popover } from '../Popover';
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
      <FlexBox bg="white" width={360} textAlign="left">
        <NotificationsContents {...props} />
      </FlexBox>
    </Popover>
  );
};
