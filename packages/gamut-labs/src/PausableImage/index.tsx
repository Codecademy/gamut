import styled from '@emotion/styled';
import loadable from '@loadable/component';
import React from 'react';

import { imageStyles } from './BaseImage/styles';

const BaseImage = loadable(() => import('./BaseImage'), {
  ssr: false,
});

interface PauseableImageProps {
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

export const PausableImage: React.FC<PauseableImageProps> = (props) => {
  const staticImage = <StaticImage {...props} />;

  return (
    <>
      {props.src?.endsWith('.gif') ? (
        <BaseImage {...props} fallback={staticImage} />
      ) : (
        staticImage
      )}
    </>
  );
};
