import { Select } from '@codecademy/gamut';
import { Background, themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import type { languageOption } from './consts';
import { languageOptions } from './consts';

const StyledSelect = styled(Select)`
  margin-top: 1rem;
  color: ${themed('colors.text')};

  select {
    color: ${themed('colors.text')};
    background-color: ${themed('colors.black')};

    &:hover,
    &:active,
    &:focus {
      border-color: ${themed('colors.primary')};
    }
    &:focus {
      box-shadow: inset 0 0 0 1px ${themed('colors.primary')};
    }
  }
`;

export type LanguageSelectionProps = {
  onChange: (newLanguage: languageOption) => void;
};

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onChange,
}) => {
  return (
    <Background bg="black" flex={1} px={16} pt={48}>
      What language do you want to write?
      <StyledSelect
        id="language-select"
        aria-label="Select your language"
        options={languageOptions}
        onChange={(e) => onChange(e.target.value as languageOption)}
      />
    </Background>
  );
};
