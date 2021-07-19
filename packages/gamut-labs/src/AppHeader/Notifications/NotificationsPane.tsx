import { Box, ButtonBaseElements, FlexBox } from '@codecademy/gamut';
import React from 'react';

import { Popover } from '../../Popover';
import { NotificationsPaneContents } from './NotificationsPaneContents';
import { NotificationsPaneContentsProps } from './types';

export type NotificationsPaneProps = NotificationsPaneContentsProps & {
  bellRef: React.RefObject<ButtonBaseElements>;
  onClose: () => void;
};

export const NotificationsPane: React.FC<NotificationsPaneProps> = ({
  bellRef,
  onClose,
  ...props
}) => {
  const contents = <NotificationsPaneContents {...props} />;

  return (
    <>
      <Box display={{ _: 'block', md: 'none' }}>{contents}</Box>
      <Box display={{ _: 'none', md: 'block' }}>
        <Popover
          align="right"
          verticalOffset={1}
          outline
          isOpen
          onRequestClose={onClose}
          targetRef={bellRef}
        >
          <FlexBox bg="white" width={360} textAlign="left">
            {contents}
          </FlexBox>
        </Popover>
      </Box>
    </>
  );
};
