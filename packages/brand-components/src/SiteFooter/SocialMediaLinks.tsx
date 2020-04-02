import React, { Component } from 'react';
import { Icon } from '@codecademy/gamut';
import s from './styles/SocialMediaLinks.scss';

class SocialMediaLinks extends Component {
  render() {
    const media = [
      {
        label: 'Follow us on Twitter',
        url: 'https://twitter.com/Codecademy',
        icon: 'twitter',
      },
      {
        label: 'Like us on Facebook',
        url:
          'https://codecademy.com/users/redirect?redirect_url=https://www.facebook.com/groups/codecademy.community',
        icon: 'facebook',
      },
      {
        label: 'Follow us on Instagram',
        url: 'https://instagram.com/codecademy',
        icon: 'instagram',
      },
      {
        label: 'Subscribe to Codecademy on YouTube',
        url: 'https://www.youtube.com/channel/UC5CMtpogD_P3mOoeiDHD5eQ',
        icon: 'youtube',
      },
    ];

    const icons = media.map(obj => (
      <a
        aria-label={obj.label}
        className={s.icon}
        href={obj.url}
        key={obj.icon}
      >
        <Icon name={obj.icon} />
      </a>
    ));

    return <div className={s.wrapper}>{icons}</div>;
  }
}

export default SocialMediaLinks;
