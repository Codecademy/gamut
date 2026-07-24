import { useMemo } from 'react';

import { parseOptions, SelectOptionBase } from '../../utils';
import { isOptionsGrouped } from '../core/utils';
import {
  SelectDropdownGroup,
  SelectDropdownOptions,
  SelectDropdownSizes,
} from '../types';

interface UseSelectOptionsArgs {
  options?: SelectDropdownOptions | SelectDropdownGroup[];
  id?: string;
  size?: SelectDropdownSizes['size'];
  value?: string | string[];
}

interface UseSelectOptionsReturn {
  selectOptions: SelectOptionBase[] | SelectDropdownGroup[];
  parsedValue: SelectOptionBase | undefined;
}

export const useSelectOptions = ({
  options,
  id,
  size,
  value,
}: UseSelectOptionsArgs): UseSelectOptionsReturn => {
  const selectOptions = useMemo(():
    | SelectOptionBase[]
    | SelectDropdownGroup[] => {
    if (
      !options ||
      (Array.isArray(options) && !options.length) ||
      (typeof options === 'object' &&
        !Array.isArray(options) &&
        Object.keys(options).length === 0)
    ) {
      return [];
    }

    if (isOptionsGrouped(options)) {
      return options;
    }

    return parseOptions({ options, id, size });
  }, [options, id, size]);

  const parsedValue = useMemo(() => {
    if (isOptionsGrouped(selectOptions)) {
      for (const group of selectOptions) {
        if (group.options) {
          const foundOption = group.options.find(
            (option) => option.value === value
          );
          if (foundOption) return foundOption as SelectOptionBase;
        }
      }
      return undefined;
    }

    return selectOptions.find((option) => option.value === value);
  }, [selectOptions, value]);

  return { selectOptions, parsedValue };
};
