import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../../Box';

export const minBarWidth = 8;

const baseStyles = {
  alignItems: 'center',
  height: '100%',
  display: 'flex',
  transitionDelay: '1.5s',
  transition: 'width 0.5s',
  position: 'absolute',
  borderRadius: 'inherit',
  borderColor: 'border-primary',
} as const;

export const Bar = styled(motion.div)(
  css({
    borderWidth: '1px',
    borderStyle: 'solid',
    ...baseStyles,
  })
);

export const ForegroundBar = styled(Box)(
  css({
    ...baseStyles,
    bg: 'feedback-warning',
    borderLeftColor: 'transparent',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    height: 'calc(100% - 2px)',
  })
);

export const BarWrapper = styled(Box)(
  css({
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    height: { _: '8px', sm: '18px' },
    borderRadius: { _: 'md', sm: 'xl' },
  })
);
