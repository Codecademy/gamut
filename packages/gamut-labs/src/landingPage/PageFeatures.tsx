import {
  Column,
  ColumnSizes,
  Container,
  LayoutGrid,
  ResponsiveProperty,
} from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { CTA, Description, Feature, FeatureProps, Title } from '.';
import { BaseProps } from './types';

const FlexContainer = styled(Container)`
  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export type PageFeaturesProps = BaseProps & {
  maxCols?: 1 | 2 | 3 | 4;

  /**
   * Array of features, which consist of image, image alt, title, and description
   */
  features: Omit<FeatureProps, 'featuresMedia' | 'onAnchorClick'>[];

  /**
   * @deprecated - Whether an icon or a full size image should be rendered
   */
  isIcon?: boolean;

  /**
   * The primary visual element.
   */
  featuresMedia?: 'image' | 'icon' | 'stat' | 'none';
};

const rowRenderEach = (
  items: FeatureProps[],
  itemRenderer: (item: FeatureProps) => ReactNode
): ReactNode => (
  <FlexContainer nowrap column>
    {items.map(itemRenderer)}
  </FlexContainer>
);

const gridRenderEach = (
  maxCols: NonNullable<PageFeaturesProps['maxCols']>,
  items: FeatureProps[],
  itemRenderer: (item: FeatureProps) => ReactNode
): ReactNode => {
  const size = { xs: 12, sm: 12 / maxCols } as ResponsiveProperty<ColumnSizes>;
  /* eslint-disable react/no-array-index-key */
  return (
    <LayoutGrid
      columnGap={{ lg: 'lg', xs: 'sm' }}
      rowGap={{ lg: 'lg', xs: 'sm' }}
    >
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
  items: FeatureProps[],
  itemRenderer: (item: FeatureProps) => ReactNode
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
  isIcon,
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
    {renderEach(
      maxCols,
      features.map((feature) => ({
        ...feature,
        featuresMedia: featuresMedia || (isIcon ? 'icon' : 'image'),
        onAnchorClick,
      })) as FeatureProps[],
      (feature) => (
        <Feature key={feature.title} {...feature} />
      )
    )}
  </div>
);
