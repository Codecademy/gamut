import { ComponentProps } from 'react';

import { Box } from '../Box';
import { ModalContainer } from './elements';
import { ModalView } from './Modal';

interface ImageProps extends Pick<ModalView, 'image'> {
  size?: ComponentProps<typeof ModalContainer>['size'];
}

const imageHeights = {
  small: 225,
  medium: 303.75,
  fluid: 'max-content',
};

export const ImageContainer: React.FC<ImageProps> = ({
  image,
  size = 'fluid',
}) => {
  return (
    <Box
      mx={-24 as any}
      overflow="clip"
      height={imageHeights[size === false ? 'fluid' : size]}
    >
      {image}
    </Box>
  );
};
