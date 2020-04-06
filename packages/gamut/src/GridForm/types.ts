import { ValidationOptions } from 'react-hook-form';

import { ColumnSizes, ResponsiveProperty } from '../Layout';

export type BaseFormField = {
  defaultValue?: string;
  label: string;
  name: string;
  size?: ResponsiveProperty<ColumnSizes>;
};

export type GridFormTextField = BaseFormField & {
  validation?: ValidationOptions;
  type: 'text' | 'email';
};

export type GridFormSelectField = BaseFormField & {
  options: string[];
  type: 'select';
};

export type GridFormField = GridFormTextField | GridFormSelectField;
