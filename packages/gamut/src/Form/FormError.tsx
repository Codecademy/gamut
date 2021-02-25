import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './styles/FormError.module.scss';

export const errorSpanStyles = css`
  position: absolute;
  left: 0;
  top: calc(100% - ${theme.spacing[8]});
  color: blue;
  display: inline-block;
  font-size: ${theme.fontSize[14]};
`;

const ErrorSpan = styled.span`
  ${errorSpanStyles};
`;

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return (
    <ErrorSpan className={cx(styles.formError, props.className)} {...props} />
  );
};
