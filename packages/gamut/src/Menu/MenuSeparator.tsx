import * as React from 'react';

import { Box, FlexBox } from '../Box';
import { FlexBoxProps } from '../Box/props';
import { useMenuContext } from './MenuContext';

interface MenuSeperatorProps extends FlexBoxProps {
  children?: never;
}

export const MenuSeparator: React.FC<MenuSeperatorProps> = (props) => {
  const { variant } = useMenuContext();
  if (variant !== 'action') return null;

  return (
    <FlexBox as="li" role="separator" height={8} fit center {...props}>
      <Box fit height="1px" bg="text-disabled" borderRadius="small" mx={16} />
    </FlexBox>
  );
};
