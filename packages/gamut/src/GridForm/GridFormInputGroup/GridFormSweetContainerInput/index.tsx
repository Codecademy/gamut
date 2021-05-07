import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Box } from '../../..';
import { Input } from '../../../Form';
import { GridFormSweetContainerField } from '../../types';

export type GridFormSweetContainerInputProps = {
  field: GridFormSweetContainerField;
  register: UseFormMethods['register'];
};

export const GridFormSweetContainerInput: React.FC<GridFormSweetContainerInputProps> = ({
  register,
  field: { name },
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
      <Input name={name} ref={register()} type="checkbox" />
    </Box>
  );
};
