import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { colorStates } from './styles/shared';

const ErrorSpan = styled.span`
  position: absolute;
  left: 0;
  top: calc(100% - ${({ theme }) => theme.spacing[8]});
  color: ${colorStates.error.color};
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize[14]};
`;

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <ErrorSpan {...props} />;
};
