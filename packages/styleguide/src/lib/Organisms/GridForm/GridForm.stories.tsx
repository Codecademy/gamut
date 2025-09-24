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
import { ComponentProps, useState } from 'react';

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
    ],
    submit: {
      contents: 'Submit Me!?',
      size: 4,
    },
    onSubmit: (values) => {
      action('Form Submitted')(values);
    },
    validation: 'onSubmit',
    resetOnSubmit: true,
  },
};

export default meta;
type Story = StoryObj<typeof GridForm>;

export const Default: React.FC<ComponentProps<typeof GridForm>> = (args) => {
  return <GridForm {...args} />;
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

export const DisabledInputs: Story = {
  render: () => <DisabledInputsExample />,
};

const FormattedExample = () => {
  return (
    <GridForm
      fields={[
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
      ]}
      requiredTextProps={{ color: 'danger', variant: 'title-xs' }}
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

export const Formatted: Story = {
  render: () => <FormattedExample />,
};

const SubmitButtonPositionExample = () => {
  return (
    <LayoutGrid gap={8}>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'right-sub-simple-text',
              type: 'text',
              size: 12,
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
      </Column>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'center-sub-simple-text',
              type: 'text',
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            contents: 'Center Submit!?',
            position: 'center',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Column>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'left-sub-simple-text',
              type: 'text',
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            contents: 'Left Submit!?',
            position: 'left',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Column>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'stretch-sub-simple-text',
              type: 'text',
              size: 12,
            },
          ]}
          hideRequiredText
          submit={{
            contents: 'Stretch Submit!?',
            position: 'stretch',
            size: 12,
          }}
          onSubmit={(values) => {
            action('Form Submitted')(values);
          }}
        />
      </Column>
    </LayoutGrid>
  );
};

export const SubmitButtonPosition: Story = {
  render: () => <SubmitButtonPositionExample />,
};

const SubmitButtonOptionsExample = () => {
  return (
    <>
      <GridForm
        fields={[
          {
            label: 'Simple text',
            name: 'fill-button-simple-text',
            size: 6,
            type: 'text',
          },
        ]}
        hideRequiredText
        submit={{
          contents: 'Fill Button',
          size: 12,
        }}
        onSubmit={(values) => {
          action('Form Submitted')(values);
        }}
      />
      <GridForm
        fields={[
          {
            label: 'Simple text',
            name: 'cta-button-simple-text',
            size: 6,
            type: 'text',
          },
        ]}
        hideRequiredText
        submit={{
          type: 'cta',
          contents: 'CTA Button',
          size: 12,
        }}
        onSubmit={(values) => {
          action('Form Submitted')(values);
        }}
      />
      <GridForm
        fields={[
          {
            label: 'Simple text',
            name: 'fill-dark-mode-simple-text',
            size: 6,
            type: 'text',
          },
        ]}
        hideRequiredText
        submit={{
          contents: 'Fill Button Dark Mode',
          size: 12,
          mode: 'dark',
        }}
        onSubmit={(values) => {
          action('Form Submitted')(values);
        }}
      />
      <GridForm
        fields={[
          {
            label: 'Simple text',
            name: 'cta-dark-mode-simple-text',
            size: 6,
            type: 'text',
          },
        ]}
        hideRequiredText
        submit={{
          type: 'cta',
          contents: 'CTA Button Dark Mode',
          size: 12,
          mode: 'dark',
        }}
        onSubmit={(values) => {
          action('Form Submitted')(values);
        }}
      />
    </>
  );
};

export const SubmitButtonOptions: Story = {
  render: () => <SubmitButtonOptionsExample />,
};

