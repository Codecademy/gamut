import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

import {
  IconOption,
  SelectDropdownOptions,
  SelectDropdownSizes,
} from './SelectDropdown';

export interface SelectOptionBase {
  label: string;
  value: string;
  key?: string;
}
export interface ParseOptionProps extends SelectDropdownSizes {
  id?: string | number;
  options?: SelectDropdownOptions;
}

const formatAsOptions = ({ label, value, key }: SelectOptionBase) => {
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
export const parseOptions = ({ options, id, size }: ParseOptionProps) => {
  const parsedOptions: OptionTypeBase[] = [];
  if (Array.isArray(options)) {
    options.forEach((value: string | IconOption) => {
      if (isObject(value)) {
        const key = id ? `${id}-${value?.value}` : value?.value;
        parsedOptions.push({ ...value, key, size });
      } else {
        const label = id ? `${id}-${value}` : value;
        parsedOptions.push({ label, value });
      }
    });
  } else if (isObject(options)) {
    each(options, (label, value) => {
      const key = id ? `${id}-${value}` : value;
      parsedOptions.push({ label, value, key });
    });
  }

  return [...parsedOptions];
};

export const parseSelectOptions = (props: ParseOptionProps) => {
  return parseOptions(props).map(formatAsOptions);
};
