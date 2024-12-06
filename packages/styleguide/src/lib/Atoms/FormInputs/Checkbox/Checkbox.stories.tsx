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
    checked: false,
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
        readOnly
        spacing="tight"
        label="a small space"
        htmlFor="spacing-1"
        name="spacing-1"
      />
      <Checkbox
        spacing="tight"
        label="with three checkboxes"
        htmlFor="spacing-2"
        name="spacing-2"
      />
      <Checkbox
        checked
        readOnly
        spacing="tight"
        label="neat huh?"
        htmlFor="spacing-3"
        name="spacing-3"
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
        readOnly
        label="a string"
        htmlFor="accessible-1"
        name="accessible-1"
      />
      <Checkbox
        label={
          <FlexBox alignItems="center">
            <MiniStarIcon mr={4} />a node <MiniStarIcon ml={4} />
          </FlexBox>
        }
        aria-label="a node"
        htmlFor="accessible-2"
        name="accessible-2"
      />
      <Checkbox
        dontAriaHideLabel
        aria-label="Here is a link to click"
        htmlFor="accessible-3"
        name="accessible-3"
        label={
          <Box>
            <Text aria-hidden>Here is a link to&nbsp;</Text>
            <Anchor href="/">click</Anchor>
            <Text aria-hidden>!</Text>
          </Box>
        }
      />
    </>
  ),
};

type CustomCheckboxProps = Omit<CheckboxProps, 'checked'> & {
  defaultChecked?: boolean;
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
      htmlFor={htmlFor}
      onChange={changeHandler}
      label={label}
      disabled={disabled}
      checked={currentChecked}
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
            htmlFor="a-custom-checkbox-again"
            label="disabled custom checkbox"
            defaultChecked
            disabled
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
