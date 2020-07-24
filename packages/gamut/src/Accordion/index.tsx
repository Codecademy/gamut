import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';

import AccordionButton from '../AccordionButton';

export type RenderWithExpanded = (expanded: boolean) => React.ReactNode;

export type AccordionProps = {
  children: React.ReactNode | RenderWithExpanded;

  className?: string;

  /**
   * Whether the accordion is visually expanded to show its contents.
   */
  expanded: boolean;

  /**
   * Contents of the clickable header button.
   */
  header: React.ReactNode | RenderWithExpanded;

  size?: 'normal' | 'large';

  /**
   * Visual theme for the clickable header button.
   */
  theme: 'blue' | 'plain' | 'yellow';
};

const transitionDuration = 0.2;

const variants = {
  expanded: { height: '100%' },
  folded: { height: 0, overflow: 'hidden' },
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  expanded,
  header,
  size = 'normal',
  theme,
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
    <div className={className}>
      <AccordionButton expanded={expanded} size={size} theme={theme}>
        {header instanceof Function ? header(expanded) : header}
      </AccordionButton>
      <motion.div
        aria-expanded={expanded}
        initial={false}
        animate={expanded ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
      >
        {(expanded || delayExpanded) &&
          (children instanceof Function ? children(expanded) : children)}
      </motion.div>
    </div>
  );
};

export default Accordion;
