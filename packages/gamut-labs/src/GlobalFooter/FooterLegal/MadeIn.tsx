import { Anchor, Box } from '@codecademy/gamut';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

const heartStyles = css`
  display: inline-block;
  filter: saturate(0.7);
  margin-right: 0.25rem;
  min-width: 1.75em;
  text-align: center;
`;

const HeartAnchorContainer = styled(Anchor)`
  ${heartStyles}
  cursor: pointer;
`;

const HeartContainer = styled.span`
  ${heartStyles}
`;

export type MadeInProps = {
  onClick?: (text: string) => void;
};

export const MadeIn: React.FC<MadeInProps> = ({ onClick }) => {
  const onMadeClick = () => onClick?.('Made');
  const onHeartClick = () => onClick?.('❤');
  const onNYCClick = () => onClick?.('NYC');
  const onCodecademyClick = () => onClick?.('Codecademy');

  const year = new Date().getFullYear();

  return (
    <Box
      display={{ md: 'inline-block' }}
      textAlign={{ _: 'center', md: 'right' }}
    >
      {onClick ? (
        <>
          <Anchor variant="interface" onClick={onMadeClick}>
            Made
          </Anchor>{' '}
          with
          <HeartAnchorContainer variant="interface" onClick={onHeartClick}>
            ️❤️
          </HeartAnchorContainer>
          in{' '}
          <Anchor variant="interface" onClick={onNYCClick}>
            NYC
          </Anchor>{' '}
          ©{` ${year} `}
          <Anchor variant="interface" onClick={onCodecademyClick}>
            Codecademy
          </Anchor>
        </>
      ) : (
        <>
          Made with <HeartContainer aria-label="love">❤️</HeartContainer>in NYC
          © {year} Codecademy
        </>
      )}
    </Box>
  );
};
