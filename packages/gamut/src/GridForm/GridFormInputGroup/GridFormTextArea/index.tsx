import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { GridFormTextAreaField } from '../../types';

export type GridFormTextAreaProps = {
  className?: string;
  field: Omit<GridFormTextAreaField, 'label'>;
  setValue: (value: string) => void;
  register: FormContextValues['register'];
};

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  field,
  register,
  setValue,
}) => {
  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <TextArea
      className={className}
      htmlFor={field.name}
      name={field.name}
      onChange={onChange}
      ref={register(field.validation)}
    />
  );
};

export default GridFormTextArea;
