import * as React from 'react';

import {
  BodyPortal,
  Box,
  FlexBox,
  FloatingCard,
  IconButton,
  Text,
  TextButton,
} from '@codecademy/gamut';
import { AnimatePresence } from 'framer-motion';

import { ColorMode } from '@codecademy/gamut-styles';
import {
  ChatIcon,
  MiniChevronLeftIcon,
  MiniDeleteIcon,
} from '@codecademy/gamut-icons';
import { Chat } from './components/Chat';
import { DotDense } from '@codecademy/gamut-patterns';
import { FadeInSlideOut } from '@codecademy/gamut/src/Motion/FadeInSlideOut';

export const ChatWindow: React.FC = ({}) => {
  const [chatOpen, setchatOpen] = React.useState(false);
  const [optionOpen, setOptionOpen] = React.useState(false);

  return (
    <BodyPortal>
      <Box right={6} bottom={0} position="fixed" aria-live="polite">
        <ColorMode mode="dark">
          <AnimatePresence>
            {chatOpen && (
              <FadeInSlideOut>
                <FloatingCard pattern={DotDense} p={0} width="344px">
                  <FlexBox justifyContent="space-between" pt={16} pb={8}>
                    <Box>
                      <IconButton
                        icon={MiniChevronLeftIcon}
                        height={28}
                        width={28}
                        mx={8}
                        onClick={() => {
                          setchatOpen(!chatOpen);
                          setOptionOpen(!optionOpen);
                        }}
                      />
                      <Text variant="title-xs" alignSelf="center">
                        Help me with Gamut
                      </Text>
                    </Box>
                    <IconButton
                      icon={MiniDeleteIcon}
                      height={28}
                      width={28}
                      mx={8}
                      onClick={() => setchatOpen(!chatOpen)}
                    />
                  </FlexBox>
                  <Chat />
                </FloatingCard>
              </FadeInSlideOut>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {optionOpen && (
              <FadeInSlideOut>
                <FlexBox bg="background" flexDirection="column">
                  <Text color="text-secondary" px={16} py={8}>
                    I need help with:
                  </Text>
                  <TextButton disabled variant="secondary">
                    This specific component
                  </TextButton>
                  <TextButton
                    variant="secondary"
                    onClick={() => {
                      setOptionOpen(!optionOpen);
                      setchatOpen(!chatOpen);
                    }}
                  >
                    Gamut in general
                  </TextButton>
                </FlexBox>
              </FadeInSlideOut>
            )}
          </AnimatePresence>
          <FlexBox justifyContent="flex-end">
            <Box bg="background" borderRadius={'100px'}>
              <IconButton
                icon={ChatIcon}
                onClick={() => {
                  if (chatOpen) {
                    setchatOpen(!chatOpen);
                  } else {
                    setOptionOpen(!optionOpen);
                  }
                }}
              />
            </Box>
          </FlexBox>
        </ColorMode>
      </Box>
    </BodyPortal>
  );
};
