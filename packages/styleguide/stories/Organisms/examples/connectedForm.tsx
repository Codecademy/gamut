/* eslint-disable local-rules/gamut-import-paths */
import {
  Box,
  Card,
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  ConnectedTextArea,
  FloatingCard,
  SubmitButton,
  Text,
  useConnectedForm,
  useFormState,
} from '@codecademy/gamut/src';
import { TerminalIcon, ViewIcon } from '@codecademy/gamut-icons';
import { Keyhole } from '@codecademy/gamut-illustrations';
import { DotDense } from '@codecademy/gamut-patterns';
import { Background } from '@codecademy/gamut-styles';
import React from 'react';

const INeedSomeSpace: React.FC = ({ children }) => {
  return <Box m={16}>{children}</Box>;
};

const TestZero = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
  } = useConnectedForm({
    defaultValues: {
      thisField: true,
      thatField: 'zero!',
      anotherField: 'state your name',
    },
    validationRules: {
      thisField: { required: 'yes' },
      thatField: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'notZero',
        },
      },
    },
  });

  return (
    <ConnectedForm
      onSubmit={({ thisField }) => console.log(thisField)}
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        name="thisField"
        label="cool"
        field={{
          component: ConnectedCheckbox,
          label: 'check it ouuuut',
        }}
      />
      <ConnectedFormGroup
        name="thatField"
        label="cool"
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
      />
      <ConnectedFormGroup
        name="anotherField"
        label="cool"
        field={{
          component: ConnectedInput,
          icon: TerminalIcon,
        }}
      />
    </ConnectedForm>
  );
};

export const TestOne = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
  } = useConnectedForm({
    defaultValues: {
      cool: 'gnbsdlfkjndlskfj',
      beans: 'beans!',
      check: true,
      selected: 'not to mention nested',
      tv: undefined,
    },
    validationRules: {
      cool: { required: 'explain yourself cool' },
      beans: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'zero to hero',
        },
      },
      check: { required: 'explain yourself check' },
      selected: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'not zero.',
        },
      },
    },
  });

  return (
    <ConnectedForm
      m={64}
      p={64}
      onSubmit={(values) => console.log(values)}
      resetOnSubmit
      {...connectedFormProps}
    >
      <SubmitButton variant="secondary" m={32}>
        dont forget to submit
      </SubmitButton>
      <ConnectedFormGroup
        name="cool"
        label="cool"
        field={{
          component: ConnectedInput,
        }}
      />
      <ConnectedFormGroup
        name="beans"
        label="beans"
        field={{
          component: ConnectedInput,
        }}
      />
      <ConnectedFormGroup
        name="check"
        label="ah yes a check"
        field={{
          component: ConnectedCheckbox,
          label: 'yeeeees',
        }}
      />
      <ConnectedFormGroup
        name="selected"
        label="selected or dejected"
        field={{
          component: ConnectedSelect,
          options: [
            'perhaps just disrespected?',
            "but maybe that's expected",
            'zero',
          ],
        }}
      />
      <ConnectedFormGroup
        name="tv"
        label="tv on the radio"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'first' },
            { label: 'two', value: 'two' },
            { label: 'three', value: 'three' },
            { label: 'zilch', value: 'zero' },
          ],
        }}
      />
    </ConnectedForm>
  );
};

