import { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { createButtonComponent, IconButtonProps } from './shared';
import { iconSizeVariants, textButtonVariants } from './variants';

const IconButtonInner = createButtonComponent(
  'Icon',
  iconSizeVariants,
  textButtonVariants
);

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
