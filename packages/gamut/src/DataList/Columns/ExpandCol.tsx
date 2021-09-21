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
  <ListCol size="content" ghost aria-hidden={ghost}>
    <IconButton
      size="smalls"
      onClick={() => onExpand?.(id)}
      aria-label={`Expand ${id} Row`}
    >
      <motion.div
        animate={expanded ? 'expanded' : 'collapsed'}
        variants={{
          expanded: { transform: 'translate(180deg)' },
          collapsed: { transform: 'translate(0deg)' },
        }}
      >
        <ArrowChevronDownIcon />
      </motion.div>
    </IconButton>
  </ListCol>
);
