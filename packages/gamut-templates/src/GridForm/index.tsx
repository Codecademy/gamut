import { Form, LayoutGrid } from '@codecademy/gamut';
import React, { useEffect } from 'react';
import { useForm, FieldError } from 'react-hook-form';

import GridFormInputGroup from './GridFormInputGroup';
import GridFormSubmit, { GridFormSubmitProps } from './GridFormSubmit';
import { GridFormField } from './types';

export type GridFormProps<Values extends {}> = {
  className?: string;
  fields: GridFormField[];
  onSubmit: (values: Values) => Promise<void>;
  submit: GridFormSubmitProps;
};

export function GridForm<Values extends Record<string, string | undefined>>({
  className,
  fields,
  submit,
  onSubmit,
}: GridFormProps<Values>) {
  const { errors, handleSubmit, register, setValue } = useForm<Values>({
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
    <Form className={className} onSubmit={handleSubmit(onSubmit)}>
      <LayoutGrid columnGap="lg" rowGap="sm">
        {fields.map(field => {
          const errorMessage = (errors[field.name] as FieldError)?.message;

          return (
            <GridFormInputGroup
              error={errorMessage}
              field={field}
              key={field.name}
              register={register}
              setValue={value => setValue(field.name, value as Values[string])}
            />
          );
        })}
        <GridFormSubmit contents={submit.contents} />
      </LayoutGrid>
    </Form>
  );
}

export default GridForm;
