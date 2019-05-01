import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';

interface CardContentProps {
  title: string;
  description?: string;
  className?: string;
}

function CardContent(props: CardContentProps) {
  return (
    <div className={cx(styles.contentContainer, props.className)}>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.description}>{props.description}</p>
    </div>
  );
}

export default CardContent;
