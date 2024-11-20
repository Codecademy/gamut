import { ConnectedCheckbox, ConnectedForm,  ConnectedRadioGroupInput,
  SubmitButton ,
  Text,
  useConnectedForm,
} from '@codecademy/gamut';
import { MiniArrowRightIcon, TerminalIcon } from '@codecademy/gamut-icons';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import * as React from 'react';

const meta: Meta<typeof ConnectedForm> = {
  component: ConnectedForm,
  args: {},
};

export default meta;
type Story = StoryObj<typeof ConnectedForm>;

export const Default: Story = {
  // Testing if imgs work in stories
  args: {
    children: <img src="./cinna.jpg" alt="jpeg" />,
  },
};

export const RadioWatchExample = () => {
  const [showRadio, setShowRadio] = useState(false);
  const [lastFormValues, setLastFormValues] = useState({
    checkbox: 'not submitted',
    radioGroup: 'not submitted',
  });

  const handleWatch = (values: string[]) => {
    const [checkbox] = values;
    return checkbox ? setShowRadio(true) : setShowRadio(false);
  };

  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
  } = useConnectedForm({
    defaultValues: {
      checkbox: false,
      radioGroup: undefined,
    },
    validationRules: {
      radioGroup: {
        required: 'please fill this out.',
      },
    },
    watchedFields: {
      fields: ['checkbox', 'radioGroup'],
      watchHandler: handleWatch,
    },
  });

  return (
    <ConnectedForm
      onSubmit={({ checkbox, radioGroup }) => {
        setLastFormValues({
          checkbox: `${checkbox}`,
          radioGroup: `${radioGroup}`,
        });
      }}
      onError={(errors) => errors}
      resetOnSubmit
      {...connectedFormProps}
    >
      <Text as="code" lineHeight="base" mb={24}>
        your last answers were {lastFormValues.checkbox} and{' '}
        {lastFormValues.radioGroup}!
      </Text>
      <ConnectedFormGroup
        name="checkbox"
        label="a special checkbox"
        spacing="tight"
        field={{
          component: ConnectedCheckbox,
          label: 'check me to view the radio',
          spacing: 'tight',
        }}
      />
      {showRadio && (
        <ConnectedFormGroup
          name="radioGroup"
          label="cool radiogroup bruh"
          field={{
            component: ConnectedRadioGroupInput,
            options: [
              { label: 'one', value: 'one' },
              { label: 'two', value: 'two' },
              { label: 'zero', value: 'zero' },
            ],
          }}
        />
      )}
      <SubmitButton m={8}>submit the form, please</SubmitButton>
    </ConnectedForm>
  );
};

export const WatchedFields: Story = {
  render: () => <RadioWatchExample />,
};
