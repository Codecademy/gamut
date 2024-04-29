// eslint-disable gamut/import-paths
import {
  Box,
  Checkbox,
  CheckboxProps,
  Column,
  FormGroup,
  LayoutGrid,
  SelectDropdown,
} from '@codecademy/gamut';
import { RadarIcon, ResponsiveIcon, RocketIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

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

export const CheckboxExample: React.FC = () => {
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

export const SelectDropdownIconExample: React.FC = () => (
  <Box p={16} width="100%" height="20rem" border={1}>
    <FormGroup label="i have pizzazz" htmlFor="pizzaz-dropdown">
      <SelectDropdown
        name="pizzaz-dropdown"
        options={[
          {
            label: 'ohai',
            value: 'ohai',
            icon: RocketIcon,
          },
          {
            label: 'surprise pacman',
            value: 'pacman',
            icon: RadarIcon,
          },
          {
            label: `who's that pokemon?`,
            value: 'what',
            icon: ResponsiveIcon,
          },
        ]}
      />
    </FormGroup>
    <Box p={16}>
      <FormGroup label="i am fancy" htmlFor="fancy-dropdown">
        <SelectDropdown
          name="fancy-dropdown"
          size="small"
          options={[
            {
              label: 'ohai',
              value: 'ohai',
              icon: RocketIcon,
            },
            {
              label: 'surprise pacman',
              value: 'pacman',
              icon: RadarIcon,
            },
            {
              label: `who's that pokemon?`,
              value: 'what',
              icon: ResponsiveIcon,
            },
          ]}
        />
      </FormGroup>
    </Box>
  </Box>
);

export const SelectDropdownOptionVariantsExample: React.FC = () => (
  <>
    <Box p={16} width="100%" height="12rem">
      <FormGroup
        label="I might have disabled options"
        htmlFor="disabled-dropdown"
      >
        <SelectDropdown
          name="disabled-dropdown"
          options={[
            {
              label: 'I am disabled',
              value: 'xxx',
              disabled: true,
            },
            {
              label: 'I am not',
              value: 'yyy',
            },
            {
              label: `Nor am I`,
              value: 'zzz',
              disabled: false,
            },
          ]}
        />
      </FormGroup>
    </Box>
    <Box as="hr" width="100%" />
    <Box p={16} width="100%" height="24rem">
      <FormGroup
        label="I have subtitle and extended info options"
        htmlFor="extended-dropdown"
      >
        <SelectDropdown
          name="extended-dropdown"
          options={[
            {
              label: 'king@chess.com',
              subtitle: 'The King of Chess',
              value: 'xxx',
              disabled: true,
            },
            {
              label: 'queen@chess.com',
              rightLabel: 'The Queen of Chess',
              value: 'yyy',
            },
            {
              label: 'bishop@chess.com',
              subtitle: 'Bishop Chess',
              rightLabel: 'I can move diagonally',
              value: 'zzz',
              disabled: false,
            },
          ]}
        />
      </FormGroup>
    </Box>
  </>
);

export const SelectDropdownMultipleExample: React.FC = () => {
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const handleChange = (options) => {
    setSelectOptions(options.map((option) => option.value));
  };
  return (
    <Box p={16} width="100%" height="12rem" border={1}>
      <FormGroup
        label="I have multiple select options"
        htmlFor="multi-dropdown"
      >
        <SelectDropdown
          onChange={handleChange}
          value={selectOptions}
          name="multi-dropdown"
          multiple
          options={[
            {
              label: 'Select Me',
              value: 'xxx',
              disabled: true,
            },
            {
              label: 'Multi Select',
              value: 'yyy',
            },
            {
              label: `Select All?`,
              value: 'zzz',
            },
          ]}
        />
      </FormGroup>
      <FormGroup
        label="I have multiple select options and option groups"
        htmlFor="multi-group-dropdown"
      >
        <SelectDropdown
          size="small"
          onChange={handleChange}
          value={selectOptions}
          name="multi-group-dropdown"
          multiple
          options={[
            {
              label: 'Group one',
              options: [
                {
                  label: 'Select Me',
                  value: 'one',
                },
                {
                  label: 'Multi Select',
                  value: 'two',
                },
                {
                  label: `Select All?`,
                  value: 'three',
                },
              ],
            },
            {
              label: 'Group 2',
              options: [
                {
                  label: 'Item one',
                  value: 'xx',
                },
                {
                  label: 'Item two',
                  value: 'yy',
                },
              ],
            },
          ]}
        />
      </FormGroup>
    </Box>
  );
};
