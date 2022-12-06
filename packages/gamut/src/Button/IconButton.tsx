import { GamutIconProps } from '@codecademy/gamut-icons';
import { forwardRef } from 'react';
import * as React from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonProps, createButtonComponent } from './shared';
import { iconSizeVariants, textButtonVariants } from './variants';

const IconButtonInner = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

export interface IconButtonProps extends ButtonProps {
  'aria-label': string;
  icon: React.ComponentType<GamutIconProps>;
}

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ children, icon: Icon, variant = 'secondary', ...props }, ref) => {
    return (
      <IconButtonInner {...props} variant={variant} ref={ref}>
        {Icon && (
          <Icon
            width="calc(100% - 14px)"
            height="calc(100% - 14px)"
            aria-hidden
          />
        )}
        {children}
      </IconButtonInner>
    );
  }
);
