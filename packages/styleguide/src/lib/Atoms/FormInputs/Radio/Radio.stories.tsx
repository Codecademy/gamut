import { FormGroup, Radio, RadioGroup } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

import { infotipNestedArgTypes } from '~styleguide/argTypes';

const meta: TypeWithDeepControls<Meta<typeof Radio>> = {
  component: Radio,
  args: {
    htmlFor: 'example-radio',
    label: 'Option 1',
    name: 'example-radio',
  },
  argTypes: {
    ...infotipNestedArgTypes,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {},
};

export const RadioGroupComponent: Story = {
  render: () => (
    <RadioGroup htmlForPrefix="example-radio" name="example-radio">
      <Radio label="Radio 1" />
      <Radio label="Radio 2" />
    </RadioGroup>
  ),
};

export const RadioGroupWithInfoTips: Story = {
  render: () => (
    <FormGroup
      htmlFor="example-radio-infotip"
      infotip={{
        info: 'This InfoTip is linked to the RadioGroup label. Individual options can also have their own InfoTips.',
        placement: 'floating',
      }}
      label="Select an option"
      width="fit-content"
    >
      <RadioGroup
        htmlForPrefix="example-radio-infotip"
        name="example-radio-infotip"
      >
        <Radio
          infotip={{
            info: 'This option includes additional information about the choice.',
            placement: 'floating',
          }}
          label="Option with InfoTip"
        />
        <Radio
          infotip={{
            info: 'Each radio option can have its own InfoTip for context.',
          }}
          label="Another option"
        />
        <Radio label="Option without InfoTip" />
      </RadioGroup>
    </FormGroup>
  ),
};

export const Checked: Story = {
  args: {
    htmlFor: 'example-checked',
    name: 'example-checked',
    label: 'Checked',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'example-disabled',
    name: 'example-disabled',
    label: 'Disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    htmlFor: 'example-disabled-checked',
    name: 'example-disabled-checked',
    label: 'Disabled and Checked',
    disabled: true,
    checked: true,
  },
};

export const Error: Story = {
  args: {
    htmlFor: 'example-error',
    label: 'Error',
    name: 'example-error',
    error: true,
  },
};

export const CustomLabel: Story = {
  args: {
    infotip: {
      emphasis: 'high',
      info: 'This is an infotip',
      placement: 'floating',
    },
    htmlFor: 'example-custom',
    name: 'example-custom',
    label: 'Option with infotip',
  },
};
