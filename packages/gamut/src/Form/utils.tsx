import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

export type ParseOptionProps = {
  id?: string | number;
  options?: string[] | Record<string, string | number>;
};

const formatAsOptions = ({ label, value, rawText }: OptionTypeBase) => {
  return (
    <option key={label} value={value} data-testid={label}>
      {rawText ?? value}
    </option>
  );
};
export const parseOptions = ({ id, options }: ParseOptionProps) => {
  const parsedOptions: Array<OptionTypeBase> = [];

  if (options instanceof Array) {
    options.forEach((value) => {
      const label = id ? `${id}-${value}` : value;
      parsedOptions.push({ label, value });
    });
  } else if (isObject(options)) {
    each(options, (rawText, value) => {
      const label = id ? `${id}-${rawText}` : rawText;
      parsedOptions.push({ label, value, rawText });
    });
  }

  return parsedOptions;
};

export const parseSelectOptions = (props: ParseOptionProps) => {
  return parseOptions(props).map(formatAsOptions);
};
