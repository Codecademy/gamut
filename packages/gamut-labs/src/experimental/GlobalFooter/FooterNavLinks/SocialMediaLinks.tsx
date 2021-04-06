import { Anchor } from '@codecademy/gamut';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@codecademy/gamut-icons';
import React from 'react';

const media = [
  {
    label: 'Follow us on Twitter',
    url: 'https://twitter.com/Codecademy',
    icon: TwitterIcon,
  },
  {
    label: 'Like us on Facebook',
    url:
      'https://codecademy.com/users/redirect?redirect_url=https://www.facebook.com/groups/codecademy.community',
    icon: FacebookIcon,
  },
  {
    label: 'Follow us on Instagram',
    url: 'https://instagram.com/codecademy',
    icon: InstagramIcon,
  },
  {
    label: 'Subscribe to Codecademy on YouTube',
    url: 'https://www.youtube.com/channel/UC5CMtpogD_P3mOoeiDHD5eQ',
    icon: YoutubeIcon,
  },
];

export const SocialMediaLinks: React.FC = () => {
  const icons = media.map(({ label, url, icon: IconComponent }) => (
    <Anchor
      aria-label={label}
      fontSize={20}
      href={url}
      key={label}
      marginRight={8}
      rel="noopener noreferrer"
      target="_blank"
      variant="interface"
    >
      <IconComponent />
    </Anchor>
  ));

  return <div>{icons}</div>;
};
