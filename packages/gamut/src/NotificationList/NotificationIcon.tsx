import React from 'react';
import { get } from 'lodash';
import Icon from '../Icon';
import { NotificationIconSettings } from './typings';
import iconMap from '../Icon/iconMap';
import s from './styles/NotificationIcon.scss';

const renderIcon = (props: NotificationImage) => {
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

type NotificationImage = {
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
};

const NotificationIcon = (props: NotificationImage) => (
  <div className={s.iconContainer}>{renderIcon(props)}</div>
);

export default NotificationIcon;
