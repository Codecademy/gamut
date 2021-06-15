import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase, ButtonSelectors } from '../ButtonBase/ButtonBase';

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
    [ButtonSelectors.OUTLINE]: {
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
    [ButtonSelectors.OUTLINE_FOCUS]: {
      opacity: 1,
    },
  },
  variants: {
    standard: {
      display: 'inline-block',
      textColor: 'primary',
      [ButtonSelectors.OUTLINE]: {
        content: "''",
      },
      [ButtonSelectors.HOVER]: {
        textDecoration: 'underline',
      },
      [ButtonSelectors.FOCUS]: {
        textColor: 'text',
      },
    },
    inline: {
      whiteSpace: 'initial',
      textDecoration: 'underline',
      [ButtonSelectors.FOCUS]: {
        outline: 'currentColor auto 4px',
        textDecoration: 'underline',
      },
    },
    interface: {
      display: 'inline-block',
      textColor: 'text',
      whiteSpace: 'initial',
      [ButtonSelectors.OUTLINE]: {
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

export const Anchor = AnchorBase.withComponent(ButtonBase);

Anchor.defaultProps = {
  variant: 'inline',
};
