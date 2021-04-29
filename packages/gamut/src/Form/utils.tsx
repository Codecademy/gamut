import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

type ParseOptionPropsBase = {
  id?: string | number;
  options?: string[] | Record<string, string | number>;
};

interface ReactSelectParseOptionsProps extends ParseOptionPropsBase {
  selectDropdown: true;
}

interface SelectParseOptionsProps extends ParseOptionPropsBase {
  selectDropdown: false;
}
type ParseOptionProps = ReactSelectParseOptionsProps | SelectParseOptionsProps;

type TypeName<T> = T extends ReactSelectParseOptionsProps
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
): TypeName<T>[] => {
  const { id, options } = args;

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

  if (args.selectDropdown === false) {
    return parsedOptions.map(formatAsOptions) as TypeName<T>[];
  }

  return parsedOptions as TypeName<T>[];
};

const hey = parseOptions({
  id: 'ok',
  options: ['red', 'yellow', 'green'],
  selectDropdown: false,
});
