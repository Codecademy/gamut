/* eslint-disable local-rules/gamut-import-paths */
import {
  Box,
  Card,
  ConnectedCheckbox,
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedInput,
  ConnectedRadio,
  ConnectedRadioGroup,
  ConnectedSelect,
  ConnectedTextArea,
  FloatingCard,
  GridForm,
  Markdown,
  SubmitButton,
  Text,
  useFormState,
} from '@codecademy/gamut/src';
import { Keyhole } from '@codecademy/gamut-illustrations';
import { DotDense } from '@codecademy/gamut-patterns';
import { Background } from '@codecademy/gamut-styles';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';

import { ColorModeExampleWrapper } from '../Foundations/ColorMode/examples';

const onSubmit = action('Submitted!');

export const ColorModeExample = () => {
  return (
    <ColorModeExampleWrapper>
      <Box>
        <GridForm
          fields={[
            {
              fields: [
                {
                  label: 'hi?',
                  name: 'text01-color-mode',
                  size: 4,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Simple select (required)',
                  name: 'simple-select-color-mode',
                  options: [
                    '',
                    'One fish',
                    'Two fish',
                    'Red fish',
                    'Blue fish',
                  ],
                  size: 4,
                  type: 'select',
                  validation: {
                    required: 'Please select an option',
                  },
                },
                {
                  label: 'Write a paragraph.',
                  name: 'paragraph01-color-mode',
                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
                {
                  label: 'Preferred Modern Artist',
                  name: 'artist-color-mode',
                  options: [
                    {
                      label: 'Cardi B',
                      value: 'cardi',
                    },
                    {
                      label: 'Nicki Minaj',
                      value: 'nicki',
                    },
                  ],
                  size: 4,
                  type: 'radio-group',
                  validation: {
                    required: 'You gotta pick one!',
                  },
                  tooltip: {
                    children: <Markdown text="There can only be one." />,
                    id: 'select-tooltip',
                    alignment: 'bottom-left',
                    mode: 'light',
                  },
                },
                {
                  description: 'i checked them...',
                  id: 'my-super-cool-checkbox-color-mode',
                  label: 'check your levels',
                  name: 'check-this',
                  size: 4,
                  type: 'checkbox',
                },
                {
                  label: 'Write another long paragraph',
                  name: 'paragraph02-color-mode-left-section',
                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                  tooltip: {
                    children: <Markdown text="It *is* required ✨" />,
                    id: 'select-tooltip',
                    alignment: 'top-right',
                    mode: 'dark',
                  },
                },
              ],
              layout: 'left',
              title: 'first section',
            },
            {
              as: 'h3',
              fields: [
                {
                  label: 'hello....',
                  name: 'text01-color-mode-center-section',
                  size: 5,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
              ],
              title: 'hi there... again',
            },
            {
              fields: [
                {
                  label: 'hi?',
                  name: 'text01-color-mode-disabled',
                  disabled: true,
                  size: 4,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
                {
                  description: 'i checked them...',
                  id: 'disabled-checkbox-color-mode',
                  label: 'check your levels',
                  name: 'check-this',
                  disabled: true,
                  size: 3,
                  type: 'checkbox',
                },
                {
                  label: 'Simple select (required)',
                  name: 'simple-select-color-mode-disabled',
                  disabled: true,

                  options: [
                    '',
                    'One fish',
                    'Two fish',
                    'Red fish',
                    'Blue fish',
                  ],
                  size: 4,
                  type: 'select',
                  validation: {
                    required: 'Please select an option',
                  },
                },
                {
                  label: 'Write a paragraph.',
                  name: 'paragraph01-color-mode-disabled',
                  disabled: true,

                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
                {
                  label: 'Preferred Modern Artist',
                  name: 'artist-color-mode-disabled',
                  disabled: true,

                  options: [
                    {
                      label: 'Cardi B',
                      value: 'cardi',
                    },
                    {
                      label: 'Nicki Minaj',
                      value: 'nicki',
                    },
                  ],
                  size: 4,
                  type: 'radio-group',
                  validation: {
                    required: 'You gotta pick one!',
                  },
                },
                {
                  label: 'whats up?',
                  name: 'text04--left-section-disabled',
                  size: 4,
                  type: 'text',
                  disabled: true,
                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Write another long paragraph',
                  name: 'paragraph02-left-section-disabled',
                  size: 8,
                  type: 'textarea',
                  disabled: true,
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
              ],
              layout: 'left',
              title: 'disabled inputs',
            },
            {
              fields: [
                {
                  label: 'hi?',
                  name: 'text01-color-mode-error',
                  customError: 'something',

                  size: 4,
                  type: 'text',
                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Simple select (required)',
                  name: 'simple-select-color-mode-error',
                  customError: 'has',

                  options: [
                    '',
                    'One fish',
                    'Two fish',
                    'Red fish',
                    'Blue fish',
                  ],
                  size: 4,
                  type: 'select',
                  validation: {
                    required: 'Please select an option',
                  },
                },
                {
                  label: 'Write a paragraph.',
                  name: 'paragraph01-color-mode-error',
                  customError: 'gone',

                  size: 8,
                  type: 'textarea',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
                {
                  label: 'Preferred Modern Artist',
                  name: 'artist-color-mode-error',
                  customError: 'very',

                  options: [
                    {
                      label: 'Cardi B',
                      value: 'cardi',
                    },
                    {
                      label: 'Nicki Minaj',
                      value: 'nicki',
                    },
                  ],
                  size: 4,
                  type: 'radio-group',
                  validation: {
                    required: 'You gotta pick one!',
                  },
                },
                {
                  label: 'whats up?',
                  name: 'text04-error',
                  size: 4,
                  type: 'text',
                  customError: 'very',

                  validation: {
                    required: true,
                  },
                },
                {
                  label: 'Write another long paragraph',
                  name: 'paragraph02-error',
                  size: 8,
                  type: 'textarea',
                  customError: 'wrong',
                  validation: {
                    required: 'Please write something about penguins!',
                  },
                },
              ],
              title: 'something has gone wrong',
            },
          ]}
          onSubmit={onSubmit}
          submit={{
            contents: 'Submit me',
            size: 12,
          }}
          validation="onSubmit"
        />
      </Box>
    </ColorModeExampleWrapper>
  );
};

export const FormLoadingExample = () => {
  const [loading, setLoading] = useState(false);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async () => {
    setLoading(true);
    await wait(2000);
    setLoading(false);
  };

  return (
    <Background bg="navy" p={32}>
      <GridForm
        disableFieldsOnSubmit
        resetOnSubmit
        fields={[
          {
            label: 'Email',
            placeholder:
              'i will disable form fields on loading and reset on correct submission!',
            name: 'im-new',
            type: 'email',
            validation: {
              required: 'pls fill this out',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                message: '😔 that is not an email 😔',
              },
            },
            size: 12,
          },
        ]}
        onSubmit={onSubmit}
        submit={{
          loading,
          contents: 'Submit Me 💖',
          size: 5,
        }}
      />
    </Background>
  );
};

const INeedSomeSpace: React.FC = ({ children }) => {
  return <Box m={16}>{children}</Box>;
};

export const InnerHEYagain: React.FC = () => {
  const { watch } = useFormState();
  const watchedSelect = watch('your-fieldo');
  const watchedSecondSelect = watch('another-fieldo');

  const shouldIStayOrShouldIGo = () => {
    if (watchedSelect === 'two' || watchedSelect === 'third') {
      return (
        <ConnectedFormGroup
          name="another-fieldo"
          label="hey there"
          size="large"
        >
          <ConnectedSelect
            name="another-fieldo"
            htmlFor="another-fieldo"
            options={['hide the check', 'show me the check']}
          />
        </ConnectedFormGroup>
      );
    }
  };

  const iMayBeHidden = () => {
    const returnedComponent =
      watchedSecondSelect === 'show me the check' ? (
        <ConnectedFormGroup
          name="yet-again"
          label="hi..."
          spacing="tight"
          errorType="initial"
        >
          <ConnectedCheckbox
            label="if you can see the check you must check the check"
            name="yet-again"
            htmlFor="check-field-0"
            validation={{ required: 'check it...' }}
            spacing="tight"
          />
        </ConnectedFormGroup>
      ) : watchedSecondSelect === 'hide the check' ? (
        <ConnectedFormGroup
          name="example-icon"
          label="please explain why you don't want to fill in the check"
        >
          <ConnectedInput
            name="example-icon"
            htmlFor="example-icon"
            validation={{ required: 'explain yourself.' }}
          />
        </ConnectedFormGroup>
      ) : null;
    return returnedComponent;
  };

  return (
    <>
      <FloatingCard beak="bottom-left" pattern={DotDense}>
        <SubmitButton variant="secondary" m={16}>
          dont forget to submit
        </SubmitButton>
      </FloatingCard>

      <Box width="20rem" m={24}>
        <ConnectedFormGroup name="your-fieldo" label="hey" size="large">
          <ConnectedSelect
            name="your-fieldo"
            htmlFor="your-field"
            validation={{ required: 'check it...' }}
            options={['one', 'two', 'third']}
          />
        </ConnectedFormGroup>
        <div aria-live="assertive">
          {shouldIStayOrShouldIGo()}
          {iMayBeHidden()}
        </div>
      </Box>
    </>
  );
};

export const HEYagain: React.FC = () => {
  return (
    <Background
      bg="black"
      border={1}
      borderColor="navy"
      borderRadius="10px"
      m={32}
      p={32}
      height="30rem"
    >
      <ConnectedForm
        onSubmit={(values) => console.log(values)}
        defaultValues={{
          'your-field': 'two',
          'example-icon': 'hey',
        }}
        resetOnSubmit
      >
        <InnerHEYagain />
      </ConnectedForm>
    </Background>
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
            <ConnectedFormGroup name="example-radio-area" label="pls answer">
              <ConnectedRadioGroup name="example-radio-area">
                <ConnectedRadio
                  name="example-radio-area"
                  label="first"
                  value="1"
                />
                <ConnectedRadio
                  label="second"
                  value="2"
                  name="example-radio-area"
                />
                <ConnectedRadio
                  label="third"
                  value="3"
                  name="example-radio-area"
                />
              </ConnectedRadioGroup>
            </ConnectedFormGroup>
          </INeedSomeSpace>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="render-input"
              label="render i am tre custom"
              render={({ name, currentlyDisabled, register }) => (
                <input
                  name={name}
                  disabled={currentlyDisabled}
                  ref={register({ required: 'heyyyyyyyy...' })}
                />
              )}
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
              name="your-field"
              label="hey"
              size="large"
              spacing="tight"
            >
              <ConnectedSelect
                name="your-field"
                htmlFor="your-field"
                validation={{ required: 'check it...' }}
                options={['one', 'two', 'three']}
              />
            </ConnectedFormGroup>
          </INeedSomeSpace>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="example-icon"
              label="write text in here"
              spacing="tight"
              errorType="initial"
            >
              <ConnectedInput name="example-icon" htmlFor="example-icon" />
            </ConnectedFormGroup>
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
            >
              <ConnectedCheckbox
                label="check me out"
                name="check-field-0"
                htmlFor="check-field-0"
                validation={{ required: 'check it...' }}
                spacing="tight"
              />
            </ConnectedFormGroup>
            <ConnectedFormGroup
              name="check-field-1"
              label="hi"
              spacing="tight"
              errorType="initial"
            >
              <ConnectedCheckbox
                label="check me out"
                name="check-field-1"
                htmlFor="check-field-1"
                validation={{ required: 'check it...' }}
                spacing="tight"
              />
            </ConnectedFormGroup>
            <ConnectedFormGroup
              name="check-field-2"
              label="hi"
              spacing="tight"
              errorType="initial"
              afan="fnkdajfn"
            >
              <ConnectedCheckbox
                label="check me out"
                name="check-field-2"
                htmlFor="check-field-2"
                validation={{ required: 'check it...' }}
                spacing="tight"
              />
            </ConnectedFormGroup>
          </Card>
          <INeedSomeSpace>
            <ConnectedFormGroup
              name="example-text-area"
              label="write text in here"
              spacing="tight"
              errorType="initial"
            >
              <ConnectedTextArea
                name="example-text-area"
                htmlFor="example-text-area"
                placeholder="pls write your doctoral thesis ty"
              />
            </ConnectedFormGroup>
          </INeedSomeSpace>
        </Background>
      </ConnectedForm>
    </Background>
  );
};
