import {
  ColumnSizes,
  ResponsiveProperty,
} from '@codecademy/gamut/dist/Layout/types';
import { ValidationOptions } from 'react-hook-form';

export type BaseFormField = {
  name: string;
  size?: ResponsiveProperty<ColumnSizes>;
};

export type GridFormCheckboxField = BaseFormField & {
  description: string;
  defaultValue?: boolean;
  label?: string;
  type: 'checkbox';
};

export type GridFormTextField = BaseFormField & {
  defaultValue?: string;
  label: string;
  validation?: ValidationOptions;
  type: 'text' | 'email';
};

export type GridFormSelectField = BaseFormField & {
  defaultValue?: string;
  label: string;
  options: string[];
  type: 'select';
};

export type GridFormFileField = BaseFormField & {
  defaultValue?: FileList;
  label: string;
  validation?: ValidationOptions;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormField & {
  defaultValue?: string;
  label: string;
  validation?: ValidationOptions;
  type: 'textarea';
};

export type GridFormField =
  | GridFormCheckboxField
  | GridFormTextField
  | GridFormSelectField
  | GridFormFileField
  | GridFormTextAreaField;
