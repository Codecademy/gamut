import * as React from 'react';

import {
  ConnectedCheckbox,
  ConnectedFormGroup,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  SubmitButton,
} from '..';

export const PlainConnectedFields: React.FC<{
  onChangeValidation?: boolean;
}> = ({ onChangeValidation }) => {
  return (
    <>
      <ConnectedFormGroup
        field={{
          component: ConnectedCheckbox,
          label: 'cool-checkbox',
        }}
        label="cool-checkbox"
        name="checkbox"
      />
      <SubmitButton
        disabled={onChangeValidation ? ({ isValid }) => !isValid : undefined}
        m={32}
        variant="secondary"
      >
        submit this form.
      </SubmitButton>
      <ConnectedFormGroup
        field={{
          component: ConnectedSelect,
          options: ['', 'one', 'two', 'zero'],
        }}
        label="cool-select"
        name="select"
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedInput,
        }}
        label="cool-input"
        name="input"
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'three', value: 'three' },
          ],
        }}
        label="cool-radiogroup"
        name="radiogroup"
      />
    </>
  );
};
