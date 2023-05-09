import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

const BaseImage = React.lazy(() => import('./BaseImage'));

export interface PauseableImageProps {
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

  // Avoid rendering React.Suspense on the server until it's fully supported by React & our applications
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && props.src?.endsWith('.gif') ? (
        <React.Suspense fallback={staticImage}>
          <BaseImage {...props} />
        </React.Suspense>
      ) : (
        staticImage
      )}
    </>
  );
};
