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
    <Box as="fieldset" m={0} p={0}>
      <legend>Tight Spacing</legend>
      <FlexBox as="ul" column listStyle="none" m={0} p={0}>
        {[
          { id: 'spacing-1', label: 'a small space', checked: true },
          { id: 'spacing-2', label: 'with three checkboxes', checked: false },
          { id: 'spacing-3', label: 'neat huh?', checked: true },
        ].map(({ id, label, checked }) => (
          <Box as="li" key={id} mt={4}>
            <Checkbox
              checked={checked}
              htmlFor={id}
              label={label}
              name={id}
              readOnly
              spacing="tight"
            />
          </Box>
        ))}
      </FlexBox>
    </Box>
  ),
};

export const LabelsAsReactNodes: Story = {
  args: {},
  render: () => (
    <Box as="fieldset" m={0} p={0}>
      <legend>Labels as React Nodes</legend>
      <FlexBox as="ul" column listStyle="none" m={0} p={0}>
        <Box as="li" mt={4}>
          <Checkbox
            checked
            htmlFor="accessible-1"
            label="a string"
            name="accessible-1"
            readOnly
          />
        </Box>
        <Box as="li" mt={4}>
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
        </Box>
        <Box as="li" mt={4}>
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
        </Box>
      </FlexBox>
    </Box>
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

export const NestedCheckboxes: Story = {
  render: () => {
    const NestedCheckboxesComponent = () => {
      const [childrenChecked, setChildrenChecked] = useState<boolean[]>([
        false,
        false,
        false,
      ]);

      const allChecked = childrenChecked.every(Boolean);
      const someChecked = childrenChecked.some(Boolean);

      const isIndeterminate = !allChecked && someChecked;

      const toggleAll = () => {
        const next = !allChecked;
        setChildrenChecked(childrenChecked.map(() => next));
      };

      const toggleChild = (index: number) => () => {
        setChildrenChecked((prev) => {
          const next = [...prev];
          next[index] = !prev[index];
          return next;
        });
      };

      return (
        <Box as="fieldset" border={1} borderRadius="sm" maxWidth="340px" p={16}>
          <legend>My fave Gamut components</legend>
          <Box ml={8}>
            <Checkbox
              htmlFor="nested-parent"
              label="Select all components"
              name="nested-parent"
              onChange={toggleAll}
              {...(isIndeterminate
                ? { indeterminate: true as const, checked: false as const }
                : { checked: allChecked })}
            />
          </Box>
          <Box as="ul" listStyle="none" ml={32} p={0}>
            {['Boxes', 'ToolTips', 'Pagination'].map((component, i) => (
              <Box as="li" key={component}>
                <Checkbox
                  checked={childrenChecked[i]}
                  htmlFor={`nested-child-${i}`}
                  label={component}
                  name={`nested-child-${i}`}
                  onChange={toggleChild(i)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      );
    };

    return <NestedCheckboxesComponent />;
  },
};
