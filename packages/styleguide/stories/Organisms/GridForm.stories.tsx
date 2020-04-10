import { GridForm } from '@codecademy/gamut/src';
import { action } from '@storybook/addon-actions';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStory('Organisms', GridForm);

export const gridForm = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      This organism takes in plain JSON-like props and uses them to string
      together a validated form composed of:
      <ul>
        <li>
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
      You should only ever directly use <code>GridForm</code> to create your
      form. <code>Form</code> atoms compose the structure of these forms but
      should not be used directly.
      <br />
      `GridForm`s are laid out with `LayoutGrid`, so you can override its{' '}
      <code>columnGap</code> and <code>rowGap</code> with the normal string or
      responsive layouts.
    </StoryDescription>
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
          validation: {
            required: 'Please write something about penguins!',
          },
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
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Submit Me!?',
      }}
    />
  </StoryTemplate>
);
