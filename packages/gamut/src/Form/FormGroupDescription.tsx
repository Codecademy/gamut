import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { formBaseStyles } from './styles/shared-system-props';

export type FormGroupDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const StyledDiv = styled.div<FormGroupDescriptionProps>`
  ${system.css(formBaseStyles)}
`;

export const FormGroupDescription: React.FC<FormGroupDescriptionProps> = (
  props
) => {
  return <StyledDiv {...props} />;
};
