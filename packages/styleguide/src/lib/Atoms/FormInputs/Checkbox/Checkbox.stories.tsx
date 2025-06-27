import {
  Anchor,
  Box,
  Checkbox,
  CheckboxProps,
  Column,
  FlexBox,
  LayoutGrid,
  Text,
} from '@codecademy/gamut';
import { MiniStarIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  args: {
    htmlFor: 'example-checkbox',
    label: 'A Checkbox Label',
    name: 'example-checkbox',
    checked: true,
    readOnly: true,
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Unchecked: Story = {
  args: {
    htmlFor: 'example-unchecked',
    label: 'unchecked',
    name: 'example-unchecked',
    checked: true,
  },
};

export const Checked: Story = {
  args: {
    htmlFor: 'example-checked',
    label: 'checked',
    name: 'example-checked',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    htmlFor: 'indeterminate',
    label: 'indeterminate',
    name: 'example-indeterminate',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'example-disabled',
    label: 'Disabled',
    name: 'example-disabled',
    disabled: true,
    checked: false,
  },
};

export const CheckedAndDisabled: Story = {
  args: {
    htmlFor: 'example-checked-disabled',
    label: 'Checked + Disabled',
    name: 'example-checked-disabled',
    disabled: true,
    checked: true,
  },
};

export const Multiline: Story = {
  args: {
    htmlFor: 'example-multiline',
    name: 'example-multiline',
    label:
      'I am a longer label and will displayed at a smaller size in order to conserve valuable space.  This can be used to display some disclaimer about terms or conditions that might be a bit too long for a normal label area',
    multiline: true,
    checked: false,
  },
};

export const SpacingTight: Story = {
  args: {
    spacing: 'tight',
  },
  render: () => (
    <>
      <Checkbox
        checked
        htmlFor="spacing-1"
        label="a small space"
        name="spacing-1"
        readOnly
        spacing="tight"
      />
      <Checkbox
        htmlFor="spacing-2"
        label="with three checkboxes"
        name="spacing-2"
        spacing="tight"
      />
      <Checkbox
        checked
        htmlFor="spacing-3"
        label="neat huh?"
        name="spacing-3"
        readOnly
        spacing="tight"
      />
    </>
  ),
};

export const LabelsAsReactNodes: Story = {
  args: {},
  render: () => (
    <>
      <Checkbox
        checked
        htmlFor="accessible-1"
        label="a string"
        name="accessible-1"
        readOnly
      />
      <Checkbox
        aria-label="a node"
        htmlFor="accessible-2"
        label={
          <FlexBox alignItems="center">
            <MiniStarIcon mr={4} />a node <MiniStarIcon ml={4} />
          </FlexBox>
        }
        name="accessible-2"
      />
      <Checkbox
        aria-label="Here is a link to click"
        dontAriaHideLabel
        htmlFor="accessible-3"
        label={
          <Box>
            <Text aria-hidden>Here is a link to&nbsp;</Text>
            <Anchor href="/">click</Anchor>
            <Text aria-hidden>!</Text>
          </Box>
        }
        name="accessible-3"
      />
    </>
  ),
};

type CustomCheckboxProps = Omit<
  CheckboxProps,
  'checked' | 'indeterminate' | 'label'
> & {
  defaultChecked?: boolean;
  label: string;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  htmlFor,
  label,
  defaultChecked = false,
  disabled,
  ...rest
}) => {
  const [currentChecked, setCurrentChecked] = useState(defaultChecked);

  const changeHandler = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <Checkbox
      checked={currentChecked}
      disabled={disabled}
      htmlFor={htmlFor}
      label={label}
      onChange={changeHandler}
      {...rest}
    />
  );
};

export const ControlledCheckbox: React.FC = () => {
  return (
    <Box border={1} p={16}>
      <LayoutGrid>
        <Column size={4}>
          <CustomCheckbox
            htmlFor="a-custom-checkbox"
            label="a fancy custom checkbox made with the example below, isn't it so so nice?"
            multiline
          />
        </Column>
        <Column size={4}>
          <CustomCheckbox
            defaultChecked
            disabled
            htmlFor="a-custom-checkbox-again"
            label="disabled custom checkbox"
          />
        </Column>
        <Column size={4}>
          <Background bg="black" pl={8}>
            <CustomCheckbox
              htmlFor="a-custom-checkbox-the-third"
              label="a dark mode fancy checkbox"
            />
          </Background>
        </Column>
      </LayoutGrid>
    </Box>
  );
};
