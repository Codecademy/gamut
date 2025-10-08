import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedRadioGroupInput,
  useConnectedForm,
} from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof ConnectedFormGroup>> = {
  component: ConnectedFormGroup,
  args: {
    field: {
      component: ConnectedRadioGroupInput,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
        { label: 'zero', value: 'zero' },
      ],
    } as ConnectedFormGroupProps<typeof ConnectedRadioGroupInput>['field'],
    label: 'i am a label',
    name: 'radioGroupExample',
  },
  argTypes: {
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    infotip: {
      table: {
        disable: true,
      },
    },
    'infotip.emphasis': {
      control: 'radio',
      options: ['high', 'low'],
      table: {
        defaultValue: { summary: 'low' },
        type: { summary: 'high | low' },
      },
    },
    'infotip.alignment': {
      control: 'radio',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      table: {
        defaultValue: { summary: 'top-right' },
        type: { summary: 'bottom-left | bottom-right | top-left | top-right' },
      },
    },
    'infotip.placement': {
      control: 'radio',
      options: ['floating', 'inline'],
      table: {
        defaultValue: { summary: 'inline' },
        type: { summary: 'floating | inline' },
      },
    },
    'infotip.narrow': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description:
        'Forces the tooltip to be its narrowest width. For use along the edges of the page or other tight spaces.',
    },
    'infotip.inheritDims': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description:
        'If ToolTipWrapper should inherit the dimensions of the parent element. Can only be used for inline tips.',
    },
    'infotip.info': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      description: 'The text for the infotip.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectedFormGroup>;

export const Default: Story = {
  render: (args) => (
    <ConnectedForm
      mt={12}
      resetOnSubmit
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    >
      <ConnectedFormGroup {...args} />
    </ConnectedForm>
  ),
};

export const States = () => {
  const { ConnectedFormGroup, ConnectedForm, connectedFormProps } =
    useConnectedForm({
      defaultValues: {
        radioGroup: undefined,
        radioGroupError: undefined,
        radioGroupDisabled: undefined,
      },
      validationRules: {
        radioGroup: {
          required: 'please fill this out.',
        },
      },
    });

  return (
    <ConnectedForm
      display="flex"
      mt={12}
      resetOnSubmit
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
        label="default state"
        name="radioGroup"
      />
      <ConnectedFormGroup
        customError="custom error"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
        label="error state"
        name="radioGroupError"
      />
      <ConnectedFormGroup
        disabled
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
        label="disabled state"
        name="radioGroupDisabled"
      />
    </ConnectedForm>
  );
};
