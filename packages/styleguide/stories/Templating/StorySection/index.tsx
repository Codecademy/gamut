import { VisualTheme } from '@codecademy/gamut/src';
import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type Section = {
  children: React.ReactNode;
  description: React.ReactNode;
  heading: string;
};

export type StorySectionProps = {
  section: Section;
  theme: VisualTheme;
};

const StorySection: React.FC<StorySectionProps> = ({
  section: { children, description, heading },
  theme,
}) => {
  return (
    <div
      className={cx(
        styles.section,
        theme === VisualTheme.DarkMode && styles.sectionDark
      )}
    >
      <h2 className={styles.heading}>{heading}</h2>
      <p>{description}</p>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default StorySection;
