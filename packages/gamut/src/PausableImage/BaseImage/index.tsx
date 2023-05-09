import { PauseIcon, PlayIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';
import Freezeframe from 'react-freezeframe';

import { Box } from '../../Box';
import { FillButton } from '../../Button';
import { HiddenText } from '../../HiddenText';
import { imageStyles, PauseableImageProps } from '..';

export interface BaseImageProps extends PauseableImageProps {}

export const Container = styled(Box)(
  css({
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    display: 'flex',
    position: 'relative',
    width: '100%',
    [`> img,
      > .react-freezeframe,
      > .react-freezeframe img`]: {
      maxWidth: '100%',
      height: '100%',
    },
    '.ff-container': {
      height: '100%',
    },
    '.ff-container .ff-canvas': {
      transition: 'none',
    },
    '.ff-loading-icon::before': {
      display: 'none',
    },
  })
);

export const PlayingImage = imageStyles;

const StyledFreezeframe = styled(Freezeframe)(imageStyles);

export const BaseImage: React.FC<BaseImageProps> = ({ alt, ...rest }) => {
  const [paused, setPaused] = useState(false);

  const [liveText, buttonLabel, Icon, Image] = paused
    ? [`${alt}, paused`, 'Play animated image', PlayIcon, StyledFreezeframe]
    : [`${alt}, playing`, 'Pause animated image', PauseIcon, PlayingImage];

  return (
    <Container>
      <Image alt={alt} {...rest} />
      {/* ensure proper fall back label if an empty string is given as alt */}
      <HiddenText aria-live="polite">{alt ? liveText : buttonLabel}</HiddenText>
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
