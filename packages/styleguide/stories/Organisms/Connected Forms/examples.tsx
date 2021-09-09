import {
  ConnectedCheckbox,
  ConnectedFormGroup,
  FormWrapper,
  SubmitButton,
} from '@codecademy/gamut/src';
import React from 'react';

export const HEY = () => {
  return (
    <FormWrapper
      onSubmit={(values) => console.log(values)}
      defaultValues={{ 'this-field': true }}
    >
      <ConnectedFormGroup name="this-field" label="hi" size="large">
        <ConnectedCheckbox
          label="check me out"
          name="this-field"
          htmlFor="this-field"
        />
      </ConnectedFormGroup>
      <SubmitButton>submit!!!</SubmitButton>
    </FormWrapper>
  );
};
