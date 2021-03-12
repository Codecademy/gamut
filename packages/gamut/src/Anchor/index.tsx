import { color, space, typography, variant } from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLProps } from 'react';

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

const AnchorElement: React.FC<
  Omit<HTMLProps<HTMLAnchorElement>, keyof AnchorProps> & AnchorProps
> = (props) => {
  const { href, disabled, children, as, ...rest } = props;
  if (!href || href.length === 0) {
    return (
      <button
        {...(rest as HTMLProps<HTMLButtonElement>)}
        type="button"
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  }
  return (
    <a {...rest} href={href}>
      {children}
    </a>
  );
};

export type AnchorProps = {
  href?: string;
  as?: never;
  mode?: 'light' | 'dark';
  variant?: 'standard' | 'inline' | 'interface';
} & HandlerProps<typeof anchorProps>;

export const AnchorBase = styled.a<AnchorProps>`
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  display: inline-block;
  font-size: inherit;

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
