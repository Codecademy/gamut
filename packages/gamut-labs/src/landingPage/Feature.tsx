import { Heading, Markdown } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { BaseProps } from './types';

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
  margin: 1rem 0 0;
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

export type FeatureProps = {
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
  imgAlt?: string;
} & Pick<BaseProps, 'title' | 'desc' | 'onAnchorClick' | 'testId'>;

export const Feature: React.FC<FeatureProps> = ({
  isIcon,
  imgSrc,
  imgAlt = '',
  title,
  desc,
  onAnchorClick,
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
        <StyledMarkdown text={desc} onAnchorClick={onAnchorClick} />
      </div>
    )}
  </FeatureBlock>
);
