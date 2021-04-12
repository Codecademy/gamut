import cx from 'classnames';
import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

interface CardHeaderProps {
  backgroundColor?: string;
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * @deprecated  This component is deprecated and is no longer supported
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

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
