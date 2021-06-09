import { Box, GridBox, Text } from '@codecademy/gamut';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@codecademy/gamut-icons';
import React from 'react';

import type { BaseSocialShareProps } from './SocialShareIconLink';
import { SocialShareIconLink } from './SocialShareIconLink';

export type SocialMediaShare = {
  url: string;
  message?: string;
  hashtags?: string[];
  mention?: string;
};

export const createShareLink = (
  formatter: (payload: SocialMediaShare) => Record<string, string>,
  baseUri: string,
  payload: SocialMediaShare
) => {
  const params = formatter(payload);
  const url = new URL(baseUri);

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return url.toString();
};

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
// https://developers.facebook.com/docs/sharing/reference/share-dialog
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin/consumer/context#create-an-article-or-url-share
export const SOCIAL_SHARING_PLATFORMS = [
  {
    id: 'facebook',
    icon: FacebookIcon,
    baseUrl: 'https://www.facebook.com/dialog/share?app_id=212500508799908',
    formatShare: ({ url, message }: SocialMediaShare) => ({
      ...(url && { href: url }),
      ...(message && { quote: message }),
      hashtag: '#codecademy',
    }),
  },
  {
    id: 'twitter',
    icon: TwitterIcon,
    baseUrl: 'https://twitter.com/intent/tweet?',
    formatShare: ({ url, message, hashtags, mention }: SocialMediaShare) => ({
      ...(url && { url }),
      ...(message && { text: message }),
      ...(hashtags && { hashtags: hashtags.join(',') }),
      ...(mention && { via: mention }),
    }),
  },
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    baseUrl: 'https://www.linkedin.com/shareArticle',
    formatShare: ({ url }: SocialMediaShare) => ({ url }),
  },
];

export type SocialMediaSharingProps = BaseSocialShareProps & {
  url: string;
  message?: string;
  hashtags?: string[];
  mention?: string;
  action?: (e: React.MouseEvent, target: string) => void;
  label?: string;
  iconStyles?: string;
};

export const SocialMediaSharing: React.FC<SocialMediaSharingProps> = ({
  url,
  message,
  hashtags,
  mention,
  action,
  label,
  sectionId,
  size = 'normal',
  variant = 'black',
  iconStyles,
}) => (
  <Box display="inline-flex" flexDirection="column" alignItems="center">
    {label && (
      <Text
        fontSize={size === 'small' ? 14 : 16}
        textColor="gray-900"
        mb={16}
        data-testid="social-sharing-label"
      >
        {label}
      </Text>
    )}
    <GridBox
      gridAutoColumns="max-content"
      gridAutoFlow="column"
      gap={16}
      className={iconStyles}
    >
      {SOCIAL_SHARING_PLATFORMS.map(({ id, icon, formatShare, baseUrl }) => (
        <SocialShareIconLink
          key={id}
          id={id}
          sectionId={sectionId}
          href={createShareLink(formatShare, baseUrl, {
            url,
            message,
            hashtags,
            mention,
          })}
          icon={icon}
          size={size}
          onClick={(e) => action?.(e, `${id}_share`)}
          variant={variant}
        />
      ))}
    </GridBox>
  </Box>
);
