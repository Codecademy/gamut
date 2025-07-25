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
    let content;
    if (icon && Array.isArray(icon)) {
      content = appendMultiIconsToContent({
        children,
        icon,
        iconOffset,
        iconSize,
        iconAndTextGap,
        isInlineIcon,
      });
    } else {
      // Use appendIconToContent for single icon
      content = appendIconToContent({
        children,
        icon,
        iconOffset,
        iconSize,
        iconAndTextGap,
        isInlineIcon,
        iconPosition,
      });
    }

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
