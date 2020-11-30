import React from 'react';
import styled from '@emotion/styled';

import { Container } from '@codecademy/gamut';
import { CTA, Title, Description, Feature, FeatureProps } from './';
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

export type PageFeaturesProps = BaseProps & {
  /**
   * Array of features, which consist of image, image alt, title, and description
   */
  features: Omit<FeatureProps, 'isIcon'>[];

  /**
   * Whether an icon or a full size image should be rendered
   */
  isIcon?: boolean;
};

export const PageFeatures: React.FC<PageFeaturesProps> = ({
  title,
  desc,
  cta,
  features,
  isIcon,
  testId,
}) => (
  <Section data-testid={testId}>
    <div>
      {title && <Title isPageHeading={false}>{title}</Title>}
      {desc && <Description text={desc} />}
      {cta && <CTA href={cta.href}>{cta.text}</CTA>}
    </div>
    <FlexContainer nowrap column>
      {features.map((feature) => (
        <Feature {...feature} isIcon={isIcon} key={feature.title} />
      ))}
    </FlexContainer>
  </Section>
);
