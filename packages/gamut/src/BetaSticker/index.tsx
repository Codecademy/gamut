import { useTheme } from '@emotion/react';
import React from 'react';

import { FlexBox, Text } from '..';

type BetaStickerProps = {
  className?: string;
  children?: never;
};

export const BetaSticker: React.FC<BetaStickerProps> = (props) => {
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
      <Text fontWeight="bold" letterSpacing="1px">
        BETA
      </Text>
    </FlexBox>
  );
};
