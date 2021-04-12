import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

interface CardContentProps {
  title: string;
  description?: string;
  className?: string;
  textClassName?: string;
}

/**
 * @deprecated  This component is deprecated and is no longer supported.
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

export function CardContent(props: CardContentProps) {
  return (
    <div className={cx(styles.contentContainer, props.className)}>
      <h3 className={cx(styles.title, props.textClassName)}>{props.title}</h3>
      <p className={cx(styles.description, props.textClassName)}>
        {props.description}
      </p>
    </div>
  );
}
