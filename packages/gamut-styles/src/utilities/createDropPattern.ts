import { css } from '@emotion/core';

export type DropPattern = {
  url?: string;
  color?: string;
  xOffset?: string | number;
  yOffset?: string | number;
};

const backgroundImage = (url?: string) =>
  url &&
  css`
    background-image: url(${url});
    background-repeat: repeat;
    background-color: none;
  `;

export const createDropPattern = ({
  url,
  color,
  xOffset = 0,
  yOffset = 0,
}: DropPattern) => css`
  position: relative;
  z-index: 1;
  transition: 0.2s transform;

  &:before,
  &:after {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-color: transparent;
  }

  &:before {
    background-color: inherit;
    z-index: -1;
  }

  &:after {
    z-index: -2;
    transition: 0.2s transform;
    background-color: ${color && color};
    ${backgroundImage(url)}
    top: ${yOffset};
    left: ${xOffset};
  }
`;

export const createPhysicalPattern = ({
  url,
  color,
}: Partial<DropPattern>) => css`
  background-color: ${color && color};
  ${backgroundImage(url)}
`;
