import { ProLabel, Text } from '@codecademy/gamut';
import React from 'react';

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
    <Text display="flex" fontSize={14} mb={12} fontFamily="accent">
      {showProLogo && (
        <ProLabel
          alignSelf="center"
          mr={8}
          mode={invertColors ? 'dark' : 'light'}
          data-testid="pro-logo"
        />
      )}
      {text}
    </Text>
  );
};
