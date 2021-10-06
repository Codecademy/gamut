/* eslint-disable local-rules/gamut-import-paths */
import {
  Box,
  Card,
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  ConnectedTextArea,
  FlexBox,
  FloatingCard,
  SubmitButton,
  Text,
  useConnectedForm,
} from '@codecademy/gamut/src';
import { TerminalIcon, ViewIcon } from '@codecademy/gamut-icons';
import { Keyhole } from '@codecademy/gamut-illustrations';
import { DotDense } from '@codecademy/gamut-patterns';
import { Background } from '@codecademy/gamut-styles';
import React from 'react';

const INeedSomeSpace: React.FC = ({ children }) => {
  return <Box m={16}>{children}</Box>;
};

export const VeryCoolForm = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
  } = useConnectedForm({
    defaultValues: {
      thisField: true,
      thatField: 'zero',
      anotherField: 'state your name',
    },
    validationRules: {
      thisField: { required: 'you need to check this, its important i SWEAR' },
      thatField: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'literally anything but zero',
        },
      },
    },
  });

  return (
    <Background bg="black" p={48}>
      <ConnectedForm
        onSubmit={({ thisField }) => thisField}
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
        <Box>
          <Text>I have something important to tell you.</Text>
          <SubmitButton variant="secondary" m={32}>
            submit this form.
          </SubmitButton>
        </Box>
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
    </Background>
  );
};

export const FancyConnectedFormExample: React.FC = () => {
  const {
    ConnectedFormGroup,
    ConnectedForm,
    connectedFormProps,
  } = useConnectedForm({
    defaultValues: {
      exampleRadioArea0: undefined,
      select0: undefined,
      select1: 'two',
      select2: undefined,
      input1: 'hey there.',
      exampleRadioArea1: '5',
      exampleIcon: 'hey',
      check0: true,
      check1: false,
      check2: true,
      exampleTextArea: '',
    },
    validationRules: {
      exampleRadioArea0: {
        required: 'you must make a decision',
      },
      select0: { required: 'hey..' },
      select1: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'zero to hero',
        },
      },
      select2: {
        pattern: {
          value: /^(?:(?!one).)*$/,
          message: 'anything but one',
        },
      },
      input1: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'zero to hero',
        },
      },
      check0: { required: 'check it...' },
      check1: { required: 'check it...' },
      check2: { required: 'check it...' },
    },
  });

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
        onSubmit={(values) => values}
        resetOnSubmit
        display="grid"
        gridTemplateRows="auto"
        gridTemplateAreas="'illo illo header header'
    'illo illo rightBar rightBar'
    'main main main main'
    'footer footer footer footer'"
        {...connectedFormProps}
      >
        <Box gridArea="header" display="flex" justifyContent="flex-end">
          <Box>
            <FloatingCard beak="bottom-right" pattern={DotDense}>
              <SubmitButton variant="secondary" m={32}>
                dont forget to submit
              </SubmitButton>
            </FloatingCard>
          </Box>
        </Box>
        <Box
          gridArea="rightBar"
          bg="palePink"
          border={1}
          p={16}
          m={24}
          borderRadius="10px"
        >
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="exampleRadioArea0"
              label="pls answer"
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
          </INeedSomeSpace>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="select0"
              label="pls... answer..."
              field={{
                component: ConnectedSelect,
                options: ['one', 'two'],
              }}
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
              name="select1"
              label="render select ok"
              field={{
                component: ConnectedSelect,
                options: ['zero', 'two', 'three'],
              }}
            />
            <ConnectedFormGroup
              name="select2"
              label="render select ok tré"
              field={{
                component: ConnectedSelect,
                options: ['zero', 'one', 'two'],
              }}
            />
            <ConnectedFormGroup
              name="input1"
              label="render input ok"
              field={{
                component: ConnectedInput,
              }}
            />
          </INeedSomeSpace>
          <FlexBox m={12}>
            <ConnectedFormGroup
              name="exampleRadioArea1"
              label="render radio ok"
              field={{
                component: ConnectedRadioGroupInput,
                options: [
                  { label: 'one', value: '1' },
                  { label: 'two', value: '2' },
                  { label: 'three', value: '2' },
                  { label: 'four', value: '4' },
                  { label: 'five', value: '5' },
                ],
              }}
            />
            <ConnectedFormGroup
              name="exampleIcon"
              label="write text in here"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedInput,
                icon: ViewIcon,
              }}
            />
          </FlexBox>
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
          gridArea="footer"
          bg="navy"
          p={16}
          mt={12}
          borderRadius="10px"
        >
          <Card shadow="medium">
            <ConnectedFormGroup
              name="check0"
              label="hi"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedCheckbox,
                label: 'check me out',
                spacing: 'tight',
              }}
            />
            <ConnectedFormGroup
              name="check1"
              label="hi"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedCheckbox,
                label: 'check me out',
                spacing: 'tight',
              }}
            />
            <ConnectedFormGroup
              name="check2"
              label="hi"
              spacing="tight"
              errorType="initial"
              field={{
                component: ConnectedCheckbox,
                label: 'check me out',
                spacing: 'tight',
              }}
            />
          </Card>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="exampleTextArea"
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
