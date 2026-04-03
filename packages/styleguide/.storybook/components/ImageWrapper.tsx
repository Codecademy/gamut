import { Box, BoxProps } from '@codecademy/gamut';
import * as React from 'react';
import styled from '@emotion/styled';

interface ImageWrapperProps {
  alt: string;
  height: number | string;
  src: string;
}

const StyledImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const ImageWrapper: React.FC<ImageWrapperProps & BoxProps> = ({
  src,
  alt,
  height = '216px',
  ...props
}) => {
  return (
    <Box
      width={'100%'}
      height={height}
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      {...props}
    >
      <StyledImage src={src} alt={alt} />
    </Box>
  );
};
