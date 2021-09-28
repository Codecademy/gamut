import {
  Box,
  Column,
  ColumnProps,
  LayoutGrid,
  Text,
  VideoProps,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { CTA } from './CTA';
import { Description } from './Description';
import { PageHeroMedia } from './PageHeroMedia';
import { Title } from './Title';
import { BaseProps } from './types';

const LeftColumn = styled(Column)`
  align-content: center;
`;

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
};

const getColumnLayout = (media: MediaProps | undefined): ColumnLayout => {
  switch (media?.type) {
    case 'image':
      return {
        left: 9,
        right: 3,
      };
    case 'video':
      return {
        left: 7,
        right: 5,
      };
    default:
      return {
        left: 12,
        right: 12,
      };
  }
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  desc,
  cta,
  media,
  eyebrow,
  testId,
  onAnchorClick,
}) => {
  const { right, left } = getColumnLayout(media);

  return (
    <LayoutGrid data-testid={testId} rowGap={16} columnGap={{ _: 8, sm: 32 }}>
      <LeftColumn
        size={{
          _: 12,
          sm: left,
        }}
      >
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
      </LeftColumn>
      {media && <PageHeroMedia media={media} size={right} />}
    </LayoutGrid>
  );
};
