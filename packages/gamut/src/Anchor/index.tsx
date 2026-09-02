import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  ComponentProps,
  ComponentType,
  forwardRef,
  HTMLProps,
  Ref,
} from 'react';

import {
  ButtonBase,
  InteractiveSelectors,
  narrowButtonBaseRef,
} from '../ButtonBase/ButtonBase';
import { AppendedIconProps, appendIconToContent } from '../helpers';

export interface AnchorProps
  extends StyleProps<typeof anchorProps>,
    StyleProps<typeof anchorVariants> {
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
}

const outlineFocusVisible = {
  [InteractiveSelectors.OUTLINE]: {
    content: "''",
    position: 'absolute',
    inset: -4,
    borderRadius: 'md',
    border: 2,
    borderColor: 'primary',
    opacity: 0,
    zIndex: 0,
  },

  [InteractiveSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 1,
  },
} as const;

const underlineFocusVisible = {
  [InteractiveSelectors.FOCUS_VISIBLE]: {
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
    [InteractiveSelectors.HOVER]: {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [InteractiveSelectors.DISABLED]: {
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
      [InteractiveSelectors.HOVER]: {
        textDecoration: 'underline',
      },
      [InteractiveSelectors.FOCUS_VISIBLE]: {
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
      [InteractiveSelectors.HOVER]: {
        color: 'primary',
      },
      [InteractiveSelectors.FOCUS_VISIBLE]: {
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

const AnchorBaseStyled = styled('a', styledOptions<'a'>())<AnchorProps>(
  anchorVariants,
  anchorProps
);

/** AnchorBase ref accepts anchor or button because it can render as ButtonBase when there is no href. */
export const AnchorBase = AnchorBaseStyled as ComponentType<
  Omit<ComponentProps<typeof AnchorBaseStyled>, 'ref'> & {
    ref?: Ref<HTMLAnchorElement | HTMLButtonElement | null>;
  }
>;

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
          ref={narrowButtonBaseRef<HTMLButtonElement>(ref)}
          variant={variant}
          {...rest}
        >
          {content}
        </AnchorBase>
      );
    }

    return (
      <AnchorBase
        ref={narrowButtonBaseRef<HTMLAnchorElement>(ref)}
        variant={variant}
        {...rest}
      >
        {content}
      </AnchorBase>
    );
  }
);
