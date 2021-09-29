import { ColumnProps, VideoProps } from '@codecademy/gamut';
import React from 'react';

import { PageSingleFeature, PageSingleFeatureProps } from './PageSingleFeature';

export type ImageProps = {
  src: string;
  alt: string;
};

export type MediaProps =
  | ({
      type: 'image';
    } & ImageProps)
  | ({
      type: 'video';
    } & VideoProps);

export type PageHeroProps = Omit<
  PageSingleFeatureProps,
  'mediaWidth' | 'hideMediaOnMobile' | 'hasPageHeading'
> & {
  showImageOnMobile?: boolean;
  textLength?: 'short' | 'long';
};

export const PageHero: React.FC<PageHeroProps> = ({
  showImageOnMobile,
  textLength = 'long',
  ...props
}) => {
  const { media } = props;
  let mediaWidth: Extract<ColumnProps['size'], number> = 12;
  if (media && media.type === 'video') {
    mediaWidth = 5;
  }
  if (media && media.type === 'image') {
    mediaWidth = textLength === 'short' ? 6 : 3;
  }
  return (
    <PageSingleFeature
      {...props}
      hasPageHeading
      hideMediaOnMobile={!showImageOnMobile}
      mediaWidth={mediaWidth}
    />
  );
};
