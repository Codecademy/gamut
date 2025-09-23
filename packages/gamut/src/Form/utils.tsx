import each from 'lodash/each';
import isObject from 'lodash/isObject';

import {
  ExtendedOption,
  IconOption,
  OptionStrict,
  SelectDropdownSizes,
} from './SelectDropdown/types';

export interface SelectOptionBase extends OptionStrict, SelectDropdownSizes {
  key?: string;
}

export type NonGroupedOptions =
  | string[]
  | IconOption[]
  | ExtendedOption[]
  | Record<string, string | number>;

export interface ParseSelectOptionProps extends SelectDropdownSizes {
  id?: string | number;
  options?: NonGroupedOptions;
}

export interface ParseOptionProps extends ParseSelectOptionProps {
  labelAsKey?: boolean;
}

export const parseOptions = ({
  options,
  id,
  size,
  labelAsKey,
}: ParseOptionProps) => {
  const parsedOptions: SelectOptionBase[] = [];
  if (Array.isArray(options)) {
    options.forEach((value: string | ExtendedOption) => {
      if (isObject(value)) {
        const key = id ? `${id}-${value?.value}` : value?.value;
        parsedOptions.push({ ...value, key, size });
      } else {
        const label = id && labelAsKey ? `${id}-${value}` : value;
        parsedOptions.push({ label, value });
      }
    });
  } else if (isObject(options)) {
    each(options, (label, value) => {
      const key = id ? `${id}-${value}` : value;
      parsedOptions.push({ label: label.toString(), value, key });
    });
  }
  return [...parsedOptions];
};

const formatAsOptions = ({ label, value, key }: SelectOptionBase) => {
  const option = key ? (
    <option data-testid={key} key={key} label={label} value={value}>
      {label}
    </option>
  ) : (
    <option data-testid={label} key={label} label={value} value={value}>
      {value}
    </option>
  );

  return option;
};

export const parseSelectOptions = (props: ParseSelectOptionProps) => {
  return parseOptions({ ...props, labelAsKey: true }).map(formatAsOptions);
};
