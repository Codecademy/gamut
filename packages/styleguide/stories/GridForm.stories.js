import React from 'react';
import { GridForm } from 'gamut-templates';

export default {
  component: 'GridForm',
  title: 'Templates/GridForm',
};

export const gridForm = () => (
  <GridForm
    fields={[
      {
        label: 'Simple text',
        name: 'simple-text',
        sizing: {
          xs: 3,
        },
        type: 'text',
      },
      {
        defaultValue: 'yeet',
        label: 'Text with default value',
        name: 'text-with-default',
        sizing: {
          xs: 4,
        },
        type: 'text',
      },
      {
        label: 'Simple select',
        name: 'simple-select',
        options: ['One fish', 'Two fish', 'Red fish', 'Blue fish'],
        sizing: {
          xs: 5,
        },
        type: 'select',
      },
      {
        label:
          "Validated, required text that must contain the word 'swag' twice",
        name: 'validated-required-text',
        sizing: {
          xs: 12,
        },
        type: 'text',
        validation: {
          required: true,
          pattern: {
            value: /swag(.*)swag/,
            message: 'Not enough swag',
          },
        },
      },
    ]}
    onSubmit={async values => {
      alert(`Submitted: ${JSON.stringify(values)}`);
    }}
    submit={{
      children: 'Submit Me!?',
    }}
  />
);

gridForm.story = {
  name: 'GridForm',
};
