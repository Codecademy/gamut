import {
  ConnectedCheckbox,
  ConnectedForm,
  ConnectedFormGroupProps,
  ConnectedFormProps,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  ConnectedTextArea,
  FormRequiredText,
  SubmitButton,
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

  const { ConnectedFormGroup, ConnectedForm, connectedFormProps } =
    useConnectedForm({
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

type ConnectedFormPlayground = {
  connectedForm: Omit<
    ConnectedFormProps<any>,
    'defaultValue' | 'validationRules' | 'watchedFields' | 'onSubmit'
  >;
  connectedFormGroup: Omit<
    ConnectedFormGroupProps<any>,
    'name' | 'label' | 'field'
  >;
};

const ConnectedFormPlayground: React.FC<ConnectedFormPlayground> = ({
  connectedForm,
  connectedFormGroup,
}) => {
  const { ConnectedFormGroup, ConnectedForm, connectedFormProps } =
    useConnectedForm({
      defaultValues: {
        checkboxField: false,
        selectField: 'zero',
        inputField: '',
        radioGroupField: undefined,
        textAreaField: '',
      },
      validationRules: {
        checkboxField: { required: 'you need to check this.' },
        selectField: {
          pattern: {
            value: /^(?:(?!zero).)*$/,
            message: 'literally anything but zero',
          },
        },
        inputField: { required: 'we need this info, bud' },
        radioGroupField: { required: 'we need this info too, bud' },
        textAreaField: {
          required: 'you just have to fill out the whole thing, okay?',
        },
      },
    });

  return (
    <ConnectedForm
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      minHeight="50rem"
      {...connectedFormProps}
      {...connectedForm}
    >
      <SubmitButton m={8}>submit this form</SubmitButton>
      <FormRequiredText />
      <ConnectedFormGroup
        name="checkboxField"
        label="checkbox field"
        field={{
          component: ConnectedCheckbox,
          label: <div>check it ouuut</div>,
          'aria-label': 'aria label',
        }}
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        name="selectField"
        label="select field"
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        name="inputField"
        label="input field"
        field={{
          component: ConnectedInput,
          icon: TerminalIcon,
        }}
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        name="radioGroupField"
        label="radio group field"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            {
              label: (
                <>
                  <MiniArrowRightIcon mr={4} /> a
                </>
              ),
              value: 'a',
            },
            {
              label: (
                <>
                  <MiniArrowRightIcon mr={4} /> b
                </>
              ),
              value: 'b',
            },
            {
              label: (
                <>
                  <MiniArrowRightIcon mr={4} /> c
                </>
              ),
              value: 'c',
            },
            {
              label: (
                <>
                  <MiniArrowRightIcon mr={4} />
                  zilch
                </>
              ),
              value: 'zilch',
            },
          ],
        }}
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        name="textAreaField"
        label="text area field"
        field={{
          component: ConnectedTextArea,
        }}
        {...connectedFormGroup}
      />
    </ConnectedForm>
  );
};

export const Default: Story = {
  render: () => (
    <ConnectedFormPlayground connectedForm={{}} connectedFormGroup={{}} />
  ),
};
