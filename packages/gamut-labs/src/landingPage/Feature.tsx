import React from 'react';
import styled from '@emotion/styled';

import { Heading, Markdown } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';

const Icon = styled.img`
  width: 4rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const StyledMarkdown = styled(Markdown)`
  font-size: 1rem;
`;

const FeatureBlock = styled.div`
  flex: 1;
  ${mediaQueries.sm} {
    &:not(:last-of-type) {
      margin-right: 1rem;

      ${mediaQueries.lg} {
        margin-right: 2rem;
      }
    }
  }
`;

export type PageFeatureProps = {
  /**
   * Whether an icon or a full size image should be rendered
   */
  isIcon?: boolean;

  /**
   * Feature image URL
   */
  imgSrc: string;

  /**
   * Feature image alt text (for screen readers)
   */
  imgAlt: string;

  /**
   * Feature title text
   */
  title?: string;

  /**
   * Feature body text as markdown
   */
  desc?: string;

  testId?: string;
};

export const PageFeature: React.FC<PageFeatureProps> = ({
  isIcon = false,
  imgSrc,
  imgAlt,
  title,
  desc,
  testId,
}) => (
  <FeatureBlock data-testid={testId}>
    {isIcon ? (
      <Icon src={imgSrc} alt={imgAlt} data-testid="feature-icon" />
    ) : (
      <Image src={imgSrc} alt={imgAlt} data-testid="feature-image" />
    )}
    {title && (
      <Heading as="h3" hideMargin fontSize={{ xs: 'sm', sm: 'md' }}>
        {title}
      </Heading>
    )}
    {desc && (
      <div>
        <StyledMarkdown text={desc} />
      </div>
    )}
  </FeatureBlock>
);
