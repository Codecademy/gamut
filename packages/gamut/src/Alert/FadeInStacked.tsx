import { breakpoints } from '@codecademy/gamut-styles';
import { motion } from 'framer-motion';
import React, { ComponentProps } from 'react';

export interface FadeInStacked extends ComponentProps<typeof motion['div']> {
  order: number;
}
const hiddenAlertProps = {
  'aria-hidden': true,
  tabIndex: -1,
};

export const FadeInStacked = ({ children, order }: FadeInStacked) => {
  const isFirst = order === 0;
  const offset = order * 4;
  const defaultProps = isFirst && hiddenAlertProps;

  return (
    <motion.div
      {...defaultProps}
      style={{
        width: `calc(${breakpoints.md} - 4rem)`,
        maxWidth: '100%',
        top: 0,
        x: -offset,
        y: offset,
        position: isFirst ? 'relative' : 'absolute',
        zIndex: -order,
        opacity: order > 2 ? 0 : 1,
      }}
      initial={{ y: offset, scale: 0.3, position: 'absolute' }}
      animate={{ y: offset, scale: 1 }}
      exit={{
        x: 50,
        y: -50,
        zIndex: 1,
        opacity: 0,
        position: 'absolute',
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};
