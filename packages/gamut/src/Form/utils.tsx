import { each, isObject } from 'lodash';
import React from 'react';
import { OptionTypeBase } from 'react-select';

type ParseOptionPropsBase = {
  id?: string | number;
  options?: string[] | Record<string, OptionWithHiddenElement>;
};
interface ReactSelectParseOptionsProps extends ParseOptionPropsBase {
  selectDropdown: true;
  hiddenElements?: false;
}

interface OptionWithHiddenElement {
  element: JSX.Element;
  hidden: JSX.Element;
}
interface ReactSelectParseHiddenOptionsProps extends ParseOptionPropsBase {
  selectDropdown: true;
  hiddenElements: true;
  options: Record<string, OptionWithHiddenElement>;
}
interface SelectParseOptionsProps extends ParseOptionPropsBase {
  selectDropdown: false;
  hiddenElements?: false;
}

type ParseOptionProps =
  | ReactSelectParseOptionsProps
  | SelectParseOptionsProps
  | ReactSelectParseHiddenOptionsProps;

type TypeName<T> = T extends ReactSelectParseOptionsProps
  ? OptionTypeBase
  : T extends ReactSelectParseHiddenOptionsProps
  ? OptionWithHiddenElement
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

  if (args.hiddenElements) {
    each(options, (text, val) => {
      parsedOptions.push({
        label: text.element,
        value: val,
        hidden: text.hidden,
      });
    });
  } else if (options instanceof Array) {
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
    return parsedOptions.map(formatAsOptions) as TypeName<T>[];
  }

  return parsedOptions as TypeName<T>[];
};
