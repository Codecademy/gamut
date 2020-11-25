import React from 'react';
import styled from '@emotion/styled';

import { LayoutGrid, Column } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import { PageSectionCTA, PageSectionTitle, PageSectionDescription } from './';
import { BaseProps } from './types';

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

export type PageHeroProps = BaseProps & {
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
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  desc,
  cta,
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
        <PageSectionTitle isPageHeading={isPageHeading}>
          {title}
        </PageSectionTitle>
      )}
      {desc && <PageSectionDescription text={desc} />}
      {cta?.href && cta?.text && (
        <PageSectionCTA href={cta.href}>{cta.text}</PageSectionCTA>
      )}
    </Column>
    {imgSrc && (
      <RightColumn size={3}>
        <Image src={imgSrc} alt={imgAlt} />
      </RightColumn>
    )}
  </Layout>
);
