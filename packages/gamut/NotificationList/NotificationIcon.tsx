import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Icon from '../Icon';
import iconMap from '../Icon/iconMap';
import s from './styles/NotificationIcon.scss';

interface iconSettings {
  fillColor?: string;
  backgroundColor?: string;
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

const renderIcon = (props: IconProps) => {
  const { iconSettings, iconSlug, imageUrl } = props;

  if(iconSlug) {
    const fillColor = get(iconSettings, 'fillColor');
    const backgroundColor = get(iconSettings, 'backgroundColor');

    const iconStyle = {
      backgroundColor
    };

    return (
      <div className={s.iconComponentContainer} style={iconStyle}>
        <Icon name={iconSlug} className={s.iconImage} fill={fillColor}/>
      </div>
    )
  };

  if(imageUrl) {
    return <img src={imageUrl} className={s.icon}/>;
  }

  return null;
}

const NotificationIcon = (props: IconProps) => (
  <div className={s.iconContainer}>
    {renderIcon(props)}
  </div>
);

NotificationIcon.propTypes = propTypes;

export default NotificationIcon;