import { Box, Markdown, Text } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { BaseProps } from './types';

const Img = styled.img`
  margin-bottom: 2rem;
`;
export type FeaturedImageProps = {
  src: string;
  alt: string;
};
export const FeaturedImage: React.FC<FeaturedImageProps> = ({ src, alt }) => (
  <Img alt={alt} src={src} width="100%" data-testid="feature-image" />
);

export type FeaturedIconProps = {
  src: string;
  alt: string;
};
export const FeaturedIcon: React.FC<FeaturedIconProps> = ({ src, alt }) => (
  <Img alt={alt} src={src} width="64px" data-testid="feature-icon" />
);

export const FeaturedStat: React.FC = ({ children }) => (
  <Text
    as="div"
    variant="title-xxl"
    fontSize={{ _: 44, lg: 64 }}
    data-testid="feature-stat"
  >
    {children}
  </Text>
);

export type FeaturedTitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
export const FeaturedTitle: React.FC<FeaturedTitleProps> = ({
  as,
  children,
}) => (
  <Text as={as || 'h3'} fontSize={{ _: 22, lg: 26 }}>
    {children}
  </Text>
);

const StyledMarkdown = styled(Markdown)`
  ul,
  ol {
    padding: 0;
    list-style-position: inside;
  }
`;
export type FeaturedDescriptionProps = Pick<
  BaseProps,
  'desc' | 'onAnchorClick'
>;
export const FeaturedDescription: React.FC<FeaturedDescriptionProps> = ({
  desc,
  onAnchorClick,
}) => (
  <Box textColor="navy">
    <StyledMarkdown text={desc} spacing="none" onAnchorClick={onAnchorClick} />
  </Box>
);

const FeatureBlock = styled.div`
  flex: 1;
  margin-top: 2rem;
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
  testId?: string;
};
export const Feature: React.FC<FeatureProps> = ({ testId, children }) => (
  <FeatureBlock data-testid={testId}>{children}</FeatureBlock>
);
