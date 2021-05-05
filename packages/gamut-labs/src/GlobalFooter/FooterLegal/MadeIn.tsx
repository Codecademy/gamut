import { Anchor, Box } from '@codecademy/gamut';
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
  onClick?: (text: string) => void;
};

export const MadeIn: React.FC<MadeInProps> = ({ onClick }) => {
  const onMadeClick = () => onClick?.('Made');
  const onHeartClick = () => onClick?.('❤');
  const onNYCClick = () => onClick?.('NYC');
  const onCodecademyClick = () => onClick?.('Codecademy');

  return (
    <Box
      display={{ md: 'inline-block' }}
      textAlign={{ _: 'center', md: 'right' }}
    >
      <Anchor variant="interface" onClick={onMadeClick}>
        Made
      </Anchor>{' '}
      with
      <HeartContainer variant="interface" onClick={onHeartClick}>
        ️❤️
      </HeartContainer>
      in{' '}
      <Anchor variant="interface" onClick={onNYCClick}>
        NYC
      </Anchor>{' '}
      ©{` ${new Date().getFullYear()} `}
      <Anchor variant="interface" onClick={onCodecademyClick}>
        Codecademy
      </Anchor>
    </Box>
  );
};
