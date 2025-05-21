import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef, HTMLProps, RefObject } from 'react';

import { ButtonBase, ButtonSelectors } from '../ButtonBase/ButtonBase';
import { AppendedIconProps, appendIconToContent } from '../helpers';

export interface AnchorProps
  extends StyleProps<typeof anchorProps>,
    StyleProps<typeof anchorVariants> {
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
}

const outlineFocusVisible = {
  [ButtonSelectors.OUTLINE]: {
    content: "''",
    position: 'absolute',
    inset: -4,
    borderRadius: 'md',
    border: 2,
    borderColor: 'primary',
    opacity: 0,
    zIndex: 0,
  },

  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 1,
  },
} as const;

const underlineFocusVisible = {
  [ButtonSelectors.FOCUS_VISIBLE]: {
    outline: 'currentColor solid 2px',
    borderRadius: 'sm',
    outlineOffset: '1.5px',
    textDecoration: 'underline',
  },
} as const;

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
    [ButtonSelectors.HOVER]: {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [ButtonSelectors.DISABLED]: {
      cursor: 'not-allowed',
      textDecoration: 'none',
      color: 'text-disabled',
    },
  },
  variants: {
    standard: {
      color: 'primary',
      fontWeight: 'bold',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      [ButtonSelectors.HOVER]: {
        textDecoration: 'underline',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        outline: 'none',
      },
      ...outlineFocusVisible,
    },
    inline: {
      display: 'inline',
      whiteSpace: 'initial',
      textDecoration: 'underline',
      ...underlineFocusVisible,
    },
    interface: {
      color: 'text',
      whiteSpace: 'initial',
      [ButtonSelectors.HOVER]: {
        color: 'primary',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        color: 'primary',
        outline: 'none',
      },
      ...outlineFocusVisible,
    },
    'standard-secondary': {
      color: 'text',
      textDecoration: 'underline',
      ...underlineFocusVisible,
    },
  },
});

const anchorProps = variance.compose(
  system.layout,
  system.space,
  system.typography
);

export const AnchorBase = styled('a', styledOptions<'a'>())<AnchorProps>(
  anchorVariants,
  anchorProps
);

type AnchorBaseProps =
  | ComponentProps<typeof AnchorBase>
  | (Exclude<ComponentProps<typeof AnchorBase>, 'ref'> &
      ComponentProps<typeof ButtonBase>);

type AnchorExtProps = Partial<AppendedIconProps> & AnchorBaseProps;

export const Anchor = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  AnchorExtProps
>(
  (
    {
      children,
      icon,
      iconOffset,
      iconPosition = 'left',
      iconSize = 16,
      iconAndTextGap = 8,
      isInlineIcon = true,
      variant = 'inline',
      ...rest
    },
    ref
  ) => {
    const content = appendIconToContent({
      children,
      icon,
      iconOffset,
      iconPosition,
      iconSize,
      iconAndTextGap,
      isInlineIcon,
    });
    if (!rest.href) {
      return (
        <AnchorBase
          as={ButtonBase}
          ref={ref as RefObject<HTMLAnchorElement>}
          variant={variant}
          {...rest}
        >
          {content}
        </AnchorBase>
      );
    }

    return (
      <AnchorBase
        ref={ref as RefObject<HTMLAnchorElement>}
        variant={variant}
        {...rest}
      >
        {content}
      </AnchorBase>
    );
  }
);
