import { ConnectedForm, useFormState } from '@codecademy/gamut';
import React from 'react';

const fakeData = {
  layoutComponents: [
    { url: 'www.whyisthishappening.com' },
    { url: 'thisisntworking.com' },
  ],
};

const FormBodyComponent = () => {
  const { control, watch, register, useFieldArray } = useFormState();

  const { fields, append } = useFieldArray({
    control,
    name: 'layoutComponents',
  });

  const watchFieldArray = watch('layoutComponents');

  console.log('watch', watchFieldArray);

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  return (
    <div className="App">
      {controlledFields.map((field, index) => {
        return (
          <input
            {...register(`layoutComponents.${index}.url`)}
            key={field.id}
          />
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            url: 'bill',
          })
        }
      >
        Append
      </button>
    </div>
  );
};

const GamutHookFormComponent = () => {
  return (
    <ConnectedForm
      defaultValues={fakeData}
      onSubmit={() => console.log('Submitted')}
    >
      <FormBodyComponent />
    </ConnectedForm>
  );
};

export default GamutHookFormComponent;
