import { forwardRef, RefObject } from 'react';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { AppendedIconProps, appendIconToContent } from '../helpers';
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
      isInlineIcon = true,
      variant = 'inline',
      ...rest
    },
    ref
  ) => {
    const content = appendIconToContent({
      children,
      iconOffset,
      iconSize,
      iconAndTextGap: 8,
      isInlineIcon,
      icon,
      iconPosition,
    } as AppendedIconProps);

    if (!rest.href || rest.disabled) {
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
