import { get } from 'lodash';
import React from 'react';

import { Icon } from '../deprecated/Icon';
import { iconMap } from '../deprecated/Icon/iconMap';
import styles from './styles/NotificationIcon.module.scss';
import { NotificationIconSettings } from './typings';

const renderIcon = (props: NotificationIconProps) => {
  const { iconSettings, iconSlug, imageUrl } = props;

  if (iconSlug) {
    const color = get(iconSettings, 'color');
    const backgroundColor = get(iconSettings, 'backgroundColor');

    const iconStyle = {
      backgroundColor,
      color,
    };

    return (
      <div className={styles.iconComponentContainer} style={iconStyle}>
        <Icon name={iconSlug} className={styles.iconImage} />
      </div>
    );
  }

  if (imageUrl) {
    return <img src={imageUrl} className={styles.icon} alt="" />;
  }

  return null;
};

export type NotificationIconProps = {
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
};

export const NotificationIcon: React.FC<NotificationIconProps> = (props) => (
  <div className={styles.iconContainer}>{renderIcon(props)}</div>
);
