import {
  Box,
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedSelect,
  SubmitButton,
  Text,
  useConnectedForm,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import React from 'react';

export const VeryCoolForm = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
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
    <Background bg="black" p={48}>
      <ConnectedForm
        onSubmit={({ thisField }) => console.log(thisField)}
        {...connectedFormProps}
      >
        <ConnectedFormGroup
          name="thisField"
          label="cool"
          field={{
            component: ConnectedCheckbox,
            label: 'check it ouuut',
          }}
        />
        <Box bg="secondary-hover" borderRadius="50px">
          <Text>I have something important to tell you...</Text>
          <SubmitButton variant="secondary" m={32}>
            submit this form.
          </SubmitButton>
        </Box>
        <ConnectedFormGroup
          name="thatField"
          label="cool"
          field={{
            component: ConnectedSelect,
            options: ['one', 'two', 'zero'],
          }}
        />
        <ConnectedFormGroup
          name="anotherField"
          label="cool"
          field={{
            component: ConnectedInput,
          }}
        />
      </ConnectedForm>
    </Background>
  );
};
