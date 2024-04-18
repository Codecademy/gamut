import { ColorMode } from '@codecademy/gamut-styles';
import { MockGamutProvider } from '@codecademy/gamut-tests';
import React, { ComponentProps } from 'react';

import { Box } from '../../Box';
import { IconButton } from '..';

export const IconButtonFloatingMock: React.FC<
  ComponentProps<typeof IconButton>
> = (props) => {
  return (
    <MockGamutProvider>
      <ColorMode mode="light">
        <Box width="500px">
          <IconButton tipProps={{ placement: 'floating' }} {...props} />
        </Box>
      </ColorMode>
    </MockGamutProvider>
  );
};
