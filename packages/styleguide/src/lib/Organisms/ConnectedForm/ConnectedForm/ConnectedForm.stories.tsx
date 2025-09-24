import {
  ConnectedCheckbox,
  ConnectedForm,
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
import type { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ConnectedForm> = {
  component: ConnectedForm,
  args: {},
};

export default meta;

export const Default = () => {
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
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="50rem"
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
      {...connectedFormProps}
    >
      <SubmitButton m={8}>submit this form</SubmitButton>
      <FormRequiredText />
      <ConnectedFormGroup
        field={{
          component: ConnectedCheckbox,
          label: <div>check it ouuut</div>,
          'aria-label': 'aria label',
        }}
        label="checkbox field"
        name="checkboxField"
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
        label="select field"
        name="selectField"
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedInput,
          icon: TerminalIcon,
        }}
        label="input field"
        name="inputField"
      />
      <ConnectedFormGroup
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
        label="radio group field"
        name="radioGroupField"
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedTextArea,
        }}
        label="text area field"
        name="textAreaField"
      />
    </ConnectedForm>
  );
};

export const WatchedFields = () => {
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
      resetOnSubmit
      onError={(errors) => errors}
      onSubmit={({ checkbox, radioGroup }) => {
        setLastFormValues({
          checkbox: `${checkbox}`,
          radioGroup: `${radioGroup}`,
        });
      }}
      {...connectedFormProps}
    >
      <Text as="code" lineHeight="base" mb={24}>
        your last answers were {lastFormValues.checkbox} and{' '}
        {lastFormValues.radioGroup}!
      </Text>
      <ConnectedFormGroup
        field={{
          component: ConnectedCheckbox,
          label: 'check me to view the radio',
          spacing: 'tight',
        }}
        label="a special checkbox"
        name="checkbox"
        spacing="tight"
      />
      {showRadio && (
        <ConnectedFormGroup
          field={{
            component: ConnectedRadioGroupInput,
            options: [
              { label: 'one', value: 'one' },
              { label: 'two', value: 'two' },
              { label: 'zero', value: 'zero' },
            ],
          }}
          label="cool radiogroup bruh"
          name="radioGroup"
        />
      )}
      <SubmitButton m={8}>submit the form, please</SubmitButton>
    </ConnectedForm>
  );
};
