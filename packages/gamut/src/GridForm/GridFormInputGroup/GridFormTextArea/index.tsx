import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { GridFormTextAreaField } from '../../types';

export type GridFormTextAreaProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormTextAreaField, 'label'>;
  register: FormContextValues['register'];
  setValue: (value: string) => void;
};

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  error,
  field,
  register,
  setValue,
}) => {
  return (
    <TextArea
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={event => {
        setValue(event.target.value);
        field.onUpdate?.(event.target.value);
      }}
      ref={register(field.validation)}
    />
  );
};

export default GridFormTextArea;
