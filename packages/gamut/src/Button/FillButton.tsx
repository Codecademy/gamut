import { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { createButtonComponent, InlineIconButtonProps } from './shared';
import { fillButtonVariants, sizeVariants } from './variants';

const FillButtonBase = createButtonComponent(sizeVariants, fillButtonVariants);

type FillButtonProps = InlineIconButtonProps<typeof FillButtonBase>;

type GenericButtonType = FillButtonProps & {
  button: React.ComponentType<FillButtonProps>;
};

export const GenericButton = forwardRef<ButtonBaseElements, GenericButtonType>(
  ({ children, button: Button, icon: Icon, variant, ...props }, ref) => {
    return (
      <Button {...props} variant={variant} ref={ref}>
        {Icon && <Icon aria-hidden size={12} mr={8} />}
        {children}
      </Button>
    );
  }
);

export const FillButton = forwardRef<ButtonBaseElements, FillButtonProps>(
  ({ children, icon: Icon, variant, ...props }, ref) => {
    return (
      <FillButtonBase {...props} variant={variant} ref={ref}>
        {Icon && <Icon aria-hidden size={12} mr={8} />}
        {children}
      </FillButtonBase>
    );
  }
);
