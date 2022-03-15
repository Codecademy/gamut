import { FillButton } from '@codecademy/gamut';
import { PauseIcon, PlayIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Freezeframe from 'react-freezeframe';

import { imageStyles } from '..';

export interface BaseImageProps {
  alt?: string;
  src: string;
}

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  display: flex;
  position: relative;
  width: 100%;

  > img,
  > .react-freezeframe,
  > .react-freezeframe img {
    max-width: 100%;
  }
  .ff-container .ff-canvas {
    transition: none;
  }
  .ff-loading-icon::before {
    display: none;
  }
`;

export const PlayingImage = imageStyles;

const StyledFreezeframe = styled(Freezeframe)(imageStyles);

export const BaseImage: React.FC<BaseImageProps> = (props) => {
  const [paused, setPaused] = useState(false);
  const [buttonLabel, Icon, Image] = paused
    ? ['Play animated image', PlayIcon, StyledFreezeframe]
    : ['Pause animated image', PauseIcon, PlayingImage];

  return (
    <Container>
      <Image {...props} />
      <FillButton
        bottom={0}
        m={8}
        onClick={() => setPaused(!paused)}
        position="absolute"
        right={0}
        variant="secondary"
        zIndex={1}
        aria-label={buttonLabel}
      >
        <Icon color="currentColor" />
      </FillButton>
    </Container>
  );
};

export default BaseImage;
