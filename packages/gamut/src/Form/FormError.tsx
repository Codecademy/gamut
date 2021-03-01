import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

const ErrorSpan = styled.span`
  position: absolute;
  left: 0;
  top: calc(100% - ${({ theme }) => theme.spacing[8]});
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize[14]};
`;

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <ErrorSpan className={props.className} {...props} />;
};
