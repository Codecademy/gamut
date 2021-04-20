import { Box, FlexBox, Text } from '@codecademy/gamut';
import React from 'react';

import { ProLogo } from '../../../brand';

export type HeaderProps = {
  invertColors?: boolean;
  showProLogo?: boolean;
  text: string;
};

export const Header: React.FC<HeaderProps> = ({
  invertColors,
  showProLogo,
  text,
}) => {
  return (
    <FlexBox marginBottom={12} alignItems="center">
      <Text as="span" fontSize={14} fontFamily="accent">
        {showProLogo && (
          <Box display="inline-flex" verticalAlign="middle">
            <ProLogo
              backgroundColor={invertColors ? 'white' : 'navy'}
              cutoutColor={invertColors ? 'navy' : 'white'}
              data-testid="pro-logo"
              variant="cutout"
            />
          </Box>
        )}{' '}
        {text}
      </Text>
    </FlexBox>
  );
};
