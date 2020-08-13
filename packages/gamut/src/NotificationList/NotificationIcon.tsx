import React from 'react';
import { get } from 'lodash';
import { Icon } from '../deprecated/Icon';
import { NotificationIconSettings } from './typings';
import { iconMap } from '../deprecated/Icon/iconMap';
import s from './styles/NotificationIcon.module.scss';

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
      <div className={s.iconComponentContainer} style={iconStyle}>
        <Icon name={iconSlug} className={s.iconImage} />
      </div>
    );
  }

  if (imageUrl) {
    return <img src={imageUrl} className={s.icon} alt="" />;
  }

  return null;
};

export type NotificationIconProps = {
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
};

export const NotificationIcon: React.FC<NotificationIconProps> = (props) => (
  <div className={s.iconContainer}>{renderIcon(props)}</div>
);
