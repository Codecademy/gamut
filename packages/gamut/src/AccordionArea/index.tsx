import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';

import { Box } from '../Box';

export type AccordionAreaProps = {
  children: React.ReactNode;

  className?: string;

  /**
   * Whether the accordion is visually expanded to show its contents.
   */
  expanded?: boolean;

  /**
   * Contents of the clickable header button.
   */
  top: React.ReactNode;
};

const transitionDuration = 0.2;

const variants = {
  expanded: { height: 'auto' },
  folded: { height: '0' },
};

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  children,
  className,
  expanded,
  top,
}) => {
  const [delayExpanded, setDelayExpanded] = useState(expanded);

  useLayoutEffect(() => {
    const handle = setTimeout(
      () => setDelayExpanded(expanded),
      transitionDuration * 1000
    );

    return () => clearTimeout(handle);
  }, [expanded]);

  return (
    <Box className={className}>
      {top}
      <StyledAccordionBody
        aria-expanded={expanded}
        initial={expanded ? 'expanded' : 'folded'}
        animate={expanded ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
      >
        {(expanded || delayExpanded) && children}
      </StyledAccordionBody>
    </Box>
  );
};

const StyledAccordionBody = styled(motion.div)`
  overflow: hidden;
`;
