import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.navy};
  font-size: 1.25rem;
  margin-right: 0.5rem;
  transition: color 250ms ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.hyper};
    text-decoration: none;
  }

  &:focus,
  &:active {
    text-decoration: none;
    outline: none;
  }

  &:focus-visible {
    outline: 0.3rem auto ${({ theme }) => theme.colors.navy};
  }
`;

export const SocialMediaLinks: React.FC = () => {
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

  const icons = media.map(({ label, url, icon: IconComponent }) => (
    <IconLink
      aria-label={label}
      href={url}
      key={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconComponent />
    </IconLink>
  ));

  return <div>{icons}</div>;
};
