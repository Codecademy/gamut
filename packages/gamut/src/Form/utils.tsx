import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

export type ParseOptionPropsBase = {
  id?: string | number;
  options?: string[] | Record<string, string | number>;
};
export interface ReactSelectParseOptionsProps extends ParseOptionPropsBase {
  selectDropdown: true;
}
export interface SelectParseOptionsProps extends ParseOptionPropsBase {
  selectDropdown: false;
}

export type ParseOptionProps =
  | ReactSelectParseOptionsProps
  | SelectParseOptionsProps;

export type ParseOptionsProps<T> = T extends ReactSelectParseOptionsProps
  ? OptionTypeBase
  : JSX.Element;

const formatAsOptions = ({ label, value }: OptionTypeBase) => {
  return (
    <option key={label} value={value} data-testid={label}>
      {value}
    </option>
  );
};

export const parseOptions = <T extends ParseOptionProps>(
  args: T
): ParseOptionsProps<T>[] => {
  const { id, options } = args;

  const parsedOptions: Array<OptionTypeBase> = [];

  if (options instanceof Array) {
    options.forEach((value) => {
      const label = id ? `${id}-${value}` : value;
      parsedOptions.push({ label, value });
    });
  } else if (isObject(options)) {
    each(options, (rawLabel, value) => {
      const label = id ? `${id}-${rawLabel}` : rawLabel;
      parsedOptions.push({ label, value });
    });
  }

  if (args.selectDropdown === false) {
    return parsedOptions.map(formatAsOptions) as ParseOptionsProps<T>[];
  }

  return parsedOptions as ParseOptionsProps<T>[];
};
