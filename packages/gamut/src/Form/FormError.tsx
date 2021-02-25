import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

export const errorSpanStyles = css`
  position: absolute;
  left: 0;
  top: calc(100% - ${theme.spacing[8]});
  color: ${theme.colors.red};
  display: inline-block;
  font-size: ${theme.fontSize[14]};
`;

const ErrorSpan = styled.span`
  ${errorSpanStyles};
`;

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <ErrorSpan className={props.className} {...props} />;
};
