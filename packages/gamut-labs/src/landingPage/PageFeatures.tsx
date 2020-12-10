import React from 'react';
import styled from '@emotion/styled';

import { Container } from '@codecademy/gamut';
import {
  CTA,
  Title,
  Description,
  DescriptionContainer,
  Feature,
  FeatureProps,
} from './index';
import { mediaQueries } from '@codecademy/gamut-styles';
import { BaseProps } from './types';

const FlexContainer = styled(Container)`
  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export type PageFeaturesProps = BaseProps & {
  /**
   * Array of features, which consist of image, image alt, title, and description
   */
  features: Pick<
    FeatureProps,
    'imgSrc' | 'imgAlt' | 'title' | 'desc' | 'testId'
  >[];

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
  onMarkdownLinkClick,
}) => (
  <div data-testid={testId}>
    <div>
      {title && <Title isPageHeading={false}>{title}</Title>}
      {desc && (
        <DescriptionContainer data-testid={`${testId}-description`}>
          <Description text={desc} onMarkdownLinkClick={onMarkdownLinkClick} />
        </DescriptionContainer>
      )}
      {cta && (
        <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
          {cta.text}
        </CTA>
      )}
    </div>
    <FlexContainer nowrap column>
      {features.map((feature) => (
        <Feature
          {...feature}
          isIcon={isIcon}
          key={feature.title}
          onMarkdownLinkClick={onMarkdownLinkClick}
        />
      ))}
    </FlexContainer>
  </div>
);
