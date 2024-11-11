import { Box, BoxProps } from "@codecademy/gamut"
import * as React from 'react';
import styled from '@emotion/styled';

interface ImageWrapperProps {
  src: string;
  alt: string;
}

const StyledImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`

export const ImageWrapper:React.FC<ImageWrapperProps & BoxProps> = ({
  src,
  alt,
  ...props
}) => {
  return (
    <Box width={'100%'} height="216px" display='flex' justifyContent={'center'} alignItems='center' {...props}>
      <StyledImage src={src} alt={alt}/>
    </Box>
  )
}

