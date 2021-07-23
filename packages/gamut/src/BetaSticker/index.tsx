import { theme } from '@codecademy/gamut-styles';
import React from 'react';

import { Box, Text } from '..';

type BetaStickerProps = {
  className?: string;
  children?: never;
};

export const BetaSticker: React.FC<BetaStickerProps> = (props) => {
  return (
    <Box
      background="transparent"
      boxShadow={`-2px 2px 0 ${theme.colors.navy}`}
      display="inline-block"
      height={26}
      px={6 as any}
      py={2 as any}
    >
      <Text fontWeight="bold" letterSpacing="1px">
        BETA
      </Text>
    </Box>
  );
};
