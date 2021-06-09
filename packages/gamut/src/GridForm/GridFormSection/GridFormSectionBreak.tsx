import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { GridFormInputGroup } from '../GridFormInputGroup';

export type GridFormSectionProps = {
  fields: any;
  showRequired: boolean;
  pastFirstError: boolean;
};

export const GridFormSectionBreak: React.FC<GridFormSectionProps> = ({
  fields,
  showRequired,
  pastFirstError,
}) => {
  return <Column size={12}>'tbd'</Column>;
};
