import each from 'lodash/each';
import isObject from 'lodash/isObject';

import {
  ExtendedOption,
  OptionStrict,
  SelectDropdownOptions,
  SelectDropdownSizes,
} from './SelectDropdown';

export interface SelectOptionBase extends OptionStrict, SelectDropdownSizes {
  key?: string;
}

export interface ParseSelectOptionProps extends SelectDropdownSizes {
  id?: string | number;
  options?: SelectDropdownOptions;
}

export interface ParseOptionProps extends ParseSelectOptionProps {
  labelAsKey?: boolean;
}
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
export const parseOptions = ({
  options,
  id,
  size,
  labelAsKey,
}: ParseOptionProps) => {
  const parsedOptions: SelectOptionBase[] = [];
  if (Array.isArray(options)) {
    options.forEach((value: string | ExtendedOption | any) => {
      // Parses option groups
      if (isObject(value) && value.options && Array.isArray(value.options)) {
        const processedGroupOptions = value.options.map(
          (option: ExtendedOption) => {
            if (isObject(option)) {
              const key = id ? `${id}-${option?.value}` : option?.value;
              return { ...option, key, size };
            }
            const label = id && labelAsKey ? `${id}-${option}` : option;
            return { label, value: option };
          }
        );
        parsedOptions.push({
          ...value,
          options: processedGroupOptions,
        });
        // Parses regular options
      } else if (isObject(value)) {
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

export const parseSelectOptions = (props: ParseSelectOptionProps) => {
  return parseOptions({ ...props, labelAsKey: true }).map(formatAsOptions);
};
