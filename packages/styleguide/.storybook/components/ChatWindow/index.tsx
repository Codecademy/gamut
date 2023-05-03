import * as React from 'react';

import {
  BodyPortal,
  Box,
  FlexBox,
  FloatingCard,
  IconButton,
  Text,
} from '@codecademy/gamut';
import { ColorMode, css } from '@codecademy/gamut-styles';
import { GearIcon, GrowthIcon } from '@codecademy/gamut-icons';
import { Chat } from './components/Chat';
import styled from '@emotion/styled';
import { DotDense } from '@codecademy/gamut-patterns';

export const ChatWindow: React.FC = ({}) => {
  const [open, setOpen] = React.useState(true);

  return (
    <BodyPortal>
      <Box right={6} bottom={0} position="fixed" aria-live="polite">
        <ColorMode mode="dark">
          {open && (
            <FloatingCard pattern={DotDense}>
              <FlexBox
                bg="white-100"
                width="100%"
                justifyContent={'space-between'}
                alignContent={'center'}
                p={4}
              >
                <Text
                  display="flex"
                  alignSelf={'center'}
                  fontFamily={'monospace'}
                >
                  gamut chatbot
                </Text>
                <IconButton icon={GrowthIcon} onClick={() => setOpen(!open)} />
              </FlexBox>
              <Chat />
            </FloatingCard>
          )}
          <Box bg="navy-800" borderRadius={'100px'}>
            <IconButton icon={GearIcon} />
          </Box>
        </ColorMode>
      </Box>
    </BodyPortal>
  );
};
