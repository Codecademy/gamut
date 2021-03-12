import {
  color,
  shouldForwardProp,
  space,
  theme,
  typography,
  variant,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

export type LinkElements = HTMLAnchorElement | HTMLButtonElement;
export interface AnchorProps extends HandlerProps<typeof anchorProps> {
  href?: string;
  as?: never;
  mode?: 'light' | 'dark';
  variant?: 'standard' | 'inline' | 'interface';
}
interface ForwardedProps
  extends Omit<HTMLProps<LinkElements>, keyof AnchorProps>,
    AnchorProps {}

const createModeVariants = ({
  text,
  primary,
  dull,
}: Record<'text' | 'primary' | 'dull', keyof Theme['colors']>) => {
  const base = variant({
    standard: {
      textColor: primary,
      borderColor: primary,
    },
    inline: {
      textDecoration: 'underline',
      textColor: primary,
      borderColor: primary,
    },
    interface: {
      textColor: text,
      borderColor: primary,
    },
  });

  const hover = variant({
    standard: {
      textDecoration: 'underline',
    },
    inline: {},
    interface: {
      textColor: primary,
    },
  });

  const focus = variant({
    standard: {
      textColor: text,
      textDecoration: 'none',
    },
    inline: {
      textDecoration: 'underline',
    },
    interface: {},
  });

  const disabled = ({ theme }: { theme?: Theme }) => ({
    color: theme?.colors?.[dull],
  });
  return { base, hover, focus, disabled };
};

const modes = {
  dark: createModeVariants({
    text: 'white',
    primary: 'yellow',
    dull: 'gray-200',
  }),
  light: createModeVariants({
    text: 'navy',
    primary: 'hyper',
    dull: 'gray-700',
  }),
} as const;

const anchorProps = compose(typography, color, space);

const ButtonReset = styled.button`
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  font-size: inherit;
`;

const AnchorElement = forwardRef<LinkElements, ForwardedProps>(
  (
    { href, disabled, children, as, rel = 'noopener noreferrer', ...rest },
    ref
  ) => {
    if (!href || href.length === 0) {
      return (
        <ButtonReset
          {...rest}
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
        {...rest}
        href={href}
        rel={rel}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }
);

export const AnchorBase = styled('a', {
  shouldForwardProp,
})<AnchorProps>`
  display: inline-block;
  white-space: nowrap;

  > * {
    vertical-align: middle;
  }

  ${anchorProps}
  ${({ theme, mode = 'light', variant }) => {
    const { base, hover, disabled, focus } = modes[mode];

    return css`
      ${base({ theme, variant })};
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
        ${hover({ theme, variant })}
      }
      &:disabled,
      &[disabled] {
        cursor: not-allowed;
        text-decoration: none;
        ${disabled({ theme })}
      }
      &:focus,
      &:focus-visible {
        outline: none;
      }

      &:focus-visible {
        ${focus({ theme, variant })}

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
