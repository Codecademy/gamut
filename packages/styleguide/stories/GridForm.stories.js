import React from 'react';
import { GridForm } from '../../gamut-templates/src';

import styles from './GridForm-story.scss';

export default {
  component: GridForm,
  title: 'Templates/GridForm',
};

export const gridForm = () => (
  <div className={styles.gridFormStory}>
    <p>
      The <code>GridForm</code> component takes in plain JSON-like props and
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
          label: 'Upload a cat image (we support pdf, jpeg, or png files)',
          name: 'file-input',
          size: 6,
          type: 'file',
          validation: {
            required: true,
            validate: files => {
              const { type } = files.item(0);
              const allowedTypes = [
                'application/pdf',
                'image/jpeg',
                'image/png',
              ];
              if (!allowedTypes.includes(type))
                return 'Please upload a pdf, jpeg, or png file.';

              return true;
            },
          },
        },
        {
          label: 'Write a paragraph about penguins',
          name: 'textarea-input',
          size: 12,
          type: 'textarea',
        },
        {
          label:
            "Validated, required text that must contain the word 'swag' twice",
          name: 'validated-required-text',
          size: 9,
          type: 'text',
          validation: {
            required: true,
            pattern: {
              value: /swag(.*)swag/,
              message: 'Not enough swag',
            },
          },
        },
        {
          description: 'I have swag',
          label: 'Swag levels',
          name: 'enough-swag',
          size: 3,
          type: 'checkbox',
        },
      ]}
      onSubmit={async values => {
        alert(`Submitted: ${JSON.stringify(values)}`);
      }}
      submit={{
        contents: 'Submit Me!?',
      }}
    />
  </div>
);

gridForm.story = {
  name: 'GridForm',
};
