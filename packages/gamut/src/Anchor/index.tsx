import {
  color,
  shouldForwardProp,
  space,
  typography,
  variant,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

const createModeVariants = ({
  text,
  primary,
}: Record<'text' | 'primary', keyof Theme['colors']>) => {
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

  return { base, hover, focus };
};

const modes = {
  dark: createModeVariants({ text: 'white', primary: 'yellow' }),
  light: createModeVariants({ text: 'navy', primary: 'hyper' }),
} as const;

const anchorProps = compose(typography, color, space);

const BareButton = styled.button`
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  font-size: inherit;
`;

type ForwardAbleProps = Omit<HTMLProps<HTMLAnchorElement>, keyof AnchorProps> &
  AnchorProps;
type Elements = HTMLAnchorElement | HTMLButtonElement;

const AnchorElement = forwardRef<Elements, ForwardAbleProps>((props, ref) => {
  const {
    href,
    disabled,
    children,
    as,
    rel = 'noopener noreferrer',
    ...rest
  } = props;
  if (!href || href.length === 0) {
    return (
      <BareButton
        {...(rest as Omit<HTMLProps<HTMLButtonElement>, keyof AnchorProps>)}
        ref={ref as MutableRefObject<HTMLButtonElement>}
        type="button"
        aria-disabled={disabled}
      >
        {children}
      </BareButton>
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
});

export type AnchorProps = {
  href?: string;
  as?: never;
  mode?: 'light' | 'dark';
  variant?: 'standard' | 'inline' | 'interface';
} & HandlerProps<typeof anchorProps>;

export const AnchorBase = styled('a', {
  shouldForwardProp,
})<AnchorProps>`
  display: inline-block;
  white-space: nowrap;
  min-width: 0;

  ${anchorProps}
  ${({ theme, mode = 'light', variant }) => {
    const { base, hover, focus } = modes[mode];
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
        color: ${theme.colors['gray-700']};
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
