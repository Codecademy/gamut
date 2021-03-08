import {
  color,
  space,
  timing,
  typography,
  variant,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const anchorVariants = variant({
  standard: {
    textColor: 'hyper',
  },
  inline: {
    textDecoration: 'underline',
    textColor: 'hyper',
  },
  interface: {
    textColor: 'navy',
  },
});

const hoverVariants = variant({
  standard: {
    textDecoration: 'underline',
  },
  inline: {
    textDecoration: 'none',
  },
  interface: {
    textColor: 'hyper',
  },
});

const focusVariants = variant({
  standard: {
    textColor: 'navy',
  },
  inline: {
    textDecoration: 'underline',
  },
  interface: {},
});

export type AnchorProps = HandlerProps<typeof anchorVariants> &
  HandlerProps<typeof anchorProps>;

const anchorProps = compose(typography, color, space);

export const Anchor = styled.a<AnchorProps>(
  anchorProps,
  anchorVariants,
  ({ theme, variant }) => {
    return css`
      position: relative;
      &:after {
        content: '';
        transition: opacity ${timing.fast} ease-in-out;
        position: absolute;
        left: -0.2em;
        top: -0.35em;
        width: calc(100% + 0.4em);
        height: calc(100% + 0.7em);
        border-radius: 2px;
        border: 2px solid ${theme.colors.hyper};
        opacity: 0;
      }

      &:hover,
      &:focus {
        ${hoverVariants({ theme, variant })}
      }
      &:disabled,
      &[disabled] {
        cursor: not-allowed;
        text-decoration: none;
        color: ${theme.colors['gray-700']};
      }
      &:focus,
      &:focus-visible {
        outline: none;
      }

      &:focus-visible {
        ${focusVariants({ theme, variant })}

        &:after {
          opacity: 1;
        }
      }
    `;
  }
);

Anchor.defaultProps = {
  variant: 'inline',
};
