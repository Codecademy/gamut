import { useId } from '@reach/auto-id';
import { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ToolTipProps } from '../Tip';
import {
  createButtonComponent,
  IconComponentType,
  iconSizeVariants,
  textButtonVariants,
} from './shared';

const IconButtonBase = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

export type IconButtonProps = ComponentProps<typeof IconButtonBase> &
  IconComponentType & {
    'aria-label': string;
    tip: ToolTipProps['info'];
    tipProps?: Omit<ToolTipProps, 'info'>;
  };

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ children, icon: Icon, variant = 'secondary', ...props }, ref) => {
    const tipId = useId();
    return (
      <IconButtonBase {...props} variant={variant} ref={ref}>
        {Icon && (
          <Icon
            width="calc(100% - 14px)"
            height="calc(100% - 14px)"
            aria-hidden
          />
        )}
        {children}
      </IconButtonBase>
    );
  }
);
