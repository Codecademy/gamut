/* eslint-disable local-rules/gamut-import-paths */
import {
  ConnectedCheckbox,
  ConnectedFormGroup,
  ConnectedSelect,
  FormWrapper,
  SubmitButton,
} from '@codecademy/gamut/src';
import { StreakIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import React from 'react';

export const HEY = () => {
  return (
    <Background
      bg="paleGreen"
      border={1}
      borderColor="navy"
      p={32}
      display="flex"
    >
      <FormWrapper
        onSubmit={(values) => console.log(values)}
        defaultValues={{ 'check-field-0': true, 'our-field': 'boo' }}
      >
        <SubmitButton variant="secondary" m={16}>
          <StreakIcon />
          i'm a submit button up here for some reason
          <StreakIcon />
        </SubmitButton>

        <ConnectedFormGroup
          name="your-field"
          label="hey"
          size="large"
          spacing="tight"
        >
          <ConnectedSelect
            name="your-field"
            htmlFor="your-field"
            validation={{ required: 'check it...' }}
            options={['one', 'two', 'three']}
          />
        </ConnectedFormGroup>
        <Background bg="navy" p={12} mt={12} borderRadius="10px">
          <ConnectedFormGroup name="check-field-0" label="hi" spacing="tight">
            <ConnectedCheckbox
              label="check me out"
              name="check-field-0"
              htmlFor="check-field-0"
              validation={{ required: 'check it...' }}
              spacing="tight"
            />
          </ConnectedFormGroup>
          <ConnectedFormGroup name="check-field-1" label="hi" spacing="tight">
            <ConnectedCheckbox
              label="check me out"
              name="check-field-1"
              htmlFor="check-field-1"
              validation={{ required: 'check it...' }}
              spacing="tight"
            />
          </ConnectedFormGroup>
          <ConnectedFormGroup name="check-field-2" label="hi" spacing="tight">
            <ConnectedCheckbox
              label="check me out"
              name="check-field-2"
              htmlFor="check-field-2"
              validation={{ required: 'check it...' }}
              spacing="tight"
            />
          </ConnectedFormGroup>
        </Background>
      </FormWrapper>
    </Background>
  );
};
