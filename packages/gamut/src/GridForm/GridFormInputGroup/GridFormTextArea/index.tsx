import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { GridFormTextAreaField } from '../../types';

export type GridFormTextAreaProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormTextAreaField, 'label'>;
  register: FormContextValues['register'];
  id?: string;
};

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  error,
  field,
  register,
  id,
}) => {
  return (
    <TextArea
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.value)}
      ref={register(field.validation)}
      id={id}
    />
  );
};

export default GridFormTextArea;
