import { Box, FormGroup, Input } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

import { infotipNestedArgTypes } from '~styleguide/argTypes';

const meta: TypeWithDeepControls<Meta<typeof FormGroup>> = {
  component: FormGroup,
  argTypes: { ...infotipNestedArgTypes },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    label: "Don't you label me!",
    description: 'This is a form group, it is pretty darn cool',
  },
};

export const FormGroupHtmlFor: Story = {
  render: () => (
    <FormGroup htmlFor="example1" label="I am a label!!">
      <Input id="example1" />
    </FormGroup>
  ),
};

export const FormGroupDiv: Story = {
  render: () => (
    <FormGroup
      id="div-form-group"
      label="I look like a label, but I'm actually a div..."
    >
      <Input aria-labelledby="div-form-group" defaultValue="😔" />
    </FormGroup>
  ),
};

export const DefaultState: Story = {
  args: {
    label: 'I am required!!',
    required: true,
    description: 'You can tell by the asterisk.',
    htmlFor: 'required1',
    children: <Input id="required1" />,
  },
};

export const Error: Story = {
  args: {
    required: true,
    label: 'I am also required!!',
    description: 'You can tell by the asterisk.',
    error: 'You messed up dude.',
    htmlFor: 'required-error',
    children: <Input defaultValue=">_>" error id="required-error" />,
  },
};

export const Valid: Story = {
  args: {
    required: true,
    label: 'I am also required!!',
    htmlFor: 'required-valid',
    children: <Input defaultValue="Good job!" id="required-valid" valid />,
  },
};

export const LowEmphasisInfoTip: Story = {
  args: {
    label: 'Low emphasis',
    htmlFor: 'low-emphasis-input',
    infotip: {
      alignment: 'bottom-left',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    children: <Input id="low-emphasis-input" />,
  },
};

export const HighEmphasisInfoTip: Story = {
  args: {
    label: 'High emphasis',
    htmlFor: 'high-emphasis-input',
    infotip: {
      emphasis: 'high',
      alignment: 'bottom-left',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    children: <Input id="high-emphasis-input" />,
  },
};

export const InfoTipAutoLabelling: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={32}>
      <FormGroup
        htmlFor="auto-label-input"
        infotip={{
          info: 'We will never share your email with third parties.',
        }}
        label="Auto-labelling (default)"
      >
        <Input id="auto-label-input" type="email" />
      </FormGroup>

      <FormGroup
        htmlFor="aria-label-input"
        infotip={{
          ariaLabel: 'Email privacy information',
          info: 'We will never share your email with third parties.',
        }}
        label="With ariaLabel"
      >
        <Input id="aria-label-input" type="email" />
      </FormGroup>

      <FormGroup
        htmlFor="aria-labelledby-input"
        infotip={{
          ariaLabelledby: 'custom-label-id',
          info: 'We will never share your email with third parties.',
        }}
        label="With ariaLabelledBy"
      >
        <span id="custom-label-id">Custom label for InfoTip button</span>
        <Input id="aria-labelledby-input" type="email" />
      </FormGroup>
    </Box>
  ),
};
