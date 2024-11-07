import { Box, BoxProps } from "@codecademy/gamut"
import * as React from 'react';

interface ImageWrapperProps {
  src: string;
  alt: string;
}


export const ImageWrapper:React.FC<ImageWrapperProps & BoxProps> = ({
  src,
  alt,
  ...args
}) => {
  return (
    <Box {...args} width={'100%'} height="2rem" bg="background-primary">
      <img src={src} alt={alt} />
    </Box>
  )
}
