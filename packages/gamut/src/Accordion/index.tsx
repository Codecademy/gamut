import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';

import styles from './styles.module.scss';

export type AccordionProps = {
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
  expanded: { height: '100%' },
  folded: { height: 0 },
};

export const Accordion: React.FC<AccordionProps> = ({
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
    <div className={className}>
      {top}
      <motion.div
        aria-expanded={expanded}
        className={styles.accordionBody}
        initial={false}
        animate={expanded ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
      >
        {(expanded || delayExpanded) && children}
      </motion.div>
    </div>
  );
};

export default Accordion;
