import React from 'react';

import { Box, FlexBox, FlexBoxProps } from '../Box';
import { useMenuContext } from './MenuContext';

interface MenuSeperatorProps extends FlexBoxProps {
  children?: never;
}

export const MenuSeparator: React.FC<MenuSeperatorProps> = (props) => {
  const { variant } = useMenuContext();
  if (variant !== 'action') return null;

  return (
    <FlexBox as="li" role="separator" height={8} fit center {...props}>
      <Box fit height="1px" bg="text-disabled" borderRadius="2px" mx={16} />
    </FlexBox>
  );
};
