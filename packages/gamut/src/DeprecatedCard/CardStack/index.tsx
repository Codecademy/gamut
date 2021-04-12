import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

/**
 * @deprecated  This component is deprecated and is no longer supported
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

export function CardStack() {
  return (
    <div className={styles.container}>
      <div className={styles.cardStack} />
      <div className={cx(styles.cardStack, styles.lower)} />
    </div>
  );
}
