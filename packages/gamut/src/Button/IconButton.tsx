import { ComponentProps, forwardRef } from 'react';

import type {
  ButtonBaseElements,
  ButtonBaseRef,
} from '../ButtonBase/ButtonBase';
import { ToolTip, ToolTipProps } from '../Tip/ToolTip';
import { IconComponentType } from '../utils';
import {
  createButtonComponent,
  iconSizeMapping,
  iconSizeVariants,
  textButtonVariants,
} from './shared';

const IconButtonBase = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

export type IconButtonProps = Omit<
  ComponentProps<typeof IconButtonBase>,
  'ref'
> &
  IconComponentType & {
    ref?: ButtonBaseRef;
    'aria-label'?: string;
    tip: string;
    tipProps?: Omit<ToolTipProps, 'info' | 'children'>;
  };

export const IconButton = forwardRef<
  ButtonBaseElements | null,
  IconButtonProps
>(
  (
    {
      'aria-label': ariaLabel,
      icon: Icon,
      tip,
      tipProps,
      variant = 'secondary',
      size,
      ...props
    },
    ref
  ) => {
    const buttonSize = size || 'normal';

    const iconSize = iconSizeMapping[buttonSize];

    return (
      <ToolTip info={tip} {...(tipProps as any)}>
        <IconButtonBase
          {...props}
          aria-label={ariaLabel || tip}
          ref={ref}
          size={size}
          variant={variant}
        >
          <Icon size={iconSize} />
        </IconButtonBase>
      </ToolTip>
    );
  }
);
