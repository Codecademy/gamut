import React from 'react';
import styled from '@emotion/styled';

import { Container } from '@codecademy/gamut';
import {
  LandingPageSectionCTA,
  LandingPageSectionTitle,
  LandingPageSectionDescription,
  LandingPageFeature,
  LandingPageFeatureProps,
} from './';
import { mediaQueries } from '@codecademy/gamut-styles';

const Section = styled.div`
  margin: 2rem;
`;

const FlexContainer = styled(Container)`
  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export type LandingPageFeaturesSectionProps = {
  /**
   * Main title text
   */
  title?: string;

  /**
   * Main body text as markdown
   */
  desc?: string;

  /**
   * Button text
   */
  cta?: string;

  /**
   * Url to navigate to when clicking the button
   */
  ctaHref?: string;

  /**
   * Array of features, which consist of image, image alt, title, and description
   */
  features: Omit<LandingPageFeatureProps, 'isIcon'>[];

  /**
   * Whether an icon or a full size image should be rendered
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
  isIcon,
  testId,
}) => (
  <Section data-testid={testId}>
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
    <FlexContainer nowrap column>
      {features.map((feature) => (
        <LandingPageFeature {...feature} isIcon={isIcon} key={feature.title} />
      ))}
    </FlexContainer>
  </Section>
);
