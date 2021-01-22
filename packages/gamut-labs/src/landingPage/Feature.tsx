import { Markdown } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Text } from '../experimental/Text';
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

type FeaturedMediaProps = {
  featuresMedia?: 'image' | 'icon' | 'stat' | 'none';
  imgSrc: string;
  imgAlt?: string;
  statText?: string;
};

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({
  featuresMedia = 'none',
  ...rest
}) => {
  if (featuresMedia === 'image') {
    return (
      <Image src={rest.imgSrc} alt={rest.imgAlt} data-testid="feature-image" />
    );
  }

  if (featuresMedia === 'icon') {
    return (
      <Icon src={rest.imgSrc} alt={rest.imgAlt} data-testid="feature-icon" />
    );
  }

  if (featuresMedia === 'stat') {
    return (
      <Text
        as="div"
        marginTop={48}
        fontSize={{ xs: 44, lg: 64 }}
        data-testid="feature-stat"
      >
        {rest.statText}
      </Text>
    );
  }

  return null;
};

export type FeatureProps = Pick<
  BaseProps,
  'title' | 'desc' | 'onAnchorClick' | 'testId'
> &
  FeaturedMediaProps;

export const Feature: React.FC<FeatureProps> = ({
  featuresMedia,
  imgSrc,
  imgAlt = '',
  statText,
  title,
  desc,
  onAnchorClick,
  testId,
}) => (
  <FeatureBlock data-testid={testId}>
    <FeaturedMedia
      featuresMedia={featuresMedia}
      imgSrc={imgSrc}
      imgAlt={imgAlt}
      statText={statText}
    />
    {title && (
      <Text as="h3" fontSize={{ xs: 22, lg: 26 }}>
        {title}
      </Text>
    )}
    {desc && (
      <div>
        <StyledMarkdown text={desc} onAnchorClick={onAnchorClick} />
      </div>
    )}
  </FeatureBlock>
);
