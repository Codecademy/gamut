import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Icon from '../Icon';
import { NotificationImage } from './typings';
import s from './styles/NotificationIcon.scss';

const propTypes = {
  iconSettings: PropTypes.object,
  iconSlug: PropTypes.string,
  imageUrl: PropTypes.string,
};

const renderIcon = (props: NotificationImage) => {
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
    return <img src={imageUrl} className={s.icon} alt=''/>;
}

  return null;
}

const NotificationIcon = (props: NotificationImage) => (
  <div className={s.iconContainer}>
    {renderIcon(props)}
  </div>
);

NotificationIcon.propTypes = propTypes;

export default NotificationIcon;