import { GamutIconProps } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
import { forwardRef } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { CTAButton } from './CTAButton';
import { ButtonProps, createButtonComponent } from './shared';
import { StrokeButton } from './StrokeButton';
import { iconSizeVariants, textButtonVariants } from './variants';

const IconButtonInner = createButtonComponent<
  StyleProps<typeof iconSizeVariants>,
  StyleProps<typeof textButtonVariants>
>(iconSizeVariants, textButtonVariants);

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

const Hey = () => {
  return (
    <>
      <Box anything="seventeen">Hey</Box>
      <CTA variant="no" anything="seventeen" mb={54}>
        hey
      </CTA>
      <StrokeButton variant="no" anything="seventeen" mb={54}>
        hey
      </StrokeButton>
      <IconButtonInner
        variant="no"
        anything="seventeen"
        tabIndex="seventeen"
        mb={54}
      />
    </>
  );
};