export const HEY: React.FC = () => {
  return (
    <Background
      bg="paleGreen"
      border={1}
      borderColor="navy"
      p={32}
      m={32}
      borderRadius="10px"
    >
      <ConnectedForm
        onSubmit={(values) => console.log(values)}
        defaultValues={{
          'your-field': 'two',
          'example-icon': 'hey',
          'check-field-0': true,
          'check-field-1': false,
          'check-field-2': true,
          'our-field': 'boo',
          'example-radio-area': '5',
          'render-select': 'two',
        }}
        resetOnSubmit
        display="grid"
        gridTemplateRows="auto"
        gridTemplateAreas="'illo illo header header'
    'illo illo radio radio'
    'illo illo main main'
    'sidebar sidebar sidebar sidebar'"
      >
        <Box display="flex" justifyContent="flex-end">
          <FloatingCard beak="bottom-right" pattern={DotDense}>
            <SubmitButton variant="secondary" m={32}>
              dont forget to submit
            </SubmitButton>
          </FloatingCard>
        </Box>
        <Box
          gridArea="radio"
          bg="palePink"
          border={1}
          p={16}
          m={24}
          borderRadius="10px"
        >
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="example-radio-area"
              label="pls answer"
              field={{
                component: ConnectedRadioGroupInput,
                validation: {
                  pattern: {
                    value: /^(?:(?!zero).)*$/,
                    message: 'not zero.',
                  },
                },
                options: [
                  { label: 'one', value: 'first' },
                  { label: 'two', value: 'two' },
                  { label: 'three', value: 'three' },
                  { label: 'zilch', value: 'zero' },
                ],
              }}
            />
          </INeedSomeSpace>
          <INeedSomeSpace>
            hi
            <ConnectedSelect
              name="render-input-two"
              validation={{ required: 'hey' }}
              options={['one', 'two']}
            />
          </INeedSomeSpace>
        </Box>
        <Box
          gridArea="main"
          bg="palePink"
          border={1}
          p={24}
          my={12}
          mx={24}
          borderRadius="10px"
        >
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="render-select"
              label="render select ok"
              field={{
                component: ConnectedSelect,
                validation: {
                  pattern: {
                    value: /^(?:(?!zero).)*$/,
                    message: 'zero to hero',
                  },
                },
                options: ['zero', 'two', 'three'],
              }}
            />
            <ConnectedFormGroup
              name="render-select"
              label="render select ok tré"
              field={{
                component: ConnectedSelect,
                options: ['zero', 'one', 'two'],
                validation: {
                  pattern: {
                    value: /^(?:(?!zero).)*$/,
                    message: 'zero to hero',
                  },
                },
              }}
            />
            <ConnectedFormGroup
              name="render-input"
              label="render input ok"
              field={{
                component: ConnectedInput,
                validation: {
                  pattern: {
                    value: /^(?:(?!zero).)*$/,
                    message: 'zero to hero',
                  },
                },
              }}
            />
            <ConnectedFormGroup
              name="render-radio"
              label="render radio ok"
              field={{
                component: ConnectedRadioGroupInput,
                validation: {
                  required: 'hey...',
                },
                options: [
                  { label: 'one', value: 'first' },
                  { label: 'two', value: 'two' },
                  { label: 'three', value: 'three' },
                  { label: 'zilch', value: 'zero' },
                ],
              }}
            />
          </INeedSomeSpace>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="example-icon"
              label="write text in here"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedInput,
                icon: ViewIcon,
              }}
            />
          </INeedSomeSpace>
        </Box>
        <Card shadow="medium" gridArea="illo">
          <Keyhole />
          <Background
            bg="navy-900"
            borderRadius="10px"
            display="flex"
            justifyContent="center"
            p={16}
          >
            <Text as="code" justifySelf="center" truncate="fade">
              we are always watching......
            </Text>
          </Background>
        </Card>

        <Background
          gridArea="sidebar"
          bg="navy"
          p={16}
          mt={12}
          borderRadius="10px"
        >
          <Card shadow="medium">
            <ConnectedFormGroup
              name="check-field-0"
              label="hi"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedCheckbox,
                label: 'check me out',
                validation: { required: 'check it...' },
                spacing: 'tight',
              }}
            />
            <ConnectedFormGroup
              name="check-field-1"
              label="hi"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedCheckbox,
                label: 'check me out',
                validation: { required: 'check it...' },
                spacing: 'tight',
              }}
            />
            <ConnectedFormGroup
              name="check-field-2"
              label="hi"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedCheckbox,
                label: 'check me out',
                validation: { required: 'check it...' },
                spacing: 'tight',
              }}
            />
          </Card>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="example-text-area"
              label="write text in here"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedTextArea,
                placeholder: 'pls write your doctoral thesis ty',
              }}
            />
          </INeedSomeSpace>
        </Background>
      </ConnectedForm>
    </Background>
  );
};
