import { Rotation, StrokeButton } from '@codecademy/gamut';
import { useState } from 'react';
import * as React from 'react';

export const RotationExample: React.FC = ({ children }) => {
  const [isRotated, setRotated] = useState(false);

  return (
    <StrokeButton onClick={() => setRotated(!isRotated)}>
      <Rotation rotated={isRotated}>{children}</Rotation>
    </StrokeButton>
  );
};
