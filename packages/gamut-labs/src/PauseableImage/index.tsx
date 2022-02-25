import { Box } from '@codecademy/gamut';
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

export const PauseableImage: React.FC<PauseableImageProps> = (props) => {
  const staticImage = <StaticImage {...props} />;

  const image = props.src?.endsWith('.gif') ? (
    <BaseImage {...props} fallback={staticImage} />
  ) : (
    staticImage
  );

  return <Box>{image}</Box>;
};
