import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import { motion } from 'framer-motion';
import React from 'react';

import { FlexBox } from '../../Box/FlexBox';
import { TextButton } from '../../Button/TextButton';
import { RowChange } from '..';

export interface ExpandColProps {
  expanded?: boolean;
  onExpand?: RowChange<any>;
  ghost?: boolean;
  disabled?: boolean;
  id?: any;
}

const HalfRotation: React.FC<{ rotated?: boolean }> = ({
  rotated,
  children,
}) => (
  <motion.div
    animate={rotated ? 'rotated' : 'normal'}
    style={{
      transformOrigin: 'center',
      alignSelf: 'center',
      height: 16,
      width: 16,
    }}
    variants={{
      rotated: { rotate: 180 },
      normal: { rotate: 0 },
    }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

export const ExpandControl: React.FC<ExpandColProps> = ({
  id,
  disabled,
  expanded,
  onExpand,
}) => (
  <FlexBox mt={{ _: 8, xs: 0 }} pl={{ _: 0, xs: 16 }} width={1} center>
    <TextButton
      disabled={disabled}
      variant="secondary"
      width={{ _: 1, xs: 32 }}
      size="small"
      onClick={() => {
        onExpand?.({ rowId: id, toggle: expanded });
      }}
      aria-label={`Expand ${id} Row`}
      aria-expanded={expanded}
    >
      <HalfRotation rotated={expanded}>
        <MiniChevronDownIcon color="text-disabled" />
      </HalfRotation>
    </TextButton>
  </FlexBox>
);
