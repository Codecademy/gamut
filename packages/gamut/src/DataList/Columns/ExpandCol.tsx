import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { motion } from 'framer-motion';
import React from 'react';

import { IconButton, ListCol } from '../..';

export interface ExpandColProps {
  expanded?: boolean;
  onClick?: () => void;
  ghost?: boolean;
  id?: string;
}

export const ExpandCol: React.FC<ExpandColProps> = ({
  id,
  expanded,
  onClick,
  ghost,
}) => (
  <ListCol size="content" ghost>
    <IconButton
      size="smalls"
      onClick={() => onClick?.()}
      aria-hidden={ghost}
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
