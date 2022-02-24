import { pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const imageStyles = css`
  max-width: 100%;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-height: ${pxRem(608)};
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

export const PlayingImage = styled.img(imageStyles);
