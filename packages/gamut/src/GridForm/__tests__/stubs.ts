import {
  GridFormCheckboxField,
  GridFormSelectField,
  GridFormTextField,
} from '../types';

export const stubCheckboxField: GridFormCheckboxField = {
  description: 'Check me!',
  label: 'Stub Checkbox',
  name: 'stub-select',
  type: 'checkbox',
};

export const stubSelectField: GridFormSelectField = {
  label: 'Stub Select',
  options: ['aaa', 'bbb'],
  name: 'stub-select',
  type: 'select',
};

export const stubTextField: GridFormTextField = {
  label: 'Stub Text',
  name: 'stub-text',
  type: 'text',
};
