import React from 'react';
import styled from '@emotion/styled';

import { breakpoints } from '@codecademy/gamut-styles';
import {
  LandingPageSectionCTA,
  LandingPageSectionTitle,
  LandingPageSectionDescription,
} from './';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 2rem;
  margin: 2rem 0;
`;

const Content = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 16.6%; // 2 columns in a 12 column layout
  margin-left: 1rem;

  @media only screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

export type LandingPageHeroProps = {
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
    Hero image URL
  */
  imgSrc?: string;
  /**
    Hero image alt text (for screen readers)
  */
  imgAlt?: string;
  testId?: string;
};

export const LandingPageHero: React.FC<LandingPageHeroProps> = ({
  title,
  desc,
  cta,
  ctaHref,
  imgSrc,
  imgAlt,
  testId,
}) => {
  const hasImage = !!imgSrc;

  return (
    <Container>
      <Content>
        {title && (
          <LandingPageSectionTitle isPageHeading testId={`${testId}-title`}>
            {title}
          </LandingPageSectionTitle>
        )}
        {desc && (
          <LandingPageSectionDescription
            text={desc}
            testId={`${testId}-desc`}
          />
        )}
        {cta && ctaHref && (
          <LandingPageSectionCTA href={ctaHref} testId={`${testId}-cta`}>
            {cta}
          </LandingPageSectionCTA>
        )}
      </Content>
      {hasImage && <Image src={imgSrc} alt={imgAlt} />}
    </Container>
  );
};
