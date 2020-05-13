import React from 'react';

import styles from './styles.module.scss';

export const AboutHeading: React.FC = ({ children }) => {
  return <h1 className={styles.aboutHeading}>{children}</h1>;
};

export default AboutHeading;
