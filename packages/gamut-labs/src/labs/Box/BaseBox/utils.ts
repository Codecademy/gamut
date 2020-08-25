import { css } from '@emotion/core';
import { colors } from '@codecademy/gamut-styles';

export const boxBorder = css`
  border: 1px solid ${colors.standard.navy};
  border-radius: 2px;

  &:after,
  &:before {
    border: 1px solid ${colors.standard.navy};
    border-radius: 2px;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
  }
`;

export const createThemeVariant = (
  background: string,
  content: string,
  shadow: string
) => css`
  background-color: ${background};
  color: ${content};

  &:after {
    background-color: ${shadow};
  }
`;

export const neg = (value: string) => `-${value}`;

export const createShadowVariant = (body: string[], shadow: string[]) => {
  return css`
    &:hover {
      transform: translate(${body.join(', ')});

      &:after {
        transform: translate(${shadow.join(', ')});
      }
    }
  `;
};

export const shadowEffect = css`
  position: relative;
  z-index: 1;
  transition: 0.2s transform;

  &:before,
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &:before {
    background-color: inherit;
    z-index: -1;
  }

  &:after {
    z-index: -2;
    transition: 0.2s transform;
  }
`;
