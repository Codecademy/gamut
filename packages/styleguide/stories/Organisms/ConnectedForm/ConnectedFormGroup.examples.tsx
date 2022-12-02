import { ConnectedRadioGroupInput, useConnectedForm } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';

export { ConnectedFormPlayground } from './ConnectedForm.examples';

export const FormGroupStates = () => {
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
        size="large"
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
        size="large"
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
        size="large"
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
