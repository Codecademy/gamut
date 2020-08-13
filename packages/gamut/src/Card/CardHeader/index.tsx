import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface CardHeaderProps {
  backgroundColor?: string;
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
}

export function CardHeader(props: CardHeaderProps) {
  let backgroundStyles = {
    background: props.backgroundColor,
  };

  if (props.backgroundImage) {
    backgroundStyles = {
      background: `url(${props.backgroundImage}) center center / cover no-repeat`,
    };
  }

  return (
    <div
      className={cx(styles.headerContainer, props.className)}
      style={backgroundStyles}
    >
      {props.children}
    </div>
  );
}
