import { Background, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';
import { AlertProps } from './Alert';
import { placementVariants } from './variants';

const StyledAlertBanner =
  styled(Background)<Pick<AlertProps, 'type' | 'placement'>>(placementVariants);

export const AlertBanner = forwardRef<
  HTMLDivElement,
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
      role={role}
      ref={ref}
      {...rest}
    />
  )
);

const StyledAlertBox =
  styled(Box)<Pick<AlertProps, 'type' | 'placement'>>(placementVariants);

export const AlertBox = forwardRef<
  HTMLDivElement,
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
      role={role}
      ref={ref}
      {...rest}
    />
  )
);

export const alertContentProps = {
  as: 'span',
  display: 'inline-block',
  width: '100%',
} as const;

export const CollapsableContent = styled(motion.div)(
  css({
    py: 4,
    overflowY: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  })
);
