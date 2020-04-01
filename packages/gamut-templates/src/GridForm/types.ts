import {
  ColumnSizes,
  ResponsiveProperty,
} from '@codecademy/gamut/dist/Layout/types';
import { ValidationOptions } from 'react-hook-form';

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
