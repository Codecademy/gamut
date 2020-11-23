import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@codecademy/gamut';
import { mediaQueries, breakpoints } from '@codecademy/gamut-styles';

import {
  LandingPageSectionCTA,
  LandingPageSectionTitle,
  LandingPageSectionDescription,
} from './';

const FlexContainer = styled(Container)`
  margin: 2rem 0;

  ${mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
  }
`;

const Content = styled.div`
  flex-shrink: 1;

  ${mediaQueries.sm} {
    max-width: ${breakpoints.xs};
  }
`;

const CTA = styled(LandingPageSectionCTA)`
  ${mediaQueries.sm} {
    margin: 0 0 0 2rem;
  }
`;

export type PagePrefooterProps = {
  title?: string;
  desc?: string;
  cta?: string;
  ctaHref?: string;
  testId?: string;
};

export const PagePrefooter: React.FC<PagePrefooterProps> = ({
  title,
  desc,
  cta,
  ctaHref,
  testId,
}) => (
  <FlexContainer nowrap column justify="spaceBetween">
    <Content>
      {title && <LandingPageSectionTitle>{title}</LandingPageSectionTitle>}
      {desc && <LandingPageSectionDescription text={desc} />}
    </Content>
    {cta && ctaHref && <CTA href={ctaHref}>{cta}</CTA>}
  </FlexContainer>
);
