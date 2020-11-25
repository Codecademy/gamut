import React from 'react';
import styled from '@emotion/styled';

import { Container } from '@codecademy/gamut';
import {
  PageSectionCTA,
  PageSectionTitle,
  PageSectionDescription,
  PageFeature,
  PageFeatureProps,
} from './';
import { mediaQueries } from '@codecademy/gamut-styles';
import { BaseProps } from './types';

const Section = styled.div`
  margin: 2rem;
`;

const FlexContainer = styled(Container)`
  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export type PageFeaturesSectionProps = BaseProps & {
  /**
   * Array of features, which consist of image, image alt, title, and description
   */
  features: Omit<PageFeatureProps, 'isIcon'>[];

  /**
   * Whether an icon or a full size image should be rendered
   */
  isIcon?: boolean;
};

export const PageFeaturesSection: React.FC<PageFeaturesSectionProps> = ({
  title,
  desc,
  cta,
  features,
  isIcon,
  testId,
}) => (
  <Section data-testid={testId}>
    <div>
      {title && (
        <PageSectionTitle isPageHeading={false}>{title}</PageSectionTitle>
      )}
      {desc && <PageSectionDescription text={desc} />}
      {cta?.href && cta?.text && (
        <PageSectionCTA href={cta.href}>{cta.text}</PageSectionCTA>
      )}
    </div>
    <FlexContainer nowrap column>
      {features.map((feature) => (
        <PageFeature {...feature} isIcon={isIcon} key={feature.title} />
      ))}
    </FlexContainer>
  </Section>
);
