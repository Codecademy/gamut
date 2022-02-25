import { Box } from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import loadable from '@loadable/component';
import React from 'react';

import { imageStyles } from './BaseImage/styles';

const BaseImage = loadable(() => import('./BaseImage'), {
  ssr: false,
});

export interface PauseableImageProps {
  src: string;
  alt?: string;
}

const StaticImage = styled.img`
  ${imageStyles}

  // SVGs that don't specify their <svg> element height and width default to very small
    &[src$=".svg"] {
    width: 100%;
  }
`;

const imageProps = variance.compose(
  system.positioning,
  system.space,
  system.shadow,
  system.border,
  system.background,
  system.typography
);

export interface PauseableImageStyleProps
  extends StyleProps<typeof imageProps>,
    PauseableImageProps {}

export const PauseableImage: React.FC<PauseableImageStyleProps> = ({
  src,
  alt,
  ...rest
}) => {
  const staticImage = <StaticImage src={src} alt={alt} />;

  return (
    <Box {...rest}>
      {src?.endsWith('.gif') ? (
        <BaseImage src={src} alt={alt} fallback={staticImage} />
      ) : (
        staticImage
      )}
    </Box>
  );
};
