import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase, ButtonBaseProps } from '../ButtonBase/ButtonBase';

export interface AnchorProps
  extends StyleProps<typeof anchorProps>,
    StyleProps<typeof anchorVariants> {}

const anchorVariants = system.variant({
  base: {
    display: 'inline-block',
    bg: 'transparent',
    boxShadow: 'none',
    border: 'none',
    p: 0,
    fontSize: 'inherit',
    position: 'relative',
    textColor: 'primary',
    whiteSpace: 'nowrap',
    '&:after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: -4,
      width: `calc(100% + 0.5rem)`,
      height: '100%',
      borderRadius: '4px',
      border: '2px solid',
      borderColor: 'primary',
      opacity: 0,
    },
    '&:hover, &:focus': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    '&:disabled, &[disabled]': {
      cursor: 'not-allowed',
      textDecoration: 'none',
      color: 'gray-700',
    },
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible:after': {
      opacity: 1,
    },
  },
  variants: {
    standard: {
      textColor: 'primary',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&:focus-visible': {
        textColor: 'text',
        textDecoration: 'none',
      },
    },
    inline: {
      textDecoration: 'underline',
    },
    interface: {
      textColor: 'text',
      whiteSpace: 'initial',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
});

const anchorProps = variance.compose(
  system.layout,
  system.typography,
  system.space
);

export const AnchorBase = styled('a', styledConfig)<AnchorProps>(
  anchorVariants,
  anchorProps
);

export const Anchor = AnchorBase.withComponent(
  ButtonBase as ButtonBaseProps<AnchorProps>
);

Anchor.defaultProps = {
  variant: 'inline',
};
