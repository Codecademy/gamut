import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedInput,
  ConnectedRadioGroupInput,
  Text,
  useConnectedForm,
} from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

import { infotipNestedArgTypes } from '~styleguide/argTypes';

const meta: TypeWithDeepControls<Meta<typeof ConnectedFormGroup>> = {
  component: ConnectedFormGroup,
  args: {
    field: {
      component: ConnectedRadioGroupInput,
      options: [
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
        { label: 'zero', value: 'zero' },
      ],
    } as ConnectedFormGroupProps<typeof ConnectedRadioGroupInput>['field'],
    label: 'i am a label',
    name: 'radioGroupExample',
  },
  argTypes: {
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    ...infotipNestedArgTypes,
  },
};

export default meta;
type Story = StoryObj<typeof ConnectedFormGroup>;

export const Default: Story = {
  render: (args) => (
    <ConnectedForm
      mt={12}
      resetOnSubmit
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    >
      <ConnectedFormGroup {...args} />
    </ConnectedForm>
  ),
};

export const States = () => {
  const { ConnectedFormGroup, ConnectedForm, connectedFormProps } =
    useConnectedForm({
      defaultValues: {
        radioGroup: undefined,
        radioGroupError: undefined,
        radioGroupDisabled: undefined,
      },
      validationRules: {
        radioGroup: {
          required: 'please fill this out.',
        },
      },
    });

  return (
    <ConnectedForm
      display="flex"
      mt={12}
      resetOnSubmit
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
      {...connectedFormProps}
    >
      <ConnectedFormGroup
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
        label="default state"
        name="radioGroup"
      />
      <ConnectedFormGroup
        customError="custom error"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
        label="error state"
        name="radioGroupError"
      />
      <ConnectedFormGroup
        disabled
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'zero', value: 'zero' },
          ],
        }}
        label="disabled state"
        name="radioGroupDisabled"
      />
    </ConnectedForm>
  );
};

/**
 * InfoTip buttons are automatically labelled by string field labels for accessibility.
 * Screen readers will announce "Field Label, button" when focusing the InfoTip.
 */
export const InfoTipAutoLabelling: Story = {
  render: () => (
    <ConnectedForm
      defaultValues={{ email: '' }}
      onSubmit={(values) => action('Form Submitted')(values)}
    >
      <ConnectedFormGroup
        field={{ component: ConnectedInput, type: 'email' }}
        infotip={{
          info: 'We will never share your email with third parties.',
          placement: 'floating',
        }}
        label="Email address"
        name="email"
      />
    </ConnectedForm>
  ),
};

/**
 * For ReactNode labels, you have three options for accessible InfoTip labelling:
 * - `labelledByFieldLabel: true` - uses the field label
 * - `ariaLabel` - provides a custom accessible name
 * - `ariaLabelledby` - references another element on the page
 */
export const InfoTipWithReactNodeLabel: Story = {
  render: () => (
    <ConnectedForm
      defaultValues={{ username: '', password: '', apiKey: '' }}
      onSubmit={(values) => action('Form Submitted')(values)}
    >
      <Text as="h3" id="api-section-heading" mb={8}>
        API Configuration
      </Text>
      <ConnectedFormGroup
        field={{ component: ConnectedInput }}
        infotip={{
          alignment: 'bottom-left',
          info: 'Choose a unique username between 3-20 characters.',
          labelledByFieldLabel: true,
        }}
        label={
          <Text as="span" fontWeight="bold">
            Username (labelledByFieldLabel)
          </Text>
        }
        name="username"
      />
      <ConnectedFormGroup
        field={{ component: ConnectedInput, type: 'password' }}
        infotip={{
          info: 'Password must be at least 8 characters with one uppercase letter and one number.',
          ariaLabel: 'Password requirements',
        }}
        label={
          <Text as="span" fontWeight="bold">
            Password (ariaLabel)
          </Text>
        }
        name="password"
      />
      <ConnectedFormGroup
        field={{ component: ConnectedInput }}
        infotip={{
          info: 'You can find your API key in the developer settings dashboard.',
          ariaLabelledby: 'api-section-heading',
        }}
        label={
          <Text as="span" fontWeight="bold">
            API Key (ariaLabelledby)
          </Text>
        }
        name="apiKey"
      />
    </ConnectedForm>
  ),
};