const InlineExample = () => {
  return (
    <GridForm
      fields={[
        {
          hideLabel: true,
          label: 'Label',
          name: 'email',
          size: 8,
          type: 'text',
        },
      ]}
      submit={{
        contents: 'Inline Submit!?',
        size: 4,
        position: 'right',
      }}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const InlineSubmit: Story = {
  render: () => <InlineExample />,
};

const CancelButtonExample = () => {
  return (
    <GridForm
      cancel={{
        children: 'Cancel',
        onClick: () => {},
      }}
      fields={[
        {
          label: 'Simple text',
          name: 'right-sub-simple-text',
          type: 'text',
          size: 12,
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

export const CancelButton: Story = {
  render: () => <CancelButtonExample />,
};

const CustomInputsExample = () => {
  return (
    <GridForm
      fields={[
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

export const CustomInputs: Story = {
  render: () => <CustomInputsExample />,
};

const PlaceholderTextExample = () => {
  return (
    <GridForm
      fields={[
        {
          label: 'Email',
          placeholder: 'Your email',
          name: 'placeholder',
          type: 'email',
          size: 12,
        },
      ]}
      hideRequiredText
      submit={{
        contents: 'Submit Me!?',
        size: 6,
      }}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const PlaceholderText: Story = {
  render: () => <PlaceholderTextExample />,
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

const InfoTipExample = () => {
  return (
    <>
      <GridForm
        fields={[
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
              info: (
                <Markdown text="My grandmother used to tell me stories..." />
              ),
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
        ]}
        submit={{
          contents: 'Submit',
          size: 12,
        }}
        onSubmit={(values) => {
          action('Form Submitted')(values);
        }}
      />
    </>
  );
};

export const InfoTip: Story = {
  render: () => <InfoTipExample />,
};

const SectionsExample = () => {
  return (
    <GridForm
      fields={[
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
      ]}
      requiredTextProps={{ color: 'primary', fontStyle: 'italic' }}
      submit={{
        contents: 'Submit me',
        size: 12,
      }}
      validation="onSubmit"
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const Sections: Story = {
  render: () => <SectionsExample />,
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

const HiddenInputExample = () => {
  return (
    <GridForm
      fields={[
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

export const HiddenInput: Story = {
  render: () => <HiddenInputExample />,
};

const SweetContainerExample = () => {
  return (
    <GridForm
      fields={[
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
      ]}
      hideRequiredText
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

export const SweetContainer: Story = {
  render: () => <SweetContainerExample />,
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

const CheckboxSpacingExample = () => {
  return (
    <GridForm
      fields={[
        {
          description: 'i am cozy',
          name: 'cozy-check-0',
          size: 6,
          type: 'checkbox',
          id: 'cozy-check-0',
          defaultValue: true,
          spacing: 'tight',
          label: 'must check',
          validation: {
            required: 'sos',
          },
        },
        {
          description: 'i am also cozy',
          name: 'cozy-check-1',
          size: 6,
          type: 'checkbox',
          id: 'cozy-check-1',
          defaultValue: true,
          spacing: 'tight',
          label: 'must check',
          validation: {
            required: 'pls help',
          },
        },
        {
          description: 'i am cozy as well',
          name: 'cozy-check-2',
          size: 6,
          type: 'checkbox',
          id: 'cozy-check-2',
          defaultValue: true,
          label: 'you do not have to check this',
          spacing: 'tight',
        },
        {
          description: 'i am cozy too',
          name: 'cozy-check-3',
          size: 6,
          type: 'checkbox',
          id: 'cozy-check-3',
          defaultValue: true,
          label: 'you do not have to check this',
          spacing: 'tight',
        },
      ]}
      submit={{
        contents: 'Submit',
        position: 'right',
        size: 12,
      }}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    />
  );
};

export const CheckboxSpacing: Story = {
  render: () => <CheckboxSpacingExample />,
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

const HideRequiredTextExample = () => {
  return (
    <>
      <Background bg="paleBlue" p={32}>
        <GridForm
          fields={[
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
    </>
  );
};

export const HideRequiredText: Story = {
  render: () => <HideRequiredTextExample />,
};

const SoloFieldExample = () => {
  return (
    <>
      <Background bg="paleBlue" p={32}>
        <GridForm
          fields={[
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
          ]}
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

export const SoloField: Story = {
  render: () => <SoloFieldExample />,
};
