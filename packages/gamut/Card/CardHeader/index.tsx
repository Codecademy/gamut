import React, { ReactNode } from 'react';
import cx from 'classnames';
// @ts-ignore
import { colors } from '@codecademy/gamut-styles/utils/variables';
import styles from './styles.scss';

interface CardHeaderProps {
  backgroundColor?: string;
  backgroundImage?: string;
  withWave?: boolean;
  children?: ReactNode;
  className?: string;
}

function CardHeader(props: CardHeaderProps) {
  let backgroundStyles = {
    backgroundColor: props.backgroundColor || colors.gray[200],
    backgroundImage: '',
  };

  if (props.backgroundImage) {
    backgroundStyles = {
      backgroundColor: props.backgroundColor,
      backgroundImage: `url(${props.backgroundImage})`,
    };
  }

  return (
    <div
      className={cx(styles.headerContainer, props.className)}
      style={backgroundStyles}
    >
      {props.children}
      {props.withWave && (
        <div className={styles.waveContainer}>
          <svg
            width="100%"
            height="30"
            viewBox="0 0 312 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0 .373c40.453 0 52.457 15.594 89.16 15.594 36.704 0 34.442-15.594 70.973-15.594 36.53 0 34.588 15.594 73.442 15.594C272.43 15.967 272.43.373 312 .373V29.21H0V.373z"
              fill={colors.white}
              fillRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default CardHeader;
