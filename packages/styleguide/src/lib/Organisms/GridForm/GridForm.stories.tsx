import {
  Column,
  FormGroup,
  GridForm,
  Input,
  LayoutGrid,
  Markdown,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof GridForm> = {
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
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
      // eslint-disable-next-line no-console
      console.log('Form Submitted', values);
    },
    validation: 'onSubmit',
    resetOnSubmit: true,
  },
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const Default: Story = {};

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
      },
      {
        description: 'I agree to the conditions',
        label: 'Conditions',
        name: 'conditions',
        size: 6,
        type: 'checkbox',
        id: 'my-super-cool-id2',
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
      },
      {
        description: 'I agree to the conditions',
        label: 'Conditions',
        name: 'conditions',
        size: 6,
        type: 'checkbox',
        id: 'conditions-id',
        spacing: 'tight',
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

export const SubmitButtonRight: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'right-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Right Submit!?',
      position: 'right',
      size: 12,
    },
  },
};

export const SubmitButtonLeft: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'left-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Left Submit!?',
      position: 'left',
      size: 12,
    },
  },
};

export const SubmitButtonCenter: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'center-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Center Submit!?',
      position: 'center',
      size: 12,
    },
  },
};

export const SubmitButtonStretch: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'stretch-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Stretch Submit!?',
      position: 'stretch',
      size: 12,
    },
  },
};

export const SubmitButtonFill: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'fill-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'Fill Submit!?',
      type: 'fill',
      size: 12,
    },
  },
};

export const SubmitButtonCTA: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'cta-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    submit: {
      contents: 'CTA Submit!?',
      type: 'cta',
      size: 12,
    },
  },
};

export const SubmitButtonInline: Story = {
  args: {
    fields: [
      {
        hideLabel: true,
        label: 'Label',
        name: 'email',
        size: 8,
        type: 'text',
      },
    ],
    submit: {
      contents: 'Inline Submit!?',
      size: 4,
      position: 'right',
    },
  },
};

export const CancelButton: Story = {
  args: {
    fields: [
      {
        label: 'Simple text',
        name: 'cancel-sub-simple-text',
        type: 'text',
        size: 12,
      },
    ],
    cancel: {
      children: 'Cancel',
      onClick: () => {},
    },
    submit: {
      contents: 'Submit!?',
      position: 'right',
      size: 12,
    },
  },
};

export const Formatted: Story = {
  args: {
    fields: [
      {
        label: 'Fave Gamut Component',
        name: 'rowspan-radiogroup',
        options: [
          {
            label: 'FlexBox',
            value: 'flex',
          },
          {
            label: 'GridForm',
            value: 'grid',
          },
          {
            label: 'Text',
            value: 'text',
          },
        ],
        size: 3,
        rowspan: 3,
        type: 'radio-group',
        validation: {
          required: 'You gotta pick one!',
        },
      },
      {
        label: 'Simple text',
        name: 'rowspan-simple-text',
        size: 3,
        type: 'text',
      },
      {
        defaultValue: 'yeet',
        label: 'Text with default value',
        name: 'text-with-default-formatting',
        size: 4,
        type: 'text',
      },
      {
        label: 'Simple select (required)',
        name: 'simple-select-formatting',
        options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
        size: 5,
        type: 'select',
        validation: {
          required: 'Please select an option',
        },
      },
    ],
    requiredTextProps: { color: 'danger', variant: 'title-xs' },
  },
};

export const HideRequiredText: Story = {
  args: {
    fields: [
      {
        label: 'A field',
        placeholder: 'I am very optional',
        name: 'very-optional',
        type: 'text',
        size: 12,
      },
      {
        label: 'A field',
        placeholder: 'I am very optional',
        name: 'very-optional',
        type: 'text',
        size: 12,
      },
    ],
    hideRequiredText: true,
  },
};

export const SoloField: Story = {
  args: {
    fields: [
      {
        label: 'A field',
        placeholder: 'I am a required solo field',
        name: 'so-required',
        type: 'text',
        size: 12,
        validation: {
          required: 'I am required',
        },
      },
    ],
  },
};

