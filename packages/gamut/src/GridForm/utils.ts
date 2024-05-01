import { isArray } from 'lodash';

import { GridFormField } from './types';

export const requiredText = '* Required';

export const assignDefaultValue = (field: GridFormField) => {
  switch (field.type) {
    case 'checkbox':
    case 'radio-group':
      return false;
    case 'select':
      return isArray(field.options)
        ? field.options[0]
        : Object.keys(field.options)[0];
    case 'text':
    case 'textarea':
      return '';
    default:
      break;
  }
};
