import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

export type ParseOptionProps = {
  id?: string | number;
  options?: string[] | Record<string, string | number>;
};

const formatAsOptions = ({ label, value, key }: OptionTypeBase) => {
  return (
    <option key={key} value={value} data-testid={key}>
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
      const key = id ? `${id}-${value}` : value;
      parsedOptions.push({ label, value, key });
    });
  }

  return parsedOptions;
};

export const parseSelectOptions = (props: ParseOptionProps) => {
  return parseOptions(props).map(formatAsOptions);
};
