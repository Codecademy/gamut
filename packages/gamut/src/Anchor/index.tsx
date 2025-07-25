import { forwardRef, RefObject } from 'react';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { appendIconToContent, appendMultiIconsToContent } from '../helpers';
import { AnchorBase, AnchorExtProps } from './types';

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
    const commonIconProps = {
      children,
      iconOffset,
      iconSize,
      iconAndTextGap,
      isInlineIcon,
    };

    const content =
      icon && Array.isArray(icon)
        ? appendMultiIconsToContent({ ...commonIconProps })
        : appendIconToContent({ ...commonIconProps, iconPosition });

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
