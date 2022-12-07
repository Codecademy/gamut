import { Box, Text } from '@codecademy/gamut';
import * as React from 'react';

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
    <Box position="absolute" bottom={0} right={0} bg={colorMap[color]}>
      <Text py={4} p={12} variant="title-xs" fontSize={14}>
        {text}
      </Text>
    </Box>
  );
};
