import { Anchor, Box } from '@codecademy/gamut';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@codecademy/gamut-icons';
import * as React from 'react';

import { FooterLinkItems } from '../FooterLinks';

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
  return (
    <FooterLinkItems aria-label="Social Media" pt={16}>
      {media.map(({ label, url, icon: IconComponent }) => (
        <Box as="li" display="inline-block" key={label}>
          <Anchor
            aria-label={label}
            fontSize={20}
            href={url}
            mr={8}
            rel="noopener noreferrer"
            target="_blank"
            variant="interface"
          >
            <IconComponent />
          </Anchor>
        </Box>
      ))}
    </FooterLinkItems>
  );
};
