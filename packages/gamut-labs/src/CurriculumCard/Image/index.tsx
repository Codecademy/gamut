import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { BASE_STATIC_ASSET_PATH } from '../../../remoteAssets/components';

const StyledImg = styled.img`
  display: block;
  margin: 0 auto;
  width: ${pxRem(160)};
`;

type ProgressState = 'inProgress' | 'completed';

const getPlaceholderAssetPath = (pathProgressState?: ProgressState) => {
  const progressState = pathProgressState ? `-${pathProgressState}` : '';
  return `${BASE_STATIC_ASSET_PATH}/curriculum/path/placeholder${progressState}.svg`;
};

export type ImageProps = {
  image: string;
  progressState?: ProgressState;
};

export const Image: React.FC<ImageProps> = ({ image, progressState }) => {
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

  return <StyledImg src={image} alt="" onError={addDefaultImageSource} />;
};
