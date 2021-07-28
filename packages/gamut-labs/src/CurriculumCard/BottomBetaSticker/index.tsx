import { BetaSticker, Box } from '@codecademy/gamut';
import React from 'react';

export const BottomBetaSticker: React.FC = () => {
  return (
    <Box position="absolute" bottom={0} right={0} pb={12} pr={12}>
      <BetaSticker />
    </Box>
  );
};
