import { ConnectedFormGroup, ConnectedRadioGroupInput, useConnectedForm } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConnectedFormGroup> = {
  component: ConnectedFormGroup,
  args: {},
};

export default meta;
type Story = StoryObj<typeof ConnectedFormGroup>;

const FormGroupStates = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
  } = useConnectedForm({
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
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
      resetOnSubmit
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        name="radioGroup"
        label="default state"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
      />
      <ConnectedFormGroup
        name="radioGroupError"
        label="error state"
        customError="custom error"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
      />
      <ConnectedFormGroup
        name="radioGroupDisabled"
        label="disabled state"
        disabled
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
      />
    </ConnectedForm>
  );
};



export const Default: Story = {
  render: () => <FormGroupStates />,
};
