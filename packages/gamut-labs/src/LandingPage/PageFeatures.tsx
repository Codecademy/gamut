import {
  Box,
  Column,
  ColumnProps,
  Container,
  LayoutGrid,
} from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { CTA } from './CTA';
import { Description } from './Description';
import {
  Feature,
  FeaturedDescription,
  FeaturedIcon,
  FeaturedImage,
  FeaturedStat,
  FeaturedTitle,
} from './Feature';
import { Title } from './Title';
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
  /* eslint-enable react/no-array-index-key */
};

const gridRenderEach = (
  maxCols: NonNullable<PageFeaturesProps['maxCols']>,
  items: PageFeaturesProps['features'],
  itemRenderer: (item: PageFeaturesProps['features'][0]) => ReactNode
): ReactNode => {
  const size = {
    _: 12,
    sm: 12 / maxCols,
  } as ColumnProps['size'];
  /* eslint-disable react/no-array-index-key */
  return (
    <LayoutGrid columnGap={{ _: 8, sm: 32 }}>
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
    <Box mt={16}>
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
