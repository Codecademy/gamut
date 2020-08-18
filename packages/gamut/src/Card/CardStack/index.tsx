import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export function CardStack() {
  return (
    <div className={styles.container}>
      <div className={styles.cardStack} />
      <div className={cx(styles.cardStack, styles.lower)} />
    </div>
  );
}
