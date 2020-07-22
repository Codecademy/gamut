import React from 'react';
import cx from 'classnames';
import Icon from '../../deprecated/Icon';
import iconMap from '../../deprecated/Icon/iconMap';
import styles from './styles.module.scss';

interface CardEyebrowProps {
  iconName?: keyof typeof iconMap;
  iconColor?: string;
  leftText?: string;
  rightText?: string;
  className?: string;
  isDarkTheme?: boolean;
}

export function CardEyebrow(props: CardEyebrowProps) {
  const textStyle = cx(styles.eyebrowText, {
    [styles.darkTheme]: props.isDarkTheme,
  });

  return (
    <div
      className={cx(styles.displayHorizontal, styles.eyebrow, props.className)}
    >
      <div className={styles.displayHorizontal}>
        {props.iconName && (
          <div
            className={cx(styles.eyebrowIconContainer, {
              [styles.darkThemeIcon]: props.isDarkTheme,
            })}
          >
            <Icon name={props.iconName} size={20} color={props.iconColor} />
          </div>
        )}
        <div className={textStyle}>{props.leftText}</div>
      </div>
      <div className={textStyle}>{props.rightText}</div>
    </div>
  );
}

export default CardEyebrow;
