import * as React from 'react';

import { BodyPortal, Box, FlexBox, IconButton, Text } from '@codecademy/gamut';
import { GrowthIcon } from '@codecademy/gamut-icons';

export const ChatWindow: React.FC = ({}) => {
  const [open, setOpen] = React.useState(true);

  return (
    <BodyPortal>
      <Box right={6} bottom={0} position="fixed" aria-live="polite">
        <Box bg="paleBlue" border={1} borderRadius={'4px'} minWidth={'25rem'}>
          <FlexBox
            bg="navy-200"
            width="100%"
            justifyContent={'space-between'}
            alignContent={'center'}
            p={4}
          >
            <Text display="flex" alignSelf={'center'} fontFamily={'monospace'}>
              gamut chatbot
            </Text>
            <IconButton
              icon={GrowthIcon}
              onClick={() => setOpen(!open)}
            ></IconButton>
          </FlexBox>
          {open && (
            <Box p={8}>
              peekaboo
              <input />
            </Box>
          )}
        </Box>
      </Box>
    </BodyPortal>
  );
};
