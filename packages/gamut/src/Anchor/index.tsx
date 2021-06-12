import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase, ButtonBaseProps } from '../ButtonBase/ButtonBase';

export interface AnchorProps
  extends StyleProps<typeof anchorProps>,
    StyleProps<typeof anchorVariants> {}

const anchorVariants = variant({
  base: {
    bg: 'transparent',
    boxShadow: 'none',
    border: 'none',
    p: 0,
    fontSize: 'inherit',
    position: 'relative',
    textColor: 'primary',
    whiteSpace: 'nowrap',
    '&:before': {
      position: 'absolute',
      inset: -4,
      borderRadius: '4px',
      border: 2,
      borderColor: 'primary',
      opacity: 0,
      zIndex: 0,
    },
    '&:hover, &:focus': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    '&:disabled, &[disabled]': {
      cursor: 'not-allowed',
      textDecoration: 'none',
      color: 'text-disabled',
    },
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible:before': {
      opacity: 1,
    },
  },
  variants: {
    standard: {
      display: 'inline-block',
      textColor: 'primary',
      '&:before': {
        content: "''",
      },
      '&:hover, &:active': {
        textDecoration: 'underline',
      },
      '&:focus-visible': {
        textColor: 'text',
      },
    },
    inline: {
      whiteSpace: 'initial',
      textDecoration: 'underline',
      '&:focus-visible': {
        outline: 'currentColor auto 4px',
        textDecoration: 'underline',
      },
    },
    interface: {
      display: 'inline-block',
      textColor: 'text',
      whiteSpace: 'initial',
      '&:before': {
        content: "''",
      },
    },
  },
});

const anchorProps = variance.compose(
  system.layout,
  system.typography,
  system.space
);

export const AnchorBase = styled('a', styledOptions<'a'>())<AnchorProps>(
  anchorVariants,
  anchorProps
);

export const Anchor = AnchorBase.withComponent(
  ButtonBase as ButtonBaseProps<AnchorProps>
);

Anchor.defaultProps = {
  variant: 'inline',
};
