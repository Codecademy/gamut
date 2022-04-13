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
import {
  LockIcon,
  NetworkUserIcon,
  PeopleIcon,
  RadarIcon,
  ResponsiveIcon,
  RocketIcon,
} from '@codecademy/gamut-icons';
import { Background, ColorMode } from '@codecademy/gamut-styles';
import React, { useState } from 'react';

import { ColorModeExampleWrapper } from '../../Foundations/ColorMode/examples';

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
    <ColorMode mode="light">
      <Box bg="background" border={1} p={16}>
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
    </ColorMode>
  );
};

export const SelectDropdownIconExample: React.FC = () => (
  <Box p={16} width="100%" height="20rem" border={1} bg="palePink">
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
    <Background p={16} bg="navy">
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
    </Background>
  </Box>
);
