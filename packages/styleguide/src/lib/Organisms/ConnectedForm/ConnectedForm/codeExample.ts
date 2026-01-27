export const codeExample = `import {
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedSelect,
  useConnectedForm,
} from '@codecademy/gamut';

import { TerminalIcon } from '@codecademy/gamut-icons';

export const GoodForm = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
    FormRequiredText,
  } = useConnectedForm({
    defaultValues: {
      thisField: true,
      thatField: 'zero',
      anotherField: 'state your name.',
    },
    validationRules: {
      thisField: { required: 'you need to check this.' },
      thatField: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'literally anything but zero',
        },
      },
    },
  });

  return (
    <ConnectedForm
      onSubmit={({ thisField }) => console.log(thisField)}
      resetOnSubmit
      {...connectedFormProps}
    >
      <SubmitButton>submit this form.</SubmitButton>
      <ConnectedFormGroup
        name="thisField"
        label="cool checkbox bruh"
        field={{
          component: ConnectedCheckbox,
          label: 'check it ouuut',
        }}
      />
      <ConnectedFormGroup
        name="thatField"
        label="cool select dude"
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
      />
      <ConnectedFormGroup
        name="anotherField"
        label="cool input"
        field={{
          component: ConnectedInput,
          icon: TerminalIcon,
        }}
      />
      <FormRequiredText />
    </ConnectedForm>
  );
};`;
