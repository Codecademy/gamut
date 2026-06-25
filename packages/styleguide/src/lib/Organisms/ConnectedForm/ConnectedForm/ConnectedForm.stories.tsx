import {
  ConnectedCheckbox,
  ConnectedForm,
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
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { action } from 'storybook/actions';

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
        nestedCheckboxesField: ['angular', 'typescript', 'backend'],
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
        // eslint-disable-next-line no-console
        console.log('Form Submitted', values);
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
      <ConnectedFormGroup
        field={{
          component: ConnectedNestedCheckboxes,
          options: [
            {
              value: 'frontend',
              label: 'Frontend Technologies',
              options: [
                {
                  value: 'react',
                  label: 'React',
                  options: [
                    { value: 'nextjs', label: 'Next.js' },
                    { value: 'typescript', label: 'TypeScript' },
                  ],
                },
                {
                  value: 'vue',
                  label: 'Vue.js',
                },
                { value: 'angular', label: 'Angular' },
              ],
            },
            {
              value: 'backend',
              label: 'Backend Technologies',
              options: [
                { value: 'node', label: 'Node.js' },
                { value: 'python', label: 'Python' },
                { value: 'java', label: 'Java' },
              ],
            },
          ],
          onUpdate: (selectedValues) =>
            // eslint-disable-next-line no-console
            console.log('Selected:', selectedValues),
        }}
        label="nested checkboxes field"
        name="nestedCheckboxesField"
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

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const CustomFieldValidations = () => {
  const [numberType, setNumberType] = useState('even');

  // validationRules are memoized on mount, so the "must be even/odd" rule
  // can't live there — it depends on numberType's runtime value. customValidations
  // on the field prop re-evaluates each render, making this cross-field
  // dependency possible.
  const { ConnectedFormGroup, ConnectedForm, connectedFormProps } =
    useConnectedForm({
      defaultValues: { numberType: 'even', number: '' },
      validationRules: {
        numberType: { required: 'Please select a number type' },
        number: { required: 'Please select a number' },
      },
      watchedFields: {
        fields: ['numberType'],
        watchHandler: ([type]: string[]) => setNumberType(type),
      },
    });

  return (
    <ConnectedForm
      display="flex"
      flexDirection="column"
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        field={{
          component: ConnectedSelect,
          options: ['even', 'odd'],
        }}
        label="Number type"
        name="numberType"
      />
      <ConnectedFormGroup
        field={{
          component: ConnectedSelect,
          options: numbers,
          customValidations: {
            validate: (value: string) => {
              if (!value) return true;
              const num = parseInt(value, 10);
              if (numberType === 'even') {
                return num % 2 === 0 || `${value} is odd — pick an even number`;
              }
              return num % 2 !== 0 || `${value} is even — pick an odd number`;
            },
          },
        }}
        label={`Pick an ${numberType} number`}
        name="number"
      />
      <SubmitButton mt={8}>Submit</SubmitButton>
    </ConnectedForm>
  );
};
