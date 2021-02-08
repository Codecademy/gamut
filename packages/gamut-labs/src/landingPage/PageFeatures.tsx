import {
  Box,
  Column,
  ColumnSizes,
  Container,
  LayoutGrid,
  ResponsiveProperty,
} from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import {
  CTA,
  Description,
  Feature,
  FeaturedIcon,
  FeaturedImage,
  FeaturedStat,
  Title,
} from '.';
import { FeaturedDescription, FeaturedTitle } from './Feature';
import { BaseProps } from './types';

const FlexContainer = styled(Container)`
  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export type PageFeaturesProps = BaseProps & {
  maxCols?: 1 | 2 | 3 | 4;
  featuresMedia?: 'image' | 'icon' | 'stat';
  features: {
    title?: string;
    desc?: string;
    imgSrc?: string;
    imgAlt?: string;
    statText?: string;
    testId?: string;
  }[];
};

const rowRenderEach = (
  items: PageFeaturesProps['features'],
  itemRenderer: (item: PageFeaturesProps['features'][0]) => ReactNode
): ReactNode => {
  /* eslint-disable react/no-array-index-key */
  return (
    <FlexContainer nowrap column>
      {items.map((item, i) => (
        <React.Fragment key={i}>{itemRenderer(item)}</React.Fragment>
      ))}
    </FlexContainer>
  );
  /* eslint-ensable react/no-array-index-key */
};

const gridRenderEach = (
  maxCols: NonNullable<PageFeaturesProps['maxCols']>,
  items: PageFeaturesProps['features'],
  itemRenderer: (item: PageFeaturesProps['features'][0]) => ReactNode
): ReactNode => {
  const size = { xs: 12, sm: 12 / maxCols } as ResponsiveProperty<ColumnSizes>;
  /* eslint-disable react/no-array-index-key */
  return (
    <LayoutGrid columnGap={{ lg: 'lg', xs: 'sm' }}>
      {items.map((item, i) => (
        <Column key={i} size={size}>
          {itemRenderer(item)}
        </Column>
      ))}
    </LayoutGrid>
  );
  /* eslint-enable react/no-array-index-key */
};

const renderEach = (
  maxCols: PageFeaturesProps['maxCols'],
  items: PageFeaturesProps['features'],
  itemRenderer: (item: PageFeaturesProps['features'][0]) => ReactNode
): ReactNode => {
  if (maxCols === undefined) {
    return rowRenderEach(items, itemRenderer);
  }
  if (maxCols > 0 && maxCols <= 4) {
    return gridRenderEach(maxCols, items, itemRenderer);
  }
  return null;
};

export const PageFeatures: React.FC<PageFeaturesProps> = ({
  title,
  desc,
  cta,
  maxCols,
  features,
  featuresMedia,
  testId,
  onAnchorClick,
}) => (
  <div data-testid={testId}>
    <div>
      {title && <Title isPageHeading={false}>{title}</Title>}
      {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
      {cta && (
        <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
          {cta.text}
        </CTA>
      )}
    </div>
    <Box marginTop={16}>
      {renderEach(
        maxCols,
        features,
        ({ testId, imgSrc, imgAlt, statText, title: featTitle, desc }) => (
          <Feature testId={testId}>
            {featuresMedia === 'image' && (
              <FeaturedImage src={imgSrc!} alt={imgAlt!} />
            )}
            {featuresMedia === 'icon' && (
              <FeaturedIcon src={imgSrc!} alt={imgAlt!} />
            )}
            {featuresMedia === 'stat' && (
              <FeaturedStat>{statText}</FeaturedStat>
            )}
            {featTitle && (
              <FeaturedTitle as={title ? 'h3' : 'h2'}>
                {featTitle}
              </FeaturedTitle>
            )}
            {desc && (
              <FeaturedDescription desc={desc} onAnchorClick={onAnchorClick} />
            )}
          </Feature>
        )
      )}
    </Box>
  </div>
);