export const InfoTip: Story = {
  args: {
    fields: [
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          alignment: 'bottom-left',
        },
        label: 'Tool input',
        name: 'input-field',
        size: 6,
        type: 'text',
      },
      {
        infotip: {
          info: <Markdown text="My grandmother used to tell me stories..." />,
          alignment: 'bottom-right',
        },
        label: 'Select with infotip',
        options: ['', 'Water', 'Earth', 'Fire', 'Air', 'Boomerang'],
        size: 3,
        type: 'select',
        validation: {
          required: 'Please select an option',
        },
        name: 'select-field',
      },
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        label: 'Write a paragraph about infotips',
        name: 'textarea-field',
        size: 6,
        type: 'textarea',
        rows: 6,
        placeholder: 'Check out my infotip',
        validation: {
          required: 'Please write something about infotips!',
        },
      },
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        label: 'Preferred Modern Artist',
        name: 'modern-artist',
        options: [
          {
            label: 'Taylor Swift',
            value: 'taylor-swift',
          },
          {
            label: 'Beyonce',
            value: 'beyonce',
          },
        ],
        size: 3,
        type: 'radio-group',
        validation: {
          required: 'You gotta pick one!',
        },
      },
      {
        infotip: {
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          alignment: 'bottom-right',
        },
        label: 'End User License Agreement',
        description: 'I promise that I read it',
        name: 'eula-checkbox-required-agreement',
        size: 4,
        type: 'checkbox',
        validation: {
          required: 'Please check the box to agree to the terms.',
        },
      },
    ],
  },
};

