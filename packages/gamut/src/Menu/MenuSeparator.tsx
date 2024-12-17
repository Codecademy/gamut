import * as React from 'react';

import { Box, FlexBox } from '../Box';
import { FlexBoxProps } from '../Box/props';

interface MenuSeperatorProps extends FlexBoxProps {
  children?: never;
}

export const MenuSeparator: React.FC<MenuSeperatorProps> = (props) => {
  return (
    <FlexBox as="li" role="separator" height={8} fit center {...props}>
      <Box fit height="1px" bg="text-disabled" borderRadius="sm" mx={16} />
    </FlexBox>
  );
};
