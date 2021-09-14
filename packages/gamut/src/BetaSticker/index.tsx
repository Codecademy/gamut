import { useTheme } from '@emotion/react';
import React from 'react';

import { FlexBox, Text } from '..';

type BetaStickerProps = {
  children?: never;
};

export const BetaSticker: React.FC<BetaStickerProps> = () => {
  const {
    colors: { text },
  } = useTheme();
  return (
    <FlexBox
      inline
      center
      bg="transparent"
      boxShadow={`-2px 2px 0 ${text}`}
      height={26}
      width={52}
    >
      <Text fontWeight="bold" letterSpacing="1px" color="text">
        BETA
      </Text>
    </FlexBox>
  );
};
