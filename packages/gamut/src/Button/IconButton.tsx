import { GamutIconProps } from '@codecademy/gamut-icons';
import { forwardRef } from 'react';
import * as React from 'react';

import { ButtonBaseElements, PolymorphicProps } from '../ButtonBase/ButtonBase';
import { ButtonBaseProps, createButtonComponent } from './shared';
import { iconSizeVariants, textButtonVariants } from './variants';

const IconButtonInner = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

export interface IconButtonBaseProps extends ButtonBaseProps {
  'aria-label': string;
  icon: React.ComponentType<GamutIconProps>;
}

export type IconButtonProps = IconButtonBaseProps & PolymorphicProps;

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ children, icon: Icon, variant = 'secondary', ...props }, ref) => {
    return (
      <IconButtonInner
        {...props}
        variant={variant}
        ref={ref as React.MutableRefObject<any>}
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
