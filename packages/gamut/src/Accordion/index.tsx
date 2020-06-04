import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';

import styles from './styles.module.scss';
import AccordionButton from '../AccordionButton';

export type AccordionProps = {
  className?: string;

  /**
   * Contents of the clickable header button.
   */
  header: React.ReactNode;

  /**
   * Whether the accordion starts off expanded, instead of the default collapsed.
   */
  initiallyExpanded?: boolean;

  /**
   * Called when the header is activated to toggle whether the accordion is expanded.
   */
  onChange: (expanded: boolean) => void;

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
  header,
  initiallyExpanded,
  onChange,
  theme,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [delayExpanded, setDelayExpanded] = useState(expanded);

  useLayoutEffect(() => {
    const handle = setTimeout(
      () => setDelayExpanded(expanded),
      transitionDuration * 1000
    );

    return () => clearTimeout(handle);
  }, [expanded]);

  const onClick = () => {
    setExpanded(!expanded);
    onChange(!expanded);
  };

  return (
    <div className={cx(styles.accordion, className)}>
      <AccordionButton expanded={expanded} onClick={onClick} theme={theme}>
        {header}
      </AccordionButton>
      <motion.div
        aria-expanded={expanded}
        initial={false}
        animate={expanded ? 'expanded' : 'folded'}
        variants={variants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        className={styles.expando}
      >
        {(expanded || delayExpanded) && children}
      </motion.div>
    </div>
  );
};

export default Accordion;
