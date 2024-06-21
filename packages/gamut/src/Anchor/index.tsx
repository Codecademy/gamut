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
    borderRadius: '4px',
    border: 2,
    borderColor: 'primary',
    opacity: 0,
    zIndex: 0,
  },

  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 1,
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
      [ButtonSelectors.FOCUS_VISIBLE]: {
        outline: 'currentColor solid 2px',
        borderRadius: '1px',
        outlineOffset: '1.5px',
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
        outline: 'none',
      },
      ...outlineFocusVisible,
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
      iconSize = 12,
      iconAndTextGap = 8,
      isInlineIcon = true,
      variant = 'inline',
      ...rest
    },
    ref
  ) => {
    // At the moment, inconOffset is hardcoded for font-size 16px, but if needed, we can expose this for developers
    iconOffset = variant === 'inline' ? 2 : 4;

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
          variant={variant}
          ref={ref as RefObject<HTMLAnchorElement>}
          {...rest}
        >
          {content}
        </AnchorBase>
      );
    }

    return (
      <AnchorBase
        variant={variant}
        ref={ref as RefObject<HTMLAnchorElement>}
        {...rest}
      >
        {content}
      </AnchorBase>
    );
  }
);
