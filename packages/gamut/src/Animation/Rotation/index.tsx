import { motion } from 'framer-motion';
import React from 'react';

export interface RotationProps {
  /**
   * Whether the container is rotated. Defaults to 180 (half a rotation)
   */
  rotated?: boolean;

  /**
   * Number of degrees to rotate. Should be under 360.
   */
  degrees?: number;

  /**
   * Height of container. Defaults to 16.†
   */
  height?: number;
  /**
   * Width of container. Defaults to 16.
   */
  width?: number;
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
    variants={{
      rotated: { rotate: degrees },
      normal: { rotate: 0 },
    }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);
