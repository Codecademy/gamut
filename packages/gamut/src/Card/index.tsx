import { variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Box } from '../Box';

const TRANSITION_COEFFICIENT = 50;

const SHADOWS = {
  foreground: [1, -1],
  background: [-2, 2],
};

const cardVariants = variant({
  yellow: {
    backgroundColor: 'yellow',
    textColor: 'navy',
    borderColor: 'navy',
  },
  navy: {
    backgroundColor: 'navy',
    textColor: 'white',
    borderColor: 'navy',
  },
  white: {
    backgroundColor: 'white',
    textColor: 'navy',
    borderColor: 'navy',
  },
  hyper: {
    backgroundColor: 'hyper',
    textColor: 'white',
    borderColor: 'navy',
  },
});

export type CardProps = HandlerProps<typeof cardVariants> & {
  shadowOffset?: 2 | 4;
};

export const Card = styled(Box)<CardProps>(
  cardVariants,
  ({ theme, variant }) => {
    const outline = variant === 'navy';

    return css`
      position: relative;
      backface-visibility: hidden;

      &:after,
      &:before {
        content: '';
        position: absolute;
        background-color: inherit;
        border-width: inherit;
        border-color: inherit;
        border-radius: inherit;
        border-style: inherit;
        top: -1px;
        left: -1px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        backface-visibility: hidden;
        transition: inherit;
      }

      &:after {
        z-index: -2;
        background-color: ${theme.colors.navy};
      }

      &:before {
        box-shadow: ${outline ? '-1px 1px 0 currentColor' : 'none'};
        z-index: -1;
      }
    `;
  },
  ({ shadowOffset: offset = 0 }) => {
    const timing = TRANSITION_COEFFICIENT * offset;

    if (offset) {
      const [fgX, fgY] = SHADOWS.foreground.map((x) => x * offset);
      const [bgX, bgY] = SHADOWS.background.map((x) => x * offset);
      return css`
        transition: ${timing}ms transform ease;

        &:hover {
          transform: translate(${fgX}px, ${fgY}px);

          &:after {
            transform: translate(${bgX}px, ${bgY}px);
          }
        }
      `;
    }
  }
);

Card.defaultProps = {
  padding: 16,
  variant: 'white',
  borderRadius: '2px',
  borderWidth: '1px',
  borderStyle: 'solid',
};
