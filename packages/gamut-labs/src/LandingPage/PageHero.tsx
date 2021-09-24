import {
  Box,
  Column,
  ColumnProps,
  LayoutGrid,
  Video,
  VideoProps,
} from '@codecademy/gamut';
import React from 'react';

import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
import { BaseProps } from './types';

const Image = Box.withComponent('img');

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

type ColumnLayout = {
  left: Extract<ColumnProps['size'], number>;
  right: Extract<ColumnProps['size'], number>;
};

export type PageHeroProps = BaseProps & {
  media?: MediaProps;
  textLength: 'short' | 'long';
  showImageOnMobile?: boolean;
  isSubheader?: boolean;
};

const getColumnLayout = (
  mediaType: 'image' | 'video' | undefined,
  textLength: PageHeroProps['textLength']
): ColumnLayout => {
  if (mediaType === 'video') {
    return {
      left: 7,
      right: 5,
    };
  }
  if (mediaType === 'image') {
    switch (textLength) {
      case 'long':
        return {
          left: 9,
          right: 3,
        };
      case 'short':
        return {
          left: 6,
          right: 6,
        };
    }
  }
  return {
    left: 12,
    right: 12,
  };
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  desc,
  cta,
  media,
  textLength,
  showImageOnMobile,
  isSubheader,
  testId,
  onAnchorClick,
}) => {
  const { right, left } = getColumnLayout(media?.type, textLength);

  return (
    <LayoutGrid data-testid={testId} rowGap={16} columnGap={{ _: 8, sm: 32 }}>
      <Column size={{ sm: left }} alignContent="flex-start">
        {title && <Title isPageHeading={!isSubheader}>{title}</Title>}
        {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
        {cta && (
          <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
            {cta.text}
          </CTA>
        )}
      </Column>
      {media && (
        <Column
          size={{ sm: right }}
          gridRowStart={showImageOnMobile ? { _: 1, sm: 'initial' } : undefined}
        >
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt}
              width={1}
              display={
                showImageOnMobile ? undefined : { _: 'none', sm: 'initial' }
              }
            />
          ) : (
            <Video {...media} />
          )}
        </Column>
      )}
    </LayoutGrid>
  );
};
