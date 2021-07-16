import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { formBaseStyles } from './styles/shared-system-props';

export type FormGroupDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const FormGroupDescription = styled.div(system.css(formBaseStyles));

export const FormGroupDescription: React.FC<FormGroupDescriptionProps> = (
  props
) => {
  return <StyledDiv {...props} />;
};
