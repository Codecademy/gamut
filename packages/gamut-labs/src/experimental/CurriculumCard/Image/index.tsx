import React from 'react';

// import { DeferredRender } from '~/components/DeferredRender';
// import { CardPlaceholderAssetPath } from '~/libs/contentAssetPaths';

export type ImageProps = {
  image: string;
  progressState?: 'inProgress' | 'completed';
};

export const Image: React.FC<ImageProps> = ({ image }) => {
  // const [error, setError] = useState(false);

  // const addDefaultImageSource = (event: React.SyntheticEvent) => {
  //   if (!error) {
  //     (event.target as HTMLImageElement).onerror = null;
  //     (event.target as HTMLImageElement).src = CardPlaceholderAssetPath(
  //       progressState
  //     );
  //     setError(true);
  //   }
  // };

  return <img src={image} alt="" />;
};
