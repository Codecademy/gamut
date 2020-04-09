import React, { useEffect } from 'react';
import { useForm, FieldError } from 'react-hook-form';

import { Form } from '../Form';
import { LayoutGrid, LayoutGridProps } from '../Layout';
import GridFormInputGroup from './GridFormInputGroup';
import GridFormSubmit, { GridFormSubmitProps } from './GridFormSubmit';
import { GridFormField } from './types';

export type GridFormProps<Values extends {}> = {
  children?: React.ReactNode;
  className?: string;
  columnGap?: LayoutGridProps['columnGap'];
  fields: GridFormField[];
  onSubmit: (values: Values) => Promise<void>;
  rowGap?: LayoutGridProps['rowGap'];
  submit: GridFormSubmitProps;
};

export function GridForm<
  Values extends Record<string, boolean | string | undefined>
>({
  children,
  className,
  columnGap = 'lg',
  fields,
  onSubmit,
  rowGap = 'md',
  submit,
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
      <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
        {fields.map(field => {
          const errorMessage = (errors[field.name] as FieldError)?.message;

          return (
            <GridFormInputGroup
              error={errorMessage as string}
              field={field}
              key={field.name}
              register={register}
              setValue={value => setValue(field.name, value as Values[string])}
            />
          );
        })}
        <GridFormSubmit {...submit} />
        {children}
      </LayoutGrid>
    </Form>
  );
}

export default GridForm;
