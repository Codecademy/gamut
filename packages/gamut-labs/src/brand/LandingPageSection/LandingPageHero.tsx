import React from 'react';
import styled from '@emotion/styled';

import { LayoutGrid, Column } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import {
  LandingPageSectionCTA,
  LandingPageSectionTitle,
  LandingPageSectionDescription,
} from './';

const Layout = styled(LayoutGrid)`
  padding: 0 2rem;
  margin: 2rem 0;
`;

const RightColumn = styled(Column)`
  margin-left: 1rem;

  @media only screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
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
}) => (
  <Layout>
    <Column
      size={{
        xs: 12,
        sm: imgSrc ? 9 : 12,
      }}
    >
      {title && (
        <LandingPageSectionTitle isPageHeading testId={`${testId}-title`}>
          {title}
        </LandingPageSectionTitle>
      )}
      {desc && (
        <LandingPageSectionDescription text={desc} testId={`${testId}-desc`} />
      )}
      {cta && ctaHref && (
        <LandingPageSectionCTA href={ctaHref} testId={`${testId}-cta`}>
          {cta}
        </LandingPageSectionCTA>
      )}
    </Column>
    {imgSrc && (
      <RightColumn size={3} testId={`${testId}-img`}>
        <Image src={imgSrc} alt={imgAlt} />
      </RightColumn>
    )}
  </Layout>
);
