import {
  ConnectedCheckbox,
  ConnectedFormGroup,
  FormWrapper,
  Input,
  Select,
  SubmitButton,
} from '@codecademy/gamut/src';
import { Background } from '@codecademy/gamut-styles';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const HEY2 = () => {
  const { register } = useFormContext();

  return (
    <>
      <ConnectedFormGroup
        name="my-field"
        label="hi"
        size="large"
        spacing="tight"
      >
        <ConnectedCheckbox
          label="check me out"
          name="my-field"
          htmlFor="my-field"
          validation={{ required: 'check it...' }}
        />
      </ConnectedFormGroup>
      <ConnectedFormGroup
        name="your-field"
        label="hey"
        size="large"
        spacing="tight"
      >
        <Select
          name="your-field"
          htmlFor="your-field"
          ref={register({ required: 'check it...' })}
          options={['one', 'two', 'three']}
        />
      </ConnectedFormGroup>
      <ConnectedFormGroup name="another-field" label="hey" size="large">
        <Input
          name="our-field"
          htmlFor="our-field"
          ref={register({ required: 'check it...' })}
        />
      </ConnectedFormGroup>
      <SubmitButton mt={8}>submit!!!</SubmitButton>
    </>
  );
};

export const HEY = () => {
  return (
    <Background bg="paleGreen">
      <FormWrapper
        onSubmit={(values) => console.log(values)}
        defaultValues={{ 'that-field': true, 'our-field': 'boo' }}
        p={12}
      >
        <HEY2 />
      </FormWrapper>
    </Background>
  );
};
