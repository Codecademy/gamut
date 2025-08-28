import { timingValues } from '@codecademy/gamut-styles';
import { motion } from 'framer-motion';
import * as React from 'react';

import { WithChildrenProp } from '../utils';

export interface RotationProps extends WithChildrenProp {
  /**
   * Whether the container is rotated. Defaults to 180 (half a rotation)
   */
  rotated?: boolean;

  /**
   * Number of degrees to rotate. Should be under 360.
   */
  degrees?: number;

  /**
   * Height of container. Defaults to 16.
   */
  height?: number;
  /**
   * Width of container. Defaults to 16.
   */
  width?: number;

  'aria-hidden'?: boolean;
}

export const Rotation: React.FC<RotationProps> = ({
  rotated,
  degrees = 180,
  height = 16,
  width = 16,
  children,
  ...rest
}) => (
  <motion.div
    animate={rotated ? 'rotated' : 'normal'}
    style={{
      transformOrigin: 'center',
      alignSelf: 'center',
      height,
      width,
    }}
    transition={{ duration: timingValues.medium / 1000, ease: 'easeInOut' }}
    variants={{
      rotated: { rotate: degrees },
      normal: { rotate: 0 },
    }}
    {...rest}
  >
    {children}
  </motion.div>
);
