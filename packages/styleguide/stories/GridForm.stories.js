import React from 'react';
import { GridForm } from '../../gamut-templates';

export default {
  component: GridForm,
  title: 'Templates/GridForm',
};

export const gridForm = () => (
  <>
    <p>
      This <code>GridForm</code> component takes in plain JSON-like props and
      usess them to automatically formulate a magical combination of:
      <ul>
        <li>
          {' '}
          <a href="https://react-hook-form.com">
            <code>react-hook-form</code>
          </a>
        </li>
        <li>
          <a href="/?path=/story/layout-grid-system--fixed-grid-default">
            Our existing <code>Grid</code> layout system
          </a>
        </li>
        <li>
          <a href="/?path=/story/component-form--form">
            Our existing <code>Form</code> primitives
          </a>
        </li>
      </ul>
      Unlike <code>Form</code> and its primitives, you should only ever directly
      use <code>GridForm</code> to create your form.
    </p>
    <GridForm
      fields={[
        {
          label: 'Simple text',
          name: 'simple-text',
          size: 3,
          type: 'text',
        },
        {
          defaultValue: 'yeet',
          label: 'Text with default value',
          name: 'text-with-default',
          size: 4,
          type: 'text',
        },
        {
          label: 'Simple select',
          name: 'simple-select',
          options: ['One fish', 'Two fish', 'Red fish', 'Blue fish'],
          size: 5,
          type: 'select',
        },
        {
          label:
            "Validated, required text that must contain the word 'swag' twice",
          name: 'validated-required-text',
          size: 12,
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
        contents: 'Submit Me!?',
      }}
    />
  </>
);

gridForm.story = {
  name: 'GridForm',
};
