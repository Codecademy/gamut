import {
  GridFormCheckboxField,
  GridFormFileField,
  GridFormHiddenField,
  GridFormNestedCheckboxField,
  GridFormRadioGroupField,
  GridFormRadioOption,
  GridFormSelectField,
  GridFormSweetContainerField,
  GridFormTextAreaField,
  GridFormTextField,
  NestedGridFormCheckboxOption,
} from '../types';

export const stubCheckboxField: GridFormCheckboxField = {
  description: 'Check me!',
  label: 'Check me!',
  name: 'stub-checkbox',
  size: 6,
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
  size: 6,
  rowspan: 2,
  type: 'radio-group',
};

export const stubSelectOptions = ['aaa', 'bbb'];

export const stubSelectField: GridFormSelectField = {
  label: 'Stub Select',
  options: stubSelectOptions,
  name: 'stub-select',
  size: 6,
  type: 'select',
};

export const stubTextField: GridFormTextField = {
  label: 'Stub Text',
  name: 'stub-text',
  size: 6,
  type: 'text',
};

export const stubFileField: GridFormFileField = {
  label: 'Stub File',
  name: 'stub-file',
  size: 6,
  type: 'file',
};

export const stubTextareaField: GridFormTextAreaField = {
  label: 'Stub Textarea',
  name: 'stub-textarea',
  size: 6,
  type: 'textarea',
};

export const stubHiddenField: GridFormHiddenField = {
  name: 'secret-field',
  type: 'hidden',
  defaultValue: "you can't see me!",
};

export const stubSweetContainerField: GridFormSweetContainerField = {
  name: 'sweet_container',
  type: 'sweet-container',
  label: 'Check this input if you are an automated machine, and not a human',
  defaultValue: false,
};

export const stubNestedCheckboxOptions: NestedGridFormCheckboxOption[] = [
  {
    value: 'frontend',
    label: 'Frontend Technologies',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend Technologies',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
    ],
  },
];

export const stubNestedCheckboxField: GridFormNestedCheckboxField = {
  label: 'Stub Nested Checkboxes',
  name: 'stub-nested-checkboxes',
  options: stubNestedCheckboxOptions,
  size: 6,
  type: 'nested-checkboxes',
};

export const stubFieldCases = [
  [
    'text field',
    stubTextField,
    'byRole',
    'textbox',
    { name: 'Stub Text' },
    'mycoolid',
  ],
  [
    'select field',
    stubSelectField,
    'byRole',
    'combobox',
    { name: 'Stub Select' },
    'swaggy-id',
  ],
  [
    'checkbox field',
    stubCheckboxField,
    'byRole',
    'checkbox',
    { name: 'Check me!' },
    'another-dank-id',
  ],
  [
    'textarea field',
    stubTextareaField,
    'byRole',
    'textbox',
    { name: 'Stub Textarea' },
    'id-2-the-ego',
  ],
  [
    'radio group field',
    stubRadioGroupField,
    'allByRole',
    'radio',
    undefined,
    'and-another-one',
  ],
  [
    'file field',
    stubFileField,
    'byLabelText',
    'Stub File',
    undefined,
    'fire-file',
  ],
];
