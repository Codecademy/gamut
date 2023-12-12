import { GamutIconProps, StreakIcon } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
import { forwardRef } from 'react';
import * as React from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  ButtonBaseProps,
  ButtonProps,
  buttonProps,
  createButtonComponent,
} from './shared';
import { iconSizeVariants, textButtonVariants } from './variants';

const IconButtonInner = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

type ButtonProps = JSX.IntrinsicElements['button'] & {
  href?: undefined;
};

type AnchorProps = JSX.IntrinsicElements['a'] & {
  href: string;
};
type PolymorphicProps = ButtonProps | AnchorProps;

export interface IconButtonProps
  extends ButtonBaseProps,
    StyleProps<typeof buttonProps> {
  'aria-label': string;
  icon: React.ComponentType<GamutIconProps>;
}

type IconButtonCoolProps = IconButtonProps & PolymorphicProps;

export const IconButton = forwardRef<ButtonBaseElements, IconButtonCoolProps>(
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

const Hey = () => {
  return (
    <>
      <IconButtonInner mb={75} variant="primary">
        ok
      </IconButtonInner>
      <IconButtonInner anything="ok">ok</IconButtonInner>
      <IconButton mb={75} variant="primary">
        ok
      </IconButton>
      <IconButton variant="ok" />
      <IconButton anything="ok" />
      <IconButton aria-label="hey" mb={4} icon={StreakIcon} />
      <IconButton
        aria-label="hey"
        mb={4}
        icon={StreakIcon}
        tabIndex="forty"
        variant="primary"
        anything="quack"
      />
    </>
  );
};
