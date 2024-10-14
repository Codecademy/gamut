import styled from '@emotion/styled';

export const VideoWrapper = styled.div`
  /* video::-webkit-media-controls-play-button {
    background: blue;
  }

  video::-webkit-media-controls-play-button {
    background: blue;
  } */
  /*
  video:focus-within::-webkit-media-controls-play-button {
    outline: yellow auto 1px !important;
  }

  video:focus::-webkit-media-controls-play-button {
    outline: red auto 1px !important;
  } */

  video input[type='button'] {
    background-color: red !important;
  }

  video::-webkit-media-controls-play-button {
    outline-color: #ffd300;
  }

  video::-webkit-media-controls-volume-slider {
    outline-color: #ffd300;
  }

  video::-webkit-media-controls-mute-button {
    outline-color: #ffd300;
  }

  video::-webkit-media-controls-fullscreen-button {
    background: red;
    outline-color: #ffd300;
  }

  video::-webkit-media-controls-overflow-button {
    background-color: #ffd300;
  }

  video::-webkit-media-controls-timeline {
    outline-color: #ffd300;
  }

  video::psuedo(-internal-media-controls-download-button) {
    display: none;
  }

  input {
    background: red;
    /* works */
  }
  video::-webkit-media-controls-panel {
    // hover + focus - 3: 1 contrast
    outline-color: #ffd300;
    background-image: linear-gradient(transparent 15%, #0a0d1c 55%);
  }

  /* video::-webkit-media-controls-timeline {
    background-color: blue !important;
  } */

  video::-webkit-media-controls-timeline:focus-visible {
    background-color: blue !important;
  }

  .videoWrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
    border-radius: 4px;
    overflow: hidden;
    &.loading {
      background-color: $color-blue-1100;
    }
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    color: $color-white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .iframe {
    width: 100% !important;
    height: 100% !important;
    border: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    & :focus-visible {
      outline-offset: 3px;
    }
  }

  .hoverButton {
    width: 15%;
    height: 26.7%;
    min-width: px-rem(75px);
    min-height: px-rem(75px);
    color: $color-white;
  }
`;
