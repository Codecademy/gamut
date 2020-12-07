import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@codecademy/gamut-styles';
import { OpenIcon } from '@codecademy/gamut-icons';

const A = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  color: ${colors.hyper};

  svg {
    margin-left: 8px;
  }
`;

export const FigmaLink = ({ href }) => {
  return (
    <A href={href} target="_blank">
      Figma Source File
      <OpenIcon size={18} />
    </A>
  );
};
