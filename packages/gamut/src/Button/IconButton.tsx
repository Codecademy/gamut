import { GamutIconProps } from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';

import { ButtonBase } from '../ButtonBase/ButtonBase';
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

export const IconButton = forwardRef<typeof ButtonBase, IconButtonProps>(
  ({ children, icon: Icon, variant = 'secondary', ...props }, ref) => {
    return (
      <IconButtonInner
        {...props}
        variant={variant}
        ref={ref as IconButtonProps['ref']}
      >
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
