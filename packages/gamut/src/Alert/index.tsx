import { GridForm } from '../GridForm';

export * from './Alert';

export const Hey = () => (
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
        options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
        size: 5,
        type: 'select',
        validation: {
          required: 'Please select an option',
          markdown: true,
        },
      },
      {
        label: 'Upload a cat image (we support pdf, jpeg, or png files)',
        name: 'file-input',
        size: 6,
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
        type: 'textarea',
        validation: {
          required: 'Please write something about penguins!',
        },
        size: 6,
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
      },
    ]}
    onSubmit={async (values) => {
      action('Form Submitted')(values);
    }}
    submit={{
      contents: 'Submit Me!?',
    }}
  />
);
