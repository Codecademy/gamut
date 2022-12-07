import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { BASE_STATIC_ASSET_PATH } from '../../remoteAssets/components';

const variants = variant({
  base: {
    display: 'block',
    margin: '0 auto',
  },
  variants: {
    default: {
      width: 160,
    },
    small: {
      width: 111,
    },
  },
});

const StyledImg = styled.img(variants);

type ProgressState = 'inProgress' | 'completed';

const getPlaceholderAssetPath = (pathProgressState?: ProgressState) => {
  const progressState = pathProgressState ? `-${pathProgressState}` : '';
  return `${BASE_STATIC_ASSET_PATH}/curriculum/path/placeholder${progressState}.svg`;
};

export type ImageProps = {
  image: string;
  progressState?: ProgressState;
  isSmall?: boolean;
};

export const Image: React.FC<ImageProps> = ({
  image,
  progressState,
  isSmall,
}) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  /** Delay initial render once to ensure that rehydration does not conflict with portal mounting */
  useIsomorphicLayoutEffect(() => {
    setReady(typeof document !== 'undefined');
  }, []);

  if (!ready) return null;

  const addDefaultImageSource = (event: React.SyntheticEvent) => {
    if (!error) {
      (event.target as HTMLImageElement).onerror = null;
      (event.target as HTMLImageElement).src = getPlaceholderAssetPath(
        progressState
      );
      setError(true);
    }
  };

  return (
    <StyledImg
      variant={isSmall ? 'small' : 'default'}
      src={image}
      alt=""
      onError={addDefaultImageSource}
    />
  );
};
