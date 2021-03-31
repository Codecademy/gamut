import {
  color,
  layout,
  shouldForwardProp,
  space,
  typography,
  variant,
} from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import { SystemProps } from '@codecademy/variance/dist/types/config';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

export type LinkElements = HTMLAnchorElement | HTMLButtonElement;
export interface AnchorProps extends SystemProps<typeof anchorProps> {
  href?: string;
  as?: never;
  mode?: 'light' | 'dark';
  variant?: 'standard' | 'inline' | 'interface';
}
export interface ForwardedProps
  extends Omit<HTMLProps<LinkElements>, keyof AnchorProps>,
    AnchorProps {}

const createModeVariants = ({
  text,
  primary,
}: Record<'text' | 'primary', keyof Theme['colors']>) => {
  return variant({
    prop: 'variant',
    variants: {
      standard: {
        whiteSpace: 'nowrap',
        color: primary,
        borderColor: primary,
        '&:hover': {
          textDecoration: 'underline',
        },
        '&:focus-visible': {
          color: text,
          textDecoration: 'none',
        },
      },
      inline: {
        whiteSpace: 'nowrap',
        textDecoration: 'underline',
        color: primary,
        borderColor: primary,
        '&:focus-visible': {
          textDecoration: 'underline',
        },
      },
      interface: {
        color: text,
        borderColor: primary,
        '&:hover': {
          color: primary,
        },
        '&:focus-visible': {
          color: text,
        },
      },
    },
  });
};

const modes = {
  dark: createModeVariants({
    text: 'white',
    primary: 'yellow',
  }),
  light: createModeVariants({
    text: 'navy',
    primary: 'hyper',
  }),
} as const;

const anchorProps = variance.compose(layout, typography, color, space);

const ButtonReset = styled.button`
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  font-size: inherit;
`;

const AnchorElement = forwardRef<LinkElements, ForwardedProps>(
  ({ href, disabled, children, as, ...rest }, ref) => {
    const propsToForward = Object.keys(rest).filter(shouldForwardProp);

    if (!href || href.length === 0) {
      return (
        <ButtonReset
          {...propsToForward}
          ref={ref as MutableRefObject<HTMLButtonElement>}
          type="button"
          aria-disabled={disabled}
        >
          {children}
        </ButtonReset>
      );
    }

    return (
      <a
        {...propsToForward}
        href={href}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }
);

export const AnchorBase = styled('a', { shouldForwardProp })<AnchorProps>`
  display: inline-block;
  ${anchorProps}
  ${({ theme, mode = 'light', variant }) => {
    const modeVariant = modes[mode];

    return css`
      ${modeVariant({ theme, variant })};
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: -${theme.spacing[4]};
        width: calc(100% + ${theme.spacing[8]});
        height: 100%;
        border-radius: 4px;
        border: 2px solid;
        border-color: inherit;
        opacity: 0;
      }

      &:hover,
      &:focus {
        text-decoration: none;
        cursor: pointer;
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
        &:after {
          opacity: 1;
        }
      }
    `;
  }}
`;

export const Anchor = AnchorBase.withComponent(AnchorElement);

Anchor.defaultProps = {
  variant: 'inline',
};
