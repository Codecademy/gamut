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

type FeaturedImageProps = {
  featuresMedia: 'image';
  imgSrc: string;
  imgAlt: string;
};

type FeaturedIconProps = {
  featuresMedia: 'icon';
  imgSrc: string;
  imgAlt: string;
};

type FeaturedStatProps = {
  featuresMedia: 'stat';
  statText: string;
};

type FeaturedNoMediaProps = {
  featuresMedia: 'none';
};

type FeaturedMediaProps =
  | FeaturedImageProps
  | FeaturedIconProps
  | FeaturedStatProps
  | FeaturedNoMediaProps;

const FeaturedMedia: React.FC<FeaturedMediaProps> = (props) => {
  if (props.featuresMedia === 'image') {
    return (
      <Image
        src={props.imgSrc}
        alt={props.imgAlt}
        data-testid="feature-image"
      />
    );
  }

  if (props.featuresMedia === 'icon') {
    return (
      <Icon src={props.imgSrc} alt={props.imgAlt} data-testid="feature-icon" />
    );
  }

  if (props.featuresMedia === 'stat') {
    return (
      <Text
        as="div"
        marginTop={48}
        fontSize={{ xs: 44, lg: 64 }}
        fontWeight="title"
        data-testid="feature-stat"
      >
        {props.statText}
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
  title,
  desc,
  onAnchorClick,
  testId,
  ...featuredMediaProps
}) => (
  <FeatureBlock data-testid={testId}>
    <FeaturedMedia {...featuredMediaProps} />
    {title && (
      <Text as="h3" fontSize={{ xs: 22, lg: 26 }} fontWeight="title">
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
