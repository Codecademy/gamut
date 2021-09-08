import {
  ConnectedCheckbox,
  FormWrapper,
  SubmitButton,
} from '@codecademy/gamut/src';
import React from 'react';

export const HEY = () => {
  return (
    <FormWrapper onSubmit={() => console.log('hey')}>
      <ConnectedCheckbox namf="fdkfsldk" />
      <SubmitButton>submit!!!</SubmitButton>
    </FormWrapper>
  );
};
