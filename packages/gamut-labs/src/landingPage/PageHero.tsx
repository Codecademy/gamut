import { Column, ColumnSizes, LayoutGrid, VideoProps } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { CTA, Description, Title } from '.';
import { PageHeroMedia } from './PageHeroMedia';
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
  left: ColumnSizes;
  right: ColumnSizes;
};

export type PageHeroProps = BaseProps & {
  media?: MediaProps;
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
  testId,
  onAnchorClick,
}) => {
  const layout = getColumnLayout(media);

  return (
    <LayoutGrid testId={testId} rowGap="md" columnGap={{ xs: 'sm', sm: 'lg' }}>
      <LeftColumn
        size={{
          xs: 12,
          sm: layout.left,
        }}
      >
        {title && <Title isPageHeading>{title}</Title>}
        {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
        {cta && (
          <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
            {cta.text}
          </CTA>
        )}
      </LeftColumn>
      {media && <PageHeroMedia media={media} size={layout.right} />}
    </LayoutGrid>
  );
};
