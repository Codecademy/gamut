import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface CardContentProps {
  title: string;
  description?: string;
  className?: string;
  textClassName?: string;
}

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
