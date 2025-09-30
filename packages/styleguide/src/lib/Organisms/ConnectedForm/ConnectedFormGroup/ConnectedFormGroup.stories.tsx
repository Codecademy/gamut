import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedRadioGroupInput,
  useConnectedForm,
} from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConnectedFormGroup> = {
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
