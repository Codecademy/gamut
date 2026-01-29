import { FormGroup, GridForm, Input, Text } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GridForm> = {
  component: GridForm,
  args: {
    onSubmit: (values) => {
      action('Form Submitted')(values);
      // eslint-disable-next-line no-console
      console.log('Form Submitted', values);
    },
    submit: {
      contents: 'Submit',
      size: 4,
      position: 'left',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const TextField: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'simple-text',
        size: 9,
        type: 'text',
      },
    ],
  },
};

export const DefaultTextField: Story = {
  args: {
    fields: [
      {
        defaultValue: 'yeet',
        label: 'Text with default value',
        name: 'text-with-default',
        size: 9,
        type: 'text',
      },
    ],
  },
};

export const PlaceholderTextField: Story = {
  args: {
    fields: [
      {
        label: 'Text with placeholder',
        placeholder: 'Your email',
        name: 'placeholder',
        size: 9,
        type: 'email',
      },
    ],
  },
};

export const TextareaField: Story = {
  args: {
    fields: [
      {
        label: 'Write a paragraph about penguins',
        name: 'textarea-input',
        size: 9,
        type: 'textarea',
      },
    ],
  },
};

export const SelectField: Story = {
  args: {
    fields: [
      {
        label: 'Simple select',
        name: 'simple-select',
        options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
        size: 9,
        type: 'select',
      },
    ],
  },
};

export const RadioGroupField: Story = {
  args: {
    fields: [
      {
        label: 'Preferred Modern Artist',
        name: 'artist',
        options: [
          {
            label: 'Cardi B',
            value: 'cardi',
          },
          {
            label: 'Nicki Minaj',
            value: 'nicki',
          },
        ],
        size: 9,
        type: 'radio-group',
      },
    ],
  },
};

export const FileUploadField: Story = {
  args: {
    fields: [
      {
        label: 'Upload a cat image (we support pdf, jpeg, or png files)',
        name: 'file-input',
        size: 9,
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
    ],
  },
};

export const CheckboxField: Story = {
  args: {
    fields: [
      {
        description: 'I agree to the terms',
        label: 'Terms',
        name: 'terms',
        size: 6,
        type: 'checkbox',
        id: 'my-super-cool-id',
        validation: {
          required: true,
        },
      },
      {
        description: 'I agree to the conditions',
        label: 'Conditions',
        name: 'conditions',
        size: 6,
        type: 'checkbox',
        id: 'my-super-cool-id2',
        validation: {
          required: true,
        },
      },
    ],
  },
};

export const CheckboxSpacing: Story = {
  args: {
    fields: [
      {
        description: 'I agree to the terms',
        label: 'Terms',
        name: 'terms',
        size: 6,
        type: 'checkbox',
        id: 'terms-id',
        spacing: 'tight',
        validation: {
          required: true,
        },
      },
      {
        description: 'I agree to the conditions',
        label: 'Conditions',
        name: 'conditions',
        size: 6,
        type: 'checkbox',
        id: 'conditions-id',
        spacing: 'tight',
        validation: {
          required: true,
        },
      },
    ],
  },
};

export const NestedCheckboxesField: Story = {
  args: {
    fields: [
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
  },
};

export const CustomInputs: Story = {
  args: {
    fields: [
      {
        render: ({ error, setValue }) => (
          <>
            <Input
              error={!!error}
              id="custom-text-input"
              type="text"
              onChange={(event) => setValue(event.target.value)}
            />
            🕺
          </>
        ),
        label: 'Gimme two more swags',
        name: 'custom-input',
        size: 12,
        validation: {
          required: true,
          pattern: {
            value: /swag(.*)swag/,
            message: 'Still not enough swag, what are you doing... 💢',
          },
        },
        type: 'custom',
      },
      {
        render: ({ error, setValue }) => (
          <FormGroup label="updog" width="100%">
            <Input
              error={!!error}
              id="custom-text-group-input"
              type="text"
              onChange={(event) => setValue(event.target.value)}
            />
          </FormGroup>
        ),
        size: 12,
        label: 'Gimme two more swags',
        name: 'custom-input-group',
        validation: {
          required: true,
          pattern: {
            value: /swag(.*)swag/,
            message: 'Still not enough swag, what are you doing... 💢',
          },
        },
        type: 'custom-group',
      },
    ],
  },
};

export const HiddenInput: Story = {
  args: {
    fields: [
      {
        type: 'hidden',
        name: 'secret-stuff',
        defaultValue: "I'm invisible!",
      },
      {
        label: "There's more than one field here!",
        name: 'custom-hidden-input',
        type: 'email',
        size: 12,
      },
    ],
  },
};

export const SweetContainer: Story = {
  args: {
    fields: [
      {
        label: 'This is our sticky sweet label',
        name: 'sweet-container',
        type: 'sweet-container',
      },
      {
        label: "There's something sticky and sweet here!",
        name: 'custom-input',
        type: 'email',
        size: 12,
      },
    ],
  },
};

export const InfoTipAutoLabelling: Story = {
  args: {
    fields: [
      {
        label: 'Email address',
        name: 'email',
        size: 9,
        type: 'email',
        infotip: {
          info: 'We will never share your email with third parties.',
          placement: 'floating',
        },
      },
    ],
  },
};

export const InfoTipWithReactNodeLabel: Story = {
  render: (args) => (
    <>
      <Text as="h3" id="api-section-heading" mb={8}>
        API Configuration
      </Text>
      <GridForm {...args} />
    </>
  ),
  args: {
    fields: [
      {
        label: <strong>Username (automatic label)</strong>,
        name: 'username',
        size: 9,
        type: 'text',
        infotip: {
          info: 'Choose a unique username between 3-20 characters.',
        },
      },
      {
        label: <strong>Password (ariaLabel)</strong>,
        name: 'password',
        size: 9,
        type: 'password',
        infotip: {
          info: 'Password must be at least 8 characters with one uppercase letter and one number.',
          ariaLabel: 'Password requirements',
        },
      },
      {
        label: <strong>API Key (ariaLabelledby)</strong>,
        name: 'apiKey',
        size: 9,
        type: 'text',
        infotip: {
          info: 'You can find your API key in the developer settings dashboard.',
          ariaLabelledby: 'api-section-heading',
        },
      },
    ],
  },
};
