import React from 'react';

import styles from './styles.module.scss';

export const StoryDescription: React.FC = ({ children }) => {
  return <div className={styles.description}>{children}</div>;
};
