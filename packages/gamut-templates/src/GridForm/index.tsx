import { Form, Grid } from '@codecademy/gamut';
import React, { useEffect } from 'react';
import useForm from 'react-hook-form';

import GridFormInputGroup from './GridFormInputGroup';
import GridFormSubmit, { GridFormSubmitProps } from './GridFormSubmit';
import { GridFormField } from './types';

export type GridFormProps<Values extends {}> = {
  fields: GridFormField[];
  onSubmit: (values: Values) => Promise<void>;
  submit: GridFormSubmitProps;
};

export function GridForm<Values extends Record<string, string | undefined>>({
  fields,
  submit,
  onSubmit,
}: GridFormProps<Values>) {
  const { register, handleSubmit, errors, setValue, getValues } = useForm<
    Values
  >({
    defaultValues: fields.reduce(
      (defaultValues, field) => ({
        ...defaultValues,
        [field.name]: field.defaultValue,
      }),
      {}
    ),
  });

  useEffect(() => {
    for (const field of fields) {
      register({ name: field.name });
    }
  }, [fields, register]);

  return (
    <Form onSubmit={handleSubmit(() => onSubmit(getValues()))}>
      <Grid>
        {fields.map(field => (
          <GridFormInputGroup
            error={errors[field.name]}
            field={field}
            key={field.name}
            setValue={value => setValue(field.name, value)}
          />
        ))}
        <GridFormSubmit>{submit.children}</GridFormSubmit>
      </Grid>
    </Form>
  );
}

export default GridForm;
