import React from 'react';
import styled from '@emotion/styled';

import { LayoutGrid, Column } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import { CTA, Title, Description } from './';
import { BaseProps } from './types';

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
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  desc,
  cta,
  imgSrc,
  imgAlt = '',
  testId,
}) => (
  <LayoutGrid testId={testId}>
    <Column
      size={{
        xs: 12,
        sm: imgSrc ? 9 : 12,
      }}
    >
      {title && <Title isPageHeading>{title}</Title>}
      {desc && <Description text={desc} />}
      {cta && (
        <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
          {cta.text}
        </CTA>
      )}
    </Column>
    {imgSrc && (
      <RightColumn size={3}>
        <Image src={imgSrc} alt={imgAlt} />
      </RightColumn>
    )}
  </LayoutGrid>
);
