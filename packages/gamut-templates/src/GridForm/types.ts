import { ColSizing } from '@codecademy/gamut/dist/FlexGrid/Col';
import { ValidationOptions } from 'react-hook-form';

export type BaseFormField = {
  defaultValue?: string;
  label: string;
  name: string;
  sizing?: ColSizing;
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
