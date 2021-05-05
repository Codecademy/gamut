import { Box, Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const HeartContainer = styled(Anchor)`
  display: inline-block;
  filter: saturate(0.7);
  margin-right: 0.25rem;
  min-width: 1.75em;
  text-align: center;
  cursor: pointer;
`;

export type MadeInProps = {
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
};

export const MadeIn: React.FC<MadeInProps> = ({ onClick }) => (
  <Box
    display={{ md: 'inline-block' }}
    textAlign={{ _: 'center', md: 'right' }}
  >
    <Anchor variant="interface" onClick={onClick}>
      Made
    </Anchor>{' '}
    with
    <HeartContainer variant="interface" onClick={onClick}>
      ️❤️
    </HeartContainer>
    in{' '}
    <Anchor variant="interface" onClick={onClick}>
      NYC
    </Anchor>{' '}
    ©{` ${new Date().getFullYear()} `}{' '}
    <Anchor variant="interface" onClick={onClick}>
      Codecademy
    </Anchor>
  </Box>
);
