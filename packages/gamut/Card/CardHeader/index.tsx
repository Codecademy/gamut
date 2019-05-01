import React, { ReactNode } from 'react';
import cx from 'classnames';
import { colors } from '@codecademy/gamut-styles/utils/variables';
import Icon from '../../Icon';
import iconMap from '../../Icon/iconMap';
import styles from './styles.scss';

interface CardHeaderProps {
  backgroundColor?: string;
  backgroundGradient?: {
    start: string;
    end: string;
  };
  iconName: keyof typeof iconMap;
  iconColor: string;
  withWave?: boolean;
  children?: ReactNode;
}

function CardHeader(props: CardHeaderProps) {
  return (
    <div
      className={cx(styles.headerContainer, {
        [styles.tallerHeader]: props.withWave,
      })}
      style={{
        ...(props.backgroundColor && {
          background: props.backgroundColor,
        }),
        ...(props.backgroundGradient && {
          background: `linear-gradient(0deg, ${
            props.backgroundGradient.start
          } 0%, ${props.backgroundGradient.end} 100%)`,
        }),
      }}
    >
      {props.children}
      <div
        className={cx(styles.headerIcon, {
          [styles.iconLeft]: props.withWave,
        })}
      >
        <Icon name={props.iconName} size={72} color={props.iconColor} />
      </div>
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
