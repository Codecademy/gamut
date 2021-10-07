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

type ColumnSize = Extract<ColumnProps['size'], number>;
export type MediaColumnsSize = Extract<ColumnSize, 3 | 4 | 5 | 6>;

type ImageProps = {
  src: string;
  alt: string;
};

type MediaProps =
  | ({
      type: 'image';
    } & ImageProps)
  | ({
      type: 'video';
    } & VideoProps);

type Eyebrow = {
  accent?: boolean;
  text: string;
};

export type PageSingleFeatureProps = BaseProps & {
  /**
   * Object containing eyebrow text shown above title and optional accent boolean
   */
  eyebrow?: Eyebrow;
  /**
   * Whether the image should be hidden on mobile. Note that videos are always shown on mobile for accessibility
   */
  hideImageOnMobile?: boolean;
  /**
   * If the heading is the page h1 heading or a smaller heading
   */
  isPageHeading?: boolean;
  /**
   * Whether to show an image or a video, with the associated props to do so
   */
  media?: MediaProps;
  /**
   * Number of columns out of 12 that the media should take up, defaults to 6. The remaining columns will be used for the text
   */
  mediaWidth?: MediaColumnsSize;
};

export const PageSingleFeature: React.FC<PageSingleFeatureProps> = ({
  cta,
  desc,
  eyebrow,
  hideImageOnMobile,
  isPageHeading,
  media,
  mediaWidth = 6,
  onAnchorClick,
  testId,
  title,
}) => {
  const primaryContent = (
    <>
      {title && (
        <Title isPageHeading={isPageHeading}>
          {eyebrow && (
            <Text
              fontSize={{ _: 20, sm: 22 }}
              fontFamily="accent"
              mb={16}
              display="block"
              color={eyebrow.accent ? 'blue' : undefined}
            >
              {eyebrow.text}
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
            onClick={cta.onClick}
            buttonType={cta.buttonType}
          >
            {cta.text}
          </CTA>
        </Box>
      )}
    </>
  );

  if (!media) {
    return <div data-testid={testId}>{primaryContent}</div>;
  }

  const textWidth = (12 - mediaWidth) as ColumnSize;

  return (
    <LayoutGrid data-testid={testId} rowGap={16} columnGap={{ _: 8, sm: 32 }}>
      <Column size={{ sm: textWidth }} alignContent="flex-start">
        {primaryContent}
      </Column>
      <Column
        size={{ sm: mediaWidth }}
        gridRowStart={{ _: hideImageOnMobile ? 'initial' : 1, sm: 'initial' }}
        alignContent="flex-start"
      >
        {media.type === 'image' && (
          <Image
            {...media}
            width={1}
            display={{
              _: hideImageOnMobile ? 'none' : 'initial',
              sm: 'initial',
            }}
          />
        )}
        {media.type === 'video' && <Video {...media} />}
      </Column>
    </LayoutGrid>
  );
};