const DisabledInputsExample = () => {
  return (
    <GridForm
      fields={[
        {
          disabled: true,
          label: 'Disabled text',
          name: 'disabled-text',
          type: 'text',
          size: 6,
        },
        {
          label: 'Enabled text',
          name: 'enabled-text',
          type: 'text',
          size: 6,
        },
      ]}
      hideRequiredText
      submit={{
        contents: 'Right Submit!?',
        position: 'right',
        size: 12,
      }}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const Sections: Story = {
  args: {
    fields: [
      {
        title: 'first section',
        layout: 'left',
        variant: 'title-xs',
        titleWrapperProps: {
          color: 'danger',
        },
        fields: [
          {
            label: 'hi?',
            name: 'text01-left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'hello?',
            name: 'text02-left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'Write a paragraph.',
            name: 'paragraph01-left-section',
            size: 8,
            type: 'textarea',
            validation: {
              required: 'Please write something about penguins!',
            },
          },
          {
            label: 'howdy?',
            name: 'text03-left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'whats up?',
            name: 'text04--left-section',
            size: 4,
            type: 'text',
            validation: {
              required: true,
            },
          },
          {
            label: 'Write another long paragraph',
            name: 'paragraph02-left-section',
            size: 8,
            type: 'textarea',
            validation: {
              required: 'Please write something about penguins!',
            },
          },
        ],
      },
      {
        title: 'hi there... again',
        as: 'h3',
        fields: [
          {
            label: 'hello....',
            name: 'text01-center-section',
            size: 5,
            type: 'text',
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
    requiredTextProps: { color: 'primary', fontStyle: 'italic' },
  },
};

export const DisabledInputs: Story = {
  render: () => <DisabledInputsExample />,
};

const OnFieldUpdateExample = () => {
  const [text, setText] = useState('');
  return (
    <>
      <>The text value is: {text}</>
      <GridForm
        fields={[
          {
            label: 'Text with onUpdate',
            name: 'onUpdate-simple-text',
            size: 3,
            type: 'text',
            onUpdate: setText,
          },
        ]}
        hideRequiredText
        submit={{
          contents: 'Submit Me!?',
          size: 12,
        }}
        onSubmit={(values) => {
          action('Form Submitted')(values);
        }}
      />
    </>
  );
};

export const OnFieldUpdate: Story = {
  render: () => <OnFieldUpdateExample />,
};

const CustomErrorExample = () => {
  return (
    <GridForm
      fields={[
        {
          label: 'Who is the best at bending?',
          name: 'custom-error',
          size: 5,
          type: 'text',
          customError: 'NOT Flexo.',
          validation: {
            required: true,
            pattern: {
              value: /Bender/,
              message: 'Just type Bender...',
            },
          },
        },
      ]}
      submit={{
        contents: 'Submit Me!?',
        size: 12,
      }}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const CustomError: Story = {
  render: () => <CustomErrorExample />,
};

const MarkdownErrorsExample = () => {
  return (
    <GridForm
      fields={[
        {
          label: 'there is a markdown error here!',
          name: 'markdown-error',
          type: 'email',
          validation: {
            required:
              'This is [an example](https://www.youtube.com/watch?v=5IuRzJRrRpQ) error link.',
          },
          size: 12,
        },
      ]}
      submit={{
        contents: 'Submit',
        size: 12,
      }}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const MarkdownErrors: Story = {
  render: () => <MarkdownErrorsExample />,
};

const LoadingAndDisabledExample = () => {
  return (
    <>
      <Background bg="beige" p={32}>
        <GridForm
          fields={[
            {
              label: 'Email',
              placeholder: 'Your email',
              name: 'loading-beige',
              type: 'email',
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            loading: true,
            contents: 'Submit Me!?',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Background>
      <Background bg="navy" p={32}>
        <GridForm
          fields={[
            {
              label: 'Email',
              placeholder: 'Your email',
              name: 'loading-navy',
              type: 'email',
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            disabled: true,
            contents: 'Submit Me!?',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Background>
    </>
  );
};

export const LoadingAndDisabled: Story = {
  render: () => <LoadingAndDisabledExample />,
};

const DisabledFieldsOnSubmitExample = () => {
  return (
    <>
      <Background bg="palePink" p={32}>
        <GridForm
          disableFieldsOnSubmit
          fields={[
            {
              label: 'Email',
              placeholder: 'i will disable on correct submission!',
              name: 'disabled-fields-on-submit',
              type: 'email',
              validation: {
                required: 'pls fill this out',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                  message: 'that is not an email 😔',
                },
              },
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            contents: 'Submit Me 💖',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Background>
      <Background bg="black" p={32}>
        <GridForm
          disableFieldsOnSubmit
          fields={[
            {
              label: 'Email',
              placeholder: 'i will NEVER disable.',
              name: 'disabled-fields-on-submit-ii',
              type: 'email',
              validation: {
                required: 'pls fill this out',
              },
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            contents: 'Submit Me 😈',
            size: 12,
          }}
          wasSubmitSuccessful={false}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Background>
      <Background bg="paleBlue" p={32}>
        <GridForm
          disableFieldsOnSubmit
          fields={[
            {
              label: 'Email',
              placeholder: 'i will also never disable...',
              name: 'disabled-fields-on-submit-iii',
              type: 'email',
              validation: {
                required: 'pls fill this out',
                validate: {
                  checkValue: () =>
                    false || "It's never gonna work out between us",
                },
              },
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            contents: 'Submit Me 🤷🏻',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Background>
    </>
  );
};

export const DisabledFieldsOnSubmit: Story = {
  render: () => <DisabledFieldsOnSubmitExample />,
};

const ResetOnSubmitExample = () => {
  return (
    <>
      <Background bg="beige" p={32}>
        <GridForm
          fields={[
            {
              label: 'Email',
              placeholder: 'i will reset on correct submission!',
              name: 'reset-on-submit',
              type: 'email',
              validation: {
                required: 'pls fill this out',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                  message: 'that is not an email 😔',
                },
              },
              size: 12,
            },
          ]}
          hideRequiredText
          resetOnSubmit
          submit={{
            contents: 'Submit Me 💖',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Background>
    </>
  );
};

export const ResetOnSubmit: Story = {
  render: () => <ResetOnSubmitExample />,
};

export const FormLoadingExample = () => {
  const [loading, setLoading] = useState(false);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async () => {
    setLoading(true);
    await wait(2000);
    setLoading(false);
  };

  return (
    <Background bg="navy" p={32}>
      <GridForm
        disableFieldsOnSubmit
        fields={[
          {
            label: 'Email',
            placeholder:
              'i will disable form fields on loading and reset on correct submission!',
            name: 'im-new',
            type: 'email',
            validation: {
              required: 'pls fill this out',
              pattern: {
                value:
                  /^(?:[a-zA-Z0-9_]+(?:[.-]?[a-zA-Z0-9_]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                message: 'that is not an email 😔',
              },
            },
            size: 12,
          },
        ]}
        hideRequiredText
        resetOnSubmit
        submit={{
          loading,
          contents: 'Submit Me 💖',
          size: 5,
        }}
        onSubmit={onSubmit}
      />
    </Background>
  );
};

export const FormLoading: Story = {
  render: () => <FormLoadingExample />,
};
