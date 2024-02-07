import { GamutIconProps } from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { createButtonComponent } from './shared';
import { iconSizeVariants, textButtonVariants } from './variants';

const IconButtonInner = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

export type IconButtonProps = ComponentProps<typeof IconButtonInner> & {
  'aria-label': string;
  icon: React.ComponentType<GamutIconProps>;
};

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
