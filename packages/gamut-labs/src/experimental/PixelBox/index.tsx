import React from 'react';
import { Container } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { getPixelPattern } from '@codecademy/gamut-labs/src/experimental/PixelBox/getPixelPattern';

type PixelBoxProps = {
  color: string;
};

const PixelContainer = styled(Container)`
  background: url(${({ color }: PixelBoxProps) => getPixelPattern(color)});
  height: 500px;
  width: 500px;
`;

export const PixelBox: React.FC<PixelBoxProps> = ({ color }) => {
  return <PixelContainer color={color} />;
};
