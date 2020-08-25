import { css } from '@emotion/core';
import { spacing, colors } from '@codecademy/gamut-styles';

const {
  white,
  standard: { navy, yellow },
} = colors;

export const boxBorder = css`
  border: 1px solid ${navy};
  border-radius: 2px;

  &:before {
    border: 1px solid ${navy};
  }
`;

const createVariant = (
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

export const BOX_VARIANTS = {
  yellow: createVariant(yellow, navy, navy),
  navy: createVariant(navy, white, white),
  white: createVariant(white, navy, navy),
};

export const createHoverOffset = (body: string[], shadow: string[]) => {
  return css`
    &:hover {
      transform: translate(${body.join(', ')});

      &:after {
        transform: translate(${shadow.join(', ')});
      }
    }
  `;
};

const neg = (value: string) => `-${value}`;

export const HOVER_EFFECTS = {
  left: createHoverOffset(
    [spacing[4], neg(spacing[4])],
    [neg(spacing[8]), spacing[8]]
  ),
  right: createHoverOffset(
    [neg(spacing[4]), neg(spacing[4])],
    [spacing[8], spacing[8]]
  ),
};

export const shadowEffect = css`
  border: 1px;
  border-color: transparent;
  border-radius: 2px;
  position: relative;
  z-index: 1;
  transition: 0.2s transform;

  &:before,
  &:after {
    content: '';
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
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
