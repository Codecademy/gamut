import { GridForm } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof GridForm>> = {
  component: GridForm,
  args: {
    fields: [
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
        options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
        size: 5,
        type: 'select',
        validation: {
          required: 'Please select an option',
        },
      },
      {
        label: 'Upload a cat image (we support pdf, jpeg, or png files)',
        name: 'file-input',
        size: 4,
        type: 'file',
        validation: {
          required: true,
          validate: (files) => {
            const { type } = files.item(0);
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(type))
              return 'Please upload a pdf, jpeg, or png file.';
            return true;
          },
        },
      },
      {
        label: 'Write a paragraph about penguins',
        name: 'textarea-input',
        size: 6,
        type: 'textarea',
        validation: {
          required: 'Please write something about penguins!',
        },
      },
      {
        label:
          "Validated, required text that must contain the word 'swag' twice",
        name: 'validated-required-text',
        size: 5,
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
        id: 'my-super-cool-id',
        defaultValue: true,
      },
      {
        label: 'Preferred Modern Artist',
        name: 'artist',
        options: [
          {
            label: 'Cardi B',
            value: 'cardi',
            infotip: { info: 'This is super important.' },
          },
          {
            label: 'Nicki Minaj',
            value: 'nicki',
          },
        ],
        size: 4,
        type: 'radio-group',
        validation: {
          required: 'You gotta pick one!',
        },
      },
      {
        label: 'End User License Agreement',
        description: 'I accept the terms and conditions (required or else!!!)',
        name: 'eula-checkbox-required',
        type: 'checkbox',
        validation: {
          required: 'Please check the box to agree to the terms.',
        },
        size: 4,
      },
      {
        label: 'Nested checkboxes',
        name: 'nested-checkboxes',
        type: 'nested-checkboxes',
        defaultValue: ['backend', 'react', 'vue'],
        options: [
          {
            value: 'frontend',
            label: 'Frontend Technologies',
            options: [
              {
                value: 'react',
                label: 'React',
                options: [
                  { value: 'nextjs', label: 'Next.js' },
                  { value: 'typescript', label: 'TypeScript' },
                ],
              },
              {
                value: 'vue',
                label: 'Vue.js',
              },
              { value: 'angular', label: 'Angular' },
            ],
          },
          {
            value: 'backend',
            label: 'Backend Technologies',
            options: [
              { value: 'node', label: 'Node.js' },
              { value: 'python', label: 'Python' },
              { value: 'java', label: 'Java' },
            ],
          },
        ],
        size: 12,
      },
    ],
    submit: {
      contents: 'Submit Me!?',
      size: 4,
      position: 'left',
      disabled: false,
      loading: false,
      type: 'fill',
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
      // eslint-disable-next-line no-console
      console.log('Form Submitted', values);
    },
    validation: 'onSubmit',
    resetOnSubmit: true,
  },
  argTypes: {
    'submit.type': {
      control: 'radio',
      options: ['fill', 'cta'],
      table: {
        defaultValue: { summary: 'fill' },
        type: { summary: 'fill | cta' },
      },
      description: 'The type of the submit button.',
    },
    'submit.position': {
      control: 'radio',
      options: ['left', 'center', 'right', 'stretch'],
      table: {
        defaultValue: { summary: 'left' },
        type: { summary: 'left | center | right | stretch' },
      },
      description: 'The position of the submit button.',
    },
    'submit.size': {
      control: {
        type: 'number',
        min: 1,
        max: 12,
        step: 1,
      },
      description: 'The column size of the submit button.',
    },
    'submit.contents': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description: 'The text of the submit button.',
    },
    cancel: {
      table: {
        disable: true,
      },
    },
    'cancel.children': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description: 'The text of the cancel button.',
    },
    'cancel.onClick': {
      table: {
        type: { summary: 'function' },
      },
    },
    'cancel.href': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const Default: Story = {};
