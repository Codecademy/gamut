import { Background, BackgroundProps, css } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { HTMLAttributes } from 'react';

import { Box } from '../Box';
import { placementVariants } from './variants';

interface AlertBannerProps
  extends BackgroundProps,
    StyleProps<typeof placementVariants> {}

const StyledAlertBanner = styled(Background)<AlertBannerProps>(
  placementVariants
);

export const AlertBanner: React.FC<AlertBannerProps> = (
  {
    'aria-label': ariaLabel = 'alert box',
    'aria-live': ariaLive = 'polite',
    bg,
    role = 'status',
  },
  ...rest
) => (
  <StyledAlertBanner
    aria-label={ariaLabel}
    aria-live={ariaLive}
    bg={bg}
    role={role}
    {...rest}
  />
);

interface AlertBoxProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps<typeof placementVariants> {}

const StyledAlertBox = styled(Box)<AlertBoxProps>(placementVariants);

export const AlertBox: React.FC<AlertBoxProps> = (
  {
    'aria-label': ariaLabel = 'alert box',
    'aria-live': ariaLive = 'polite',
    role = 'status',
  },
  ...rest
) => (
  <StyledAlertBox
    aria-label={ariaLabel}
    aria-live={ariaLive}
    role={role}
    {...rest}
  />
);

export const StyledCollapsableContent = styled(motion.div)(
  css({ py: 4, overflowY: 'hidden' })
);

const animationVariants = {
  collapsed: { height: '2rem' },
  expanded: { height: 'auto' },
};

const transitionVariants = { duration: 0.2, ease: 'easeInOut' };

export const CollapsableContent: React.FC<HTMLMotionProps<'div'>> = (
  { initial },
  props
) => (
  <StyledCollapsableContent
    variants={animationVariants}
    transition={transitionVariants}
    initial={initial}
    {...props}
  />
);
