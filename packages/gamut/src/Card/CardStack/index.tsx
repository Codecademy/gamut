import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export function CardStack() {
  return (
    <div className={styles.container}>
      <div className={styles.cardStack} />
      <div className={cx(styles.cardStack, styles.lower)} />
    </div>
  );
}
