import React from 'react';
import styled from '@emotion/styled';

import { LayoutGrid, Column, ColumnSizes } from '@codecademy/gamut';
import {
  LandingPageSectionCTA,
  LandingPageSectionTitle,
  LandingPageSectionDescription,
  LandingPageFeature,
  LandingPageFeatureProps,
} from './';

const Container = styled.div`
  margin: 2rem;
`;

export type LandingPageFeaturesSectionProps = {
  title?: string;
  /**
    Main body text (can include html)
  */
  desc?: string;
  /**
    Button text
  */
  cta?: string;
  /**
    Url to navigate to when clicking the button
  */
  ctaHref?: string;
  /**
    Array of features, which consist of image, image alt, title, and description
  */
  features: LandingPageFeatureProps[];
  /**
    Used to determine if an icon or a full size image should be rendered
  */
  isIcon?: boolean;
  testId?: string;
};

export const LandingPageFeaturesSection: React.FC<LandingPageFeaturesSectionProps> = ({
  title,
  desc,
  cta,
  ctaHref,
  features,
  isIcon = false,
  testId,
}) => {
  const featureColSize = (12 / features.length) as ColumnSizes;
  return (
    <Container data-testid={testId}>
      <div>
        {title && (
          <LandingPageSectionTitle isPageHeading={false}>
            {title}
          </LandingPageSectionTitle>
        )}
        {desc && <LandingPageSectionDescription text={desc} />}
        {cta && ctaHref && (
          <LandingPageSectionCTA href={ctaHref}>{cta}</LandingPageSectionCTA>
        )}
      </div>
      <LayoutGrid columnGap={{ xs: 'md', lg: 'lg' }}>
        {features.map((feature) => (
          <Column size={{ xs: 12, sm: featureColSize }} key={feature.title}>
            <LandingPageFeature {...feature} isIcon={isIcon} />
          </Column>
        ))}
      </LayoutGrid>
    </Container>
  );
};
