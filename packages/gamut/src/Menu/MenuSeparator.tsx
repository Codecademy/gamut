import * as React from 'react';

import { Box, FlexBox } from '../Box';
import { FlexBoxProps } from '../Box/props';

interface MenuSeperatorProps extends FlexBoxProps {
  children?: never;
}

export const MenuSeparator: React.FC<MenuSeperatorProps> = (props) => {
  return (
    <FlexBox as="li" center fit height={8} role="separator" {...props}>
      <Box bg="text-disabled" borderRadius="sm" fit height="1px" mx={16} />
    </FlexBox>
  );
};
