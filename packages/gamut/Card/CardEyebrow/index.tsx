import React from 'react';
import cx from 'classnames';
import Icon from '../../Icon';
import iconMap from '../../Icon/iconMap';
import styles from './styles.scss';

interface CardEyebrowProps {
  iconName?: keyof typeof iconMap;
  iconColor?: string;
  leftText: string;
  rightText: string;
}

function CardEyebrow(props: CardEyebrowProps) {
  return (
    <div className={cx(styles.displayHorizontal, styles.eyebrow)}>
      <div className={styles.displayHorizontal}>
        {props.iconName && (
          <div className={styles.eyebrowIconContainer}>
            <Icon name={props.iconName} size={20} color={props.iconColor} />
          </div>
        )}
        <div className={styles.eyebrowText}>{props.leftText}</div>
      </div>
      <div className={styles.eyebrowText}>{props.rightText}</div>
    </div>
  );
}

export default CardEyebrow;
