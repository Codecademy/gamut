import { ComponentProps, forwardRef, useId } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
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

export type IconButtonProps = ComponentProps<typeof IconButtonBase> &
  IconComponentType & {
    'aria-label'?: string;
    tip: string;
    tipProps?: Omit<
      ToolTipProps,
      'info' | 'id' | 'children' | 'hasRepetitiveLabel'
    >;
  };

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
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
    const tipId = useId();

    const buttonSize = size || 'normal';

    const iconSize = iconSizeMapping[buttonSize];

    return (
      <ToolTip info={tip} id={tipId} {...(tipProps as any)}>
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
