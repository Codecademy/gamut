import { GridForm } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof GridForm> = {
  component: GridForm,
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const DisabledInputs: Story = {
  args: {
    fields: [
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
    ],
    hideRequiredText: true,
    submit: {
      contents: 'Right Submit!?',
      position: 'right',
      size: 12,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
  },
};

export const OnFieldUpdate: Story = {
  args: {
    hideRequiredText: true,
    submit: {
      contents: 'Submit Me!?',
      size: 12,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
  },
  render: function OnFieldUpdate(args) {
    const [text, setText] = useState('');
    return (
      <>
        <>The text value is: {text}</>
        <GridForm
          {...args}
          fields={[
            {
              label: 'Text with onUpdate',
              name: 'onUpdate-simple-text',
              size: 3,
              type: 'text',
              onUpdate: setText,
            },
          ]}
        />
      </>
    );
  },
};

export const DisabledFieldsOnSubmit: Story = {
  args: {
    disableFieldsOnSubmit: true,
    fields: [
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
    ],
    hideRequiredText: true,
    submit: {
      contents: 'Submit Me 💖',
      size: 12,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
  },
};

export const ResetOnSubmit: Story = {
  args: {
    fields: [
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
    ],
    hideRequiredText: true,
    resetOnSubmit: true,
    submit: {
      contents: 'Submit Me 💖',
      size: 12,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
  },
};

export const FormLoading: Story = {
  args: {
    disableFieldsOnSubmit: true,
    fields: [
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
    ],
    hideRequiredText: true,
    resetOnSubmit: true,
    submit: {
      contents: 'Submit Me 💖',
      size: 5,
    },
  },
  render: function FormLoading(args) {
    const [loading, setLoading] = useState(false);

    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit = async () => {
      setLoading(true);
      await wait(2000);
      setLoading(false);
    };

    return (
      <GridForm
        {...args}
        submit={{
          loading,
          ...args.submit,
        }}
        onSubmit={onSubmit}
      />
    );
  },
};

export const CustomError: Story = {
  args: {
    fields: [
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
    ],
    submit: {
      contents: 'Submit Me!?',
      size: 12,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
  },
};

export const MarkdownErrors: Story = {
  args: {
    fields: [
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
    ],
    submit: {
      contents: 'Submit',
      size: 12,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
  },
};
