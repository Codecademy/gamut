import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

export type AccordionAreaDeprecatedProps = {
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

export const AccordionAreaDeprecated: React.FC<
  AccordionAreaDeprecatedProps
> = ({ children, className, expanded, top }) => {
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
        animate={expanded ? 'expanded' : 'folded'}
        initial={expanded ? 'expanded' : 'folded'}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        variants={variants}
      >
        {(expanded || delayExpanded) && children}
      </StyledAccordionBody>
    </div>
  );
};

const StyledAccordionBody = styled(motion.div)`
  overflow: hidden;
`;
