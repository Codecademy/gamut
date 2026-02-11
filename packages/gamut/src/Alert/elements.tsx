import { Background, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { FillButton } from '../Button';
import { AlertProps } from './Alert';
import { placementVariants } from './variants';

const StyledAlertBanner =
  styled(Background)<Pick<AlertProps, 'type' | 'placement'>>(placementVariants);

export const AlertBanner = forwardRef<
  HTMLDivElement | null,
  ComponentProps<typeof StyledAlertBanner>
>(
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
      ref={ref}
      role={role}
      {...rest}
    />
  )
);

const StyledAlertBox =
  styled(Box)<Pick<AlertProps, 'type' | 'placement'>>(placementVariants);

export const AlertBox = forwardRef<
  HTMLDivElement | null,
  ComponentProps<typeof StyledAlertBox>
>(
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
      ref={ref}
      role={role}
      {...rest}
    />
  )
);

export const alertContentProps = {
  as: 'span',
  display: 'inline-block',
  width: '100%',
} as const;

export const CollapsibleContent = styled(motion.div)(
  css({
    py: 4,
    overflowY: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  })
);

export const CleanFillButton = styled(FillButton)(
  css({
    // Otherwise VoiceOver annouces the button's text twice
    '::before': {
      display: 'none',
    },
  })
);
