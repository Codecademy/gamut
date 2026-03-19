import { Background, createComponent, css } from '@codecademy/gamut-styles';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

import { Box, BoxProps } from '../Box';
import { FillButton } from '../Button';
import { AlertProps } from './Alert';
import { placementVariants } from './variants';

type AlertContainerProps = Pick<AlertProps, 'type' | 'placement'> &
  BoxProps &
  React.AriaAttributes & {
    role?: string;
    'aria-label'?: string;
    'aria-live'?: string;
  };

const StyledAlertBanner =
  createComponent(Background)<AlertContainerProps>(placementVariants);

export const AlertBanner = forwardRef<HTMLDivElement, AlertContainerProps>(
  (
    {
      'aria-label': ariaLabel = 'alert banner',
      'aria-live': ariaLive = 'polite',
      role = 'status',
      ...rest
    },
    ref
  ) => (
    <StyledAlertBanner
      aria-label={ariaLabel}
      aria-live={ariaLive}
      ref={ref as any}
      role={role}
      {...(rest as any)}
    />
  )
);

const StyledAlertBox =
  createComponent(Box)<AlertContainerProps>(placementVariants);

export const AlertBox = forwardRef<HTMLDivElement, AlertContainerProps>(
  (
    {
      'aria-label': ariaLabel = 'alert box',
      'aria-live': ariaLive = 'polite',
      role = 'status',
      ...rest
    },
    ref
  ) => (
    <StyledAlertBox
      aria-label={ariaLabel}
      aria-live={ariaLive}
      ref={ref as any}
      role={role}
      {...(rest as any)}
    />
  )
);

export const alertContentProps = {
  as: 'span',
  display: 'inline-block',
  width: '100%',
} as const;

export const CollapsibleContent = createComponent(motion.div)(
  css({
    py: 4,
    overflowY: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  })
);

export const CleanFillButton = createComponent(FillButton)(
  css({
    // Otherwise VoiceOver annouces the button's text twice
    '::before': {
      display: 'none',
    },
  })
);
