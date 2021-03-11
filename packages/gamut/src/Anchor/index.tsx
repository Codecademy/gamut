import { color, space, typography, variant } from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

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

export type AnchorProps = {
  mode?: 'light' | 'dark';
  variant?: 'standard' | 'inline' | 'interface';
} & HandlerProps<typeof anchorProps>;

const anchorProps = compose(typography, color, space);

export const Anchor = styled.a<AnchorProps>(
  anchorProps,
  ({ theme, mode = 'light', variant }) => {
    const { base, hover, focus } = modes[mode];
    return css`
      ${base({ theme, variant })};
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: -${theme.spacing[4]};
        top: -${theme.spacing[4]};
        width: calc(100% + ${theme.spacing[8]});
        height: calc(100% + ${theme.spacing[8]});
        border-radius: 4px;
        border: 2px solid;
        border-color: inherit;
        opacity: 0;
      }

      &:hover,
      &:focus {
        text-decoration: none;
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
  }
);

Anchor.defaultProps = {
  variant: 'inline',
};
