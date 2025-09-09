import {
  ConnectedCheckbox,
  ConnectedForm,
  ConnectedFormGroupProps,
  ConnectedFormProps,
  ConnectedInput,
  ConnectedNestedCheckboxes,
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
        nestedCheckboxesField: [],
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
        console.log('values', values);
        action('Form Submitted')(values);
      }}
      {...connectedFormProps}
      {...connectedForm}
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
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
        label="select field"
        name="selectField"
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedInput,
          icon: TerminalIcon,
        }}
        label="input field"
        name="inputField"
        {...connectedFormGroup}
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
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedTextArea,
        }}
        label="text area field"
        name="textAreaField"
        {...connectedFormGroup}
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedNestedCheckboxes,
          options: [
            {
              value: 'frontend',
              label: 'Frontend Technologies',
              children: [
                { value: 'react', label: 'React' },
                {
                  value: 'vue',
                  label: 'Vue.js',
                  children: [
                    { value: 'test', label: 'Test' },
                    { value: 'test2', label: 'Test2' },
                  ],
                },
                { value: 'angular', label: 'Angular' },
              ],
            },
            {
              value: 'backend',
              label: 'Backend Technologies',
              children: [
                { value: 'node', label: 'Node.js' },
                { value: 'python', label: 'Python' },
                { value: 'java', label: 'Java' },
              ],
            },
          ],
          onUpdate: (selectedValues) =>
            console.log('Selected:', selectedValues),
        }}
        label="nested checkboxes field"
        name="nestedCheckboxesField"
      />
    </ConnectedForm>
  );
};

export const Default: Story = {
  render: () => (
    <ConnectedFormPlayground connectedForm={{}} connectedFormGroup={{}} />
  ),
};
