import {
  GridFormCheckboxField,
  GridFormFileField,
  GridFormSelectField,
  GridFormTextField,
  GridFormTextAreaField,
  GridFormRadioGroupField,
  GridFormRadioOption,
} from '../types';

export const stubCheckboxField: GridFormCheckboxField = {
  description: 'Check me!',
  label: 'Stub Checkbox',
  name: 'stub-checkbox',
  type: 'checkbox',
};

export const stubRadioGroupOptions: GridFormRadioOption[] = [
  {
    label: 'Blue Team',
    value: 'blue',
  },
  {
    label: 'Red Team',
    value: 'red',
  },
];

export const stubRadioGroupField: GridFormRadioGroupField = {
  label: 'Stub Radio Group',
  options: stubRadioGroupOptions,
  name: 'stub-radio-group',
  type: 'radio-group',
};

export const stubSelectOptions = ['aaa', 'bbb'];

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
