import { Box, FlexBox } from '@codecademy/gamut';
import React from 'react';

import { ProLogo } from '../../../brand';
import { Text } from '../..';

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
      <Text textColor={invertColors ? 'white' : 'navy'} as="span" fontSize={14}>
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
