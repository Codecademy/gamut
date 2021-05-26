import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Box } from '../../..';
import { Input } from '../../../Form';
import { GridFormSweetContainerField } from '../../types';

export type GridFormSweetContainerInputProps = {
  field: GridFormSweetContainerField;
  register: UseFormMethods['register'];
  label: string;
};

export const GridFormSweetContainerInput: React.FC<GridFormSweetContainerInputProps> = ({
  register,
  field: { name },
  label,
}) => {
  return (
    <Box
      height="0"
      left="100vw"
      overflow="hidden"
      position="absolute"
      top="100vh"
      width="0"
    >
      <label htmlFor={name}>{label}</label>
      <Input name={name} ref={register()} type="checkbox" id={name} />
    </Box>
  );
};
