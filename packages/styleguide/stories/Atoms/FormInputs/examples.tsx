/* eslint-disable gamut/gamut-import-paths  */
import {
  Box,
  Checkbox,
  CheckboxProps,
  Column,
  FormGroup,
  LayoutGrid,
  SelectDropdown,
} from '@codecademy/gamut/src';
import { RadarIcon, ResponsiveIcon, RocketIcon } from '@codecademy/gamut-icons';
import {
  LockIcon,
  NetworkUserIcon,
  PeopleIcon,
} from '@codecademy/gamut-icons/src';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { useState } from 'react';

import { ColorModeExampleWrapper } from '../../Foundations/ColorMode/examples';

type CustomCheckboxProps = Omit<CheckboxProps, 'checked'> & {
  defaultChecked?: boolean;
  errorMessage?: string;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  htmlFor,
  label,
  defaultChecked = false,
  errorMessage,
  disabled,
  ...rest
}) => {
  const [currentChecked, setCurrentChecked] = useState(defaultChecked);

  const changeHandler = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <FormGroup htmlFor={htmlFor} error={errorMessage} disabled={disabled}>
      <Checkbox
        htmlFor={htmlFor}
        onChange={changeHandler}
        label={label}
        disabled={disabled}
        checked={currentChecked}
        {...rest}
      />
    </FormGroup>
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
    <FormGroup label="i have pizzazz">
      <SelectDropdown
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
      <FormGroup label="i am fancy">
        <SelectDropdown
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

export const SelectDropdownExample: React.FC = () => {
  return (
    <ColorModeExampleWrapper>
      <Box height="34rem">
        <FormGroup label="i have a fancy colormode" htmlFor="colormode">
          <SelectDropdown
            aria-label="colormode"
            options={['ooo fancy', 'yes I am!', ':)']}
            name="colormode"
            isSearchable
          />
        </FormGroup>
        <FormGroup
          label="i have an error"
          htmlFor="colormode-error"
          error="cry cry cry"
        >
          <SelectDropdown
            aria-label="colormode-error"
            options={['ooo fancy', 'yes I am!', ':)']}
            name="colormode-error"
            isSearchable
            error
          />
        </FormGroup>
        <FormGroup label="i am disabled" htmlFor="colormode-disabled">
          <SelectDropdown
            aria-label="colormode-disabled"
            options={['ooo fancy', 'yes I am!', ':)']}
            name="colormode-disabled"
            isSearchable
            disabled
          />
        </FormGroup>
        <FormGroup label="i have icons" htmlFor="colormode-icons">
          <SelectDropdown
            aria-label="icon"
            options={[
              {
                label: 'Private: Only you can prevent forest fires',
                value: 'private',
                icon: LockIcon,
              },
              {
                label: 'Public: Wait what?',
                value: 'public',
                icon: NetworkUserIcon,
              },
              {
                label: 'Monsters: Monsters are such interesting people',
                value: 'monsters',
                icon: PeopleIcon,
              },
            ]}
            name="colormode-icons"
          />
        </FormGroup>
        <FormGroup label="i am smol" htmlFor="colormode-small">
          <SelectDropdown
            aria-label="colormode-small"
            options={['small', 'yes', 'very very']}
            size="small"
            name="colormode-small"
            isSearchable
          />
        </FormGroup>
      </Box>
    </ColorModeExampleWrapper>
  );
};
