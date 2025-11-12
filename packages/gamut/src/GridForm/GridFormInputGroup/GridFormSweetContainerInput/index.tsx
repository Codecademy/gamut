import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Box } from '../../..';
import { Input } from '../../../Form';
import { GridFormSweetContainerField } from '../../types';

export type GridFormSweetContainerInputProps = {
  field: GridFormSweetContainerField;
  register: UseFormReturn['register'];
  label: string;
};

export const GridFormSweetContainerInput: React.FC<
  GridFormSweetContainerInputProps
> = ({ register, field: { name }, label }) => {
  return (
    <Box
      height="1px"
      left="100vw"
      overflow="hidden"
      position="fixed"
      top="0"
      width="1px"
    >
      <label htmlFor={name}>{label}</label>
      <Input {...register(name)} id={name} type="checkbox" />
    </Box>
  );
};
