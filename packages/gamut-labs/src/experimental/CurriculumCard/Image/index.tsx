import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { DeferredRender } from '../../DeferredRender';

const StyledImg = styled.img`
  display: block;
  margin: 0 auto;
  width: ${pxRem(160)};
`;

type ProgressState = 'inProgress' | 'completed';

const BASE_STATIC_ASSET_PATH =
  'https://static-assets.codecademy.com/components';

const getPlaceholderAssetPath = (pathProgressState?: ProgressState) => {
  const progressState = pathProgressState ? `-${pathProgressState}` : '';
  return `${BASE_STATIC_ASSET_PATH}/curriculum/path/placeholder${progressState}.svg`;
};

export type ImageProps = {
  image: string;
  progressState?: ProgressState;
};

export const Image: React.FC<ImageProps> = ({ image, progressState }) => {
  const [error, setError] = useState(false);

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
    <DeferredRender>
      <StyledImg src={image} alt="" onError={addDefaultImageSource} />
    </DeferredRender>
  );
};
