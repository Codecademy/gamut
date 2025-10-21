import { FormGroup, Input } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

import { infotipNestedArgTypes } from '~styleguide/argTypes';

const meta: TypeWithDeepControls<Meta<typeof FormGroup>> = {
  component: FormGroup,
  argTypes: {
    ...infotipNestedArgTypes,
  },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    label: "Don't you label me!",
    description: 'This is a form group, it is pretty darn cool',
  },
};

const FormGroupHtmlForExample = () => {
  return (
    <FormGroup htmlFor="example1" label="I am a label!!">
      <Input htmlFor="example1" />
    </FormGroup>
  );
};

export const FormGroupHtmlFor: Story = {
  render: () => <FormGroupHtmlForExample />,
};

const FormGroupDivExample = () => {
  return (
    <FormGroup label="I look like a label, but I'm actually a div...">
      <Input defaultValue="😔" />
    </FormGroup>
  );
};

export const FormGroupDiv: Story = {
  render: () => <FormGroupDivExample />,
};

export const DefaultState: Story = {
  args: {
    label: 'I am required!!',
    required: true,
    description: 'You can tell by the asterisk.',
    htmlFor: 'required1',
    children: <Input htmlFor="required1" />,
  },
};

export const Error: Story = {
  args: {
    required: true,
    label: 'I am also required!!',
    description: 'You can tell by the asterisk.',
    error: 'You messed up dude.',
    htmlFor: 'required-error',
    children: <Input defaultValue=">_>" error htmlFor="required-error" />,
  },
};

export const Valid: Story = {
  args: {
    required: true,
    label: 'I am also required!!',
    htmlFor: 'required-valid',
    children: <Input defaultValue="Good job!" htmlFor="required-valid" valid />,
  },
};

export const LowEmphasisInfoTip: Story = {
  args: {
    label: 'Low emphasis',
    infotip: {
      alignment: 'bottom-left',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    children: <Input />,
  },
};

export const HighEmphasisInfoTip: Story = {
  args: {
    label: 'High emphasis',
    infotip: {
      emphasis: 'high',
      alignment: 'bottom-left',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    children: <Input />,
  },
};
