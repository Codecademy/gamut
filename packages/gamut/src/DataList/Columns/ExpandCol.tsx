import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { motion } from 'framer-motion';
import React from 'react';

import { IconButton, ListCol } from '../..';

export interface ExpandColProps {
  expanded?: boolean;
  onExpand?: (id: any) => void;
  ghost?: boolean;
  id?: any;
}

export const ExpandCol: React.FC<ExpandColProps> = ({
  id,
  expanded,
  onExpand,
  ghost,
}) => (
  <ListCol size="content" aria-hidden={ghost} ghost={ghost}>
    <IconButton
      size="small"
      onClick={() => onExpand?.(id)}
      aria-label={`Expand ${id} Row`}
    >
      <motion.div
        animate={expanded ? 'expanded' : 'collapsed'}
        style={{
          transformOrigin: 'center',
          alignSelf: 'center',
          height: 16,
          width: 16,
        }}
        variants={{
          expanded: { rotate: 180 },
          collapsed: { rotate: 0 },
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <ArrowChevronDownIcon />
      </motion.div>
    </IconButton>
  </ListCol>
);
