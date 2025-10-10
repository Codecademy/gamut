import { ComponentProps } from 'react';

import { Box } from '../Box';
import { ModalContainer } from './elements';
import { ModalBaseProps } from './types';

interface ImageProps extends Pick<ModalBaseProps, 'image'> {
  size: Exclude<
    ComponentProps<typeof ModalContainer>['size'],
    false | undefined
  >;
}

const imageHeights = {
  small: 225,
  medium: 303.75,
  large: 382.5,
  fluid: 'max-content',
};

export const ImageContainer: React.FC<ImageProps> = ({
  image,
  size = 'fluid',
}) => {
  return (
    <Box height={imageHeights[size]} mx={-24 as any} overflow="clip">
      {image}
    </Box>
  );
};
