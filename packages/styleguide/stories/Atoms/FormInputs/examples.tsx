/* eslint-disable local-rules/gamut-import-paths */
import {
  Box,
  Checkbox,
  Column,
  FormGroup,
  LayoutGrid,
} from '@codecademy/gamut/src';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { ChangeEvent, useState } from 'react';

type CustomCheckboxProps = {
  htmlFor: string;
  label: string;
  defaultChecked?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  htmlFor,
  label,
  defaultChecked = false,
  errorMessage,
  disabled,
}) => {
  const [currentChecked, setCurrentChecked] = useState(defaultChecked);

  const changeHandler = (event: ChangeEvent<HTMLElement>) => {
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
      />
    </FormGroup>
  );
};

export const CheckboxExample = () => {
  return (
    <ColorMode mode="light">
      <Box bg="background" border={1} p={16}>
        <LayoutGrid>
          <Column size={4}>
            <CustomCheckbox
              htmlFor="a custom checkbox"
              label="a fancy custom checkbox"
            />
          </Column>
          <Column size={4}>
            <CustomCheckbox
              htmlFor="a custom checkbox again"
              label="disabled custom checkbox"
              defaultChecked
              disabled
            />
          </Column>
          <Column size={4}>
            <Background bg="black" pl={8}>
              <CustomCheckbox
                htmlFor="a custom checkbox the third"
                label="a dark mode fancy checkbox"
              />
            </Background>
          </Column>
        </LayoutGrid>
      </Box>
    </ColorMode>
  );
};
