import { FlexBox, FlexBoxProps, Text } from '@codecademy/gamut';
import { MiniStarIcon } from '@codecademy/gamut-icons';
import React from 'react';

export const RecommendedBadge: React.FC<FlexBoxProps> = (props) => (
  <FlexBox
    position="absolute"
    top={-28}
    bg="navy"
    color="white"
    p={8}
    borderRadius="2px 2px 0 0"
    center
    {...props}
  >
    <MiniStarIcon mr={8} size={12} />
    <Text fontFamily="accent" lineHeight={0} fontSize={14}>
      Recommended
    </Text>
  </FlexBox>
);
