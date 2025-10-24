import { GridForm } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof GridForm> = {
  component: GridForm,
};

export default meta;
type Story = StoryObj<typeof GridForm>;

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
