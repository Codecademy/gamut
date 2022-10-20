import { FlexBox, Text } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import * as React from 'react';

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
