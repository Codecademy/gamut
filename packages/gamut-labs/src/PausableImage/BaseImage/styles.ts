import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const imageStyles = css`
  height: auto;
  width: inherit;
  max-height: 100%;
  max-width: 100%;
`;

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

export const PlayingImage = styled.img(imageStyles);
