import { styledOptions, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import * as React from 'react';

import { CompatibleComponentProps } from '../../utils';

const formSystemProps = variance.compose(
  system.space,
  system.border,
  system.layout,
  system.positioning,
  system.flex,
  system.grid
);

const StyledForm = styled('form', styledOptions<'form'>())(formSystemProps);

export type FormProps = CompatibleComponentProps<typeof StyledForm>;

export const Form: React.FC<FormProps> = forwardRef(
  ({ method = 'post', ...props }, ref) => {
    return <StyledForm {...props} method={method} noValidate ref={ref} />;
  }
);
