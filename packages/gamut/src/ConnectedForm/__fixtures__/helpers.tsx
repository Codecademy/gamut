import React from 'react';

import {
  ConnectedCheckbox,
  ConnectedFormGroup,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  SubmitButton,
} from '..';

export const PlainConnectedFields = () => {
  return (
    <>
      <ConnectedFormGroup
        name="checkbox"
        label="cool-checkbox"
        field={{
          component: ConnectedCheckbox,
          label: 'cool-checkbox',
        }}
      />
      <SubmitButton variant="secondary" m={32}>
        submit this form.
      </SubmitButton>
      <ConnectedFormGroup
        name="select"
        label="cool-select"
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
      />
      <ConnectedFormGroup
        name="input"
        label="cool-input"
        field={{
          component: ConnectedInput,
        }}
      />
      <ConnectedFormGroup
        name="radiogroup"
        label="cool-radiogroup"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'three', value: 'three' },
          ],
        }}
      />
    </>
  );
};

export const ValidatedConnectedFields = () => {
  return (
    <>
      <ConnectedFormGroup
        name="checkbox"
        label="cool-checkbox"
        field={{
          component: ConnectedCheckbox,
          label: 'cool-checkbox',
          validation: { required: 'you must click.' },
        }}
      />
      <SubmitButton variant="secondary" m={32}>
        submit this form.
      </SubmitButton>
      <ConnectedFormGroup
        name="select"
        label="cool-select"
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
          validation: { required: 'you must select.' },
        }}
      />
    </>
  );
};
