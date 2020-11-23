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
   * Main body text (can include markdown)
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
   * Hero image URL
   */
  imgSrc?: string;
  /**
   * Hero image alt text (for screen readers)
   */
  imgAlt?: string;
  /**
   * True if this is the semantic page heading (h1)
   */
  isPageHeading?: boolean;
  testId?: string;
};

export const LandingPageHero: React.FC<LandingPageHeroProps> = ({
  title,
  desc,
  cta,
  ctaHref,
  imgSrc,
  imgAlt = '',
  isPageHeading,
  testId,
}) => (
  <Layout testId={testId}>
    <Column
      size={{
        xs: 12,
        sm: imgSrc ? 9 : 12,
      }}
    >
      {title && (
        <LandingPageSectionTitle isPageHeading={isPageHeading}>
          {title}
        </LandingPageSectionTitle>
      )}
      {desc && <LandingPageSectionDescription text={desc} />}
      {cta && ctaHref && (
        <LandingPageSectionCTA href={ctaHref}>{cta}</LandingPageSectionCTA>
      )}
    </Column>
    {imgSrc && (
      <RightColumn size={3}>
        <Image src={imgSrc} alt={imgAlt} />
      </RightColumn>
    )}
  </Layout>
);
