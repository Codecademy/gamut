import {
  Box,
  Column,
  ColumnProps,
  LayoutGrid,
  Text,
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
  /**
   * Whether to show an image or a video, with the associated props to do so
   */
  media?: MediaProps;
  /**
   * Eyebrow text shown above title
   */
  eyebrow?: string;
  textLength?: 'short' | 'long';
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
      case 'short':
        return {
          left: 6,
          right: 6,
        };
      case 'long':
      default:
        return {
          left: 9,
          right: 3,
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
  eyebrow,
  testId,
  textLength = 'long',
  onAnchorClick,
}) => {
  const { right, left } = getColumnLayout(media?.type, textLength);

  return (
    <LayoutGrid data-testid={testId} rowGap={16} columnGap={{ _: 8, sm: 32 }}>
      <Column size={{ sm: left }} alignContent="flex-start">
        {title && (
          <Title isPageHeading>
            {eyebrow && (
              <Text
                fontSize={{ _: 20, sm: 22 }}
                fontFamily="accent"
                mb={16}
                display="block"
              >
                {eyebrow}
              </Text>
            )}
            {title}
          </Title>
        )}
        {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
        {cta && (
          <Box mt={32}>
            <CTA
              href={cta.href}
              onCtaButtonClick={cta.onClick}
              buttonType={cta.buttonType}
            >
              {cta.text}
            </CTA>
          </Box>
        )}
      </Column>
      {media && (
        <Column size={{ sm: right }}>
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt}
              width={1}
              display={{ _: 'none', sm: 'initial' }}
            />
          ) : (
            <Video {...media} />
          )}
        </Column>
      )}
    </LayoutGrid>
  );
};
