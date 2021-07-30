import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

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

/**
 * @deprecated
 * This component is in the old visual identity and will be updated soon.
 *
 * Check the [Gamut Board](https://www.notion.so/codecademy/Gamut-Status-Timeline-dd3c135d3848464ea6eb1b48e68fbb1d) for component status
 */

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  children,
  className,
  expanded,
  top,
}) => {
  const [delayExpanded, setDelayExpanded] = useState(expanded);

  useIsomorphicLayoutEffect(() => {
    const handle = setTimeout(
      () => setDelayExpanded(expanded),
      transitionDuration * 1000
    );

    return () => clearTimeout(handle);
  }, [expanded]);

  return (
    <div className={className}>
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
    </div>
  );
};

const StyledAccordionBody = styled(motion.div)`
  overflow: hidden;
`;
