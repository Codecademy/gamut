import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

import { SelectDropdownOptions } from './SelectDropdown';

export interface ParseOptionProps {
  id?: string | number;
  options?: SelectDropdownOptions;
}

const formatAsOptions = ({ label, value, key }: OptionTypeBase) => {
  const option = key ? (
    <option label={label} key={key} value={value} data-testid={key}>
      {label}
    </option>
  ) : (
    <option label={value} key={label} value={value} data-testid={label}>
      {value}
    </option>
  );

  return option;
};
export const parseOptions = ({ options, id }: ParseOptionProps) => {
  const parsedOptions: Array<OptionTypeBase> = [];

  if (options instanceof Array) {
    options.forEach((value) => {
      if (typeof value === 'string') {
        const label = id ? `${id}-${value}` : value;
        parsedOptions.push({ label, value });
      } else {
        const key = id ? `${id}-${value.value}` : value.value;
        parsedOptions.push({ ...value, key });
      }
    });
  } else if (isObject(options)) {
    each(options, (label, value) => {
      const key = id ? `${id}-${value}` : value;
      parsedOptions.push({ label, value, key });
    });
  }

  return parsedOptions;
};

export const parseSelectOptions = (props: ParseOptionProps) => {
  return parseOptions(props).map(formatAsOptions);
};
