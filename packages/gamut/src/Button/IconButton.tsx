import type {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';

import type { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import type { ToolTipProps } from '../Tip/ToolTip';
import { ToolTip } from '../Tip/ToolTip';
import type { IconComponentType } from '../utils';
import type { ButtonBaseProps, ButtonElementProps } from './shared';
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

type IconButtonBaseProps = ComponentProps<typeof IconButtonBase>;

/** Props for IconButton. Use this type when wrapping or composing IconButton. */
export interface IconButtonProps
  extends ButtonBaseProps,
    ButtonElementProps,
    IconComponentType {
  'aria-label'?: string;
  tip: string;
  tipProps?: Omit<ToolTipProps, 'info' | 'children'>;
}

const IconButtonComponent = forwardRef<ButtonBaseElements, IconButtonProps>(
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
          {...(props as IconButtonBaseProps)}
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

export const IconButton =
  IconButtonComponent as unknown as ForwardRefExoticComponent<
    IconButtonProps & RefAttributes<ButtonBaseElements>
  >;
