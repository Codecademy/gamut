import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { HTMLProps } from 'react';

import { ButtonBase, ButtonSelectors } from '../ButtonBase/ButtonBase';

export interface AnchorProps
  extends StyleProps<typeof anchorProps>,
    StyleProps<typeof anchorVariants> {
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
}

const anchorVariants = variant({
  base: {
    display: 'inline-block',
    bg: 'transparent',
    boxShadow: 'none',
    border: 'none',
    p: 0,
    fontSize: 'inherit',
    position: 'relative',
    color: 'primary',
    whiteSpace: 'nowrap',
    [ButtonSelectors.OUTLINE]: {
      content: "''",
      position: 'absolute',
      inset: -4,
      borderRadius: '4px',
      border: 2,
      borderColor: 'primary',
      opacity: 0,
      zIndex: 0,
    },
    [ButtonSelectors.HOVER]: {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [ButtonSelectors.DISABLED]: {
      cursor: 'not-allowed',
      textDecoration: 'none',
      color: 'text-disabled',
    },
    [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
      opacity: 1,
    },
  },
  variants: {
    standard: {
      color: 'primary',
      [ButtonSelectors.HOVER]: {
        textDecoration: 'underline',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        color: 'text',
      },
    },
    inline: {
      display: 'inline',
      whiteSpace: 'initial',
      textDecoration: 'underline',
      [ButtonSelectors.OUTLINE]: {
        display: 'none',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        outline: 'currentColor auto 4px',
        textDecoration: 'underline',
      },
    },
    interface: {
      color: 'text',
      whiteSpace: 'initial',
      [ButtonSelectors.HOVER]: {
        color: 'primary',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        color: 'primary',
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

export const Anchor = AnchorBase.withComponent(ButtonBase);

Anchor.defaultProps = {
  variant: 'inline',
};
