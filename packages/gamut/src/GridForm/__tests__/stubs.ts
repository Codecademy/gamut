import {
  GridFormCheckboxField,
  GridFormFileField,
  GridFormSelectField,
  GridFormTextField,
  GridFormTextAreaField,
} from '../types';

export const stubCheckboxField: GridFormCheckboxField = {
  description: 'Check me!',
  label: 'Stub Checkbox',
  name: 'stub-select',
  type: 'checkbox',
};

export const stubSelectOptions: string[] = ['aaa', 'bbb'];

export const stubSelectField: GridFormSelectField = {
  label: 'Stub Select',
  options: stubSelectOptions,
  name: 'stub-select',
  type: 'select',
};
export const stubTextField: GridFormTextField = {
  label: 'Stub Text',
  name: 'stub-text',
  type: 'text',
};

export const stubFileField: GridFormFileField = {
  label: 'Stub File',
  name: 'stub-file',
  type: 'file',
};

export const stubTextareaField: GridFormTextAreaField = {
  label: 'Stub Textarea',
  name: 'stub-textarea',
  type: 'textarea',
};
