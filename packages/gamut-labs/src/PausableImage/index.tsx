import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

const BaseImage = React.lazy(() => import('./BaseImage'));

interface PauseableImageProps {
  src: string;
  alt: string;
}
export const imageStyles = styled.img(
  css({
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    '&[src$=".svg"]': {
      width: '100%',
    },
  })
);

const StaticImage = imageStyles;

export const PausableImage: React.FC<PauseableImageProps> = (props) => {
  const staticImage = <StaticImage {...props} />;

  return (
    <>{props.src?.endsWith('.gif') ? <BaseImage {...props} /> : staticImage}</>
  );
};
