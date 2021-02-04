import { VideoProps } from '@codecademy/gamut';
import { Column, LayoutGrid } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CTA, Description, Title } from './';
import { PageHeroMedia } from './PageHeroMedia';
import { BaseProps } from './types';

const LeftColumn = styled(Column)`
  align-content: center;
`;

const SpacerColumn = styled(Column)`
  @media only screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
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

export type PageHeroProps = BaseProps & {
  media?: MediaProps;
};

const columnSize = (type: string | undefined) => {
  if (!type) return 12;
  if (type === 'image') {
    return 8;
  } else if (type === 'video') {
    return 5;
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
  return (
    <LayoutGrid testId={testId} rowGap="md">
      <LeftColumn
        size={{
          xs: 12,
          sm: columnSize(media?.type),
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
      <SpacerColumn size={1} />
      {media && <PageHeroMedia media={media} />}
    </LayoutGrid>
  );
};
