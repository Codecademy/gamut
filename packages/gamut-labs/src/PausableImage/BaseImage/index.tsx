import { FillButton } from '@codecademy/gamut';
import { PauseIcon, PlayIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Freezeframe from 'react-freezeframe';

import { Container, imageStyles, PlayingImage } from './styles';

export interface BaseImageProps {
  alt?: string;
  src: string;
}

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
