import * as React from 'react';

import {
  MediaColumnsSize,
  PageSingleFeature,
  PageSingleFeatureProps,
} from './PageSingleFeature';

const getMediaWidth = (
  mediaType: 'image' | 'video' | undefined,
  textLength: PageHeroProps['textLength']
): MediaColumnsSize | undefined => {
  if (mediaType === 'video') {
    return 5;
  }
  if (mediaType === 'image') {
    return textLength === 'short' ? 6 : 3;
  }
};

export type PageHeroProps = Omit<
  PageSingleFeatureProps,
  'mediaWidth' | 'hideImageOnMobile' | 'isPageHeading'
> & {
  showImageOnMobile?: boolean;
  textLength?: 'short' | 'long';
};

export const PageHero: React.FC<PageHeroProps> = ({
  showImageOnMobile,
  textLength = 'long',
  ...props
}) => (
  <PageSingleFeature
    {...props}
    isPageHeading
    hideImageOnMobile={!showImageOnMobile}
    mediaWidth={getMediaWidth(props.media?.type, textLength)}
  />
);
