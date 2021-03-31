import { Box } from '@codecademy/gamut';
import React from 'react';

export type TagColor = 'blue' | 'green' | 'pink';
export type BottomTagProps = {
  text: string;
  color: TagColor;
};

const colorMap = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: `palePink`,
} as const;

export const BottomTag: React.FC<BottomTagProps> = ({ text, color }) => {
  return (
    <Box
      fontWeight="title"
      display="inline-block"
      paddingY={4}
      padding={12}
      position="absolute"
      bottom={0}
      right={0}
      textColor="navy"
      fontSize={14}
      lineHeight="title"
      backgroundColor={colorMap[color]}
    >
      {text}
    </Box>
  );
};
