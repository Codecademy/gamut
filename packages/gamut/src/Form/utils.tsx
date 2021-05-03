import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

export type ParseOptionProps = {
  id?: string | number;
  options?: string[] | Record<string, string | number>;
};

const formatAsOptions = ({ label, value }: OptionTypeBase) => {
  return (
    <option key={value} value={value} data-testid={value}>
      {label}
    </option>
  );
};
export const parseOptions = ({ options, id }: ParseOptionProps) => {
  const parsedOptions: Array<OptionTypeBase> = [];

  if (options instanceof Array) {
    options.forEach((value) => {
      const label = id ? `${id}-${value}` : value;
      parsedOptions.push({ label, value });
    });
  } else if (isObject(options)) {
    each(options, (label, value) => {
      parsedOptions.push({ label, value });
    });
  }

  return parsedOptions;
};

export const parseSelectOptions = (props: ParseOptionProps) => {
  return parseOptions(props).map(formatAsOptions);
};
