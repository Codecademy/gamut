import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Icon from '../Icon';
import iconMap from '../Icon/iconMap';
import s from './styles/NotificationIcon.scss';

interface iconSettings {
  fillColor: string;
  backgroundColor: string;
}

const propTypes = {
  iconSettings: PropTypes.object,
  iconSlug: PropTypes.oneOf(Object.keys(iconMap)),
  imageUrl: PropTypes.string,
};

export type IconProps = {
  iconSettings?: iconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
};

const NotificationIcon = (props: IconProps) => {
  const { iconSettings, iconSlug, imageUrl } = props;
  const fillColor = get(iconSettings, 'fillColor');
  const backgroundColor = get(iconSettings, 'backgroundColor');

  const iconStyle = {
    backgroundColor
  };

  return (
    iconSlug ? (
      <div className={s.iconContainer} style={iconStyle}>
        <Icon name={iconSlug} className={s.iconImage} fill={fillColor}/>
      </div>
    ) : (
      <img src={imageUrl} className={s.icon}/>
    )    
  );
}

NotificationIcon.propTypes = propTypes;

export default NotificationIcon;