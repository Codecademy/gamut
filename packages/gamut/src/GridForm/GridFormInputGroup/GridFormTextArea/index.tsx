import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { GridFormTextAreaField } from '../../types';

export type GridFormTextAreaProps = {
  className?: string;
  field: Omit<GridFormTextAreaField, 'label'>;
  register: FormContextValues['register'];
};

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  field,
  register,
}) => {
  return (
    <TextArea
      className={className}
      htmlFor={field.name}
      name={field.name}
      ref={register(field.validation)}
    />
  );
};

export default GridFormTextArea;
