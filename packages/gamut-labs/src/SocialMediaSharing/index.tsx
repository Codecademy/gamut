import { Box, FlexBox, Text } from '@codecademy/gamut';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@codecademy/gamut-icons';
import React from 'react';

import { SocialShareIconLink } from './SocialShareIconLink';

export type SocialMediaShare = {
  url: string;
  message?: string;
  hashtags?: string[];
  mention?: string;
};

export const shareLinkCreator = (
  formatter: (payload: SocialMediaShare) => Record<string, string>,
  baseUri: string
) => (payload: SocialMediaShare) => {
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

type SocialMediaSharingProps = {
  url: string;
  message?: string;
  hashtags?: string[];
  mention?: string;
  action?: (e: React.MouseEvent, target: string) => void;
  label?: string;
  small?: boolean;
  sectionId?: string;
  white?: boolean;
  iconStyles?: string;
};

export const SocialMediaSharing: React.FC<SocialMediaSharingProps> = ({
  url,
  message,
  hashtags,
  mention,
  action,
  label,
  small,
  sectionId,
  white,
  iconStyles,
}) => (
  <Box display="inline-flex" flexDirection="column" textAlign="center">
    {label && (
      <Text
        fontSize={small ? 14 : 16}
        textColor="gray-900"
        mb={16}
        data-testid="social-sharing-label"
      >
        {label}
      </Text>
    )}
    <FlexBox justifyContent="center" className={iconStyles}>
      {SOCIAL_SHARING_PLATFORMS.map(({ id, icon, formatShare, baseUrl }) => (
        <SocialShareIconLink
          key={id}
          id={id}
          sectionId={sectionId}
          href={shareLinkCreator(
            formatShare,
            baseUrl
          )({
            url,
            message,
            hashtags,
            mention,
          })}
          icon={icon}
          small={small}
          track={(e) => action?.(e, `${id}_share`)}
          white={white}
        />
      ))}
    </FlexBox>
  </Box>
);
