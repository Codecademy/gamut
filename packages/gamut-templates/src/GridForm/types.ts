import { ColSizing } from '@codecademy/gamut/dist/FlexGrid/Col';

export type Validate = (value: string) => boolean;

export type BaseFormField = {
  defaultValue?: string;
  label: string;
  name: string;
  sizing?: ColSizing;
};

export type GridFormTextField = BaseFormField & {
  validate?: Validate;
  type: 'text' | 'email';
};

export type GridFormSelectField = BaseFormField & {
  options: string[];
  type: 'select';
};

export type GridFormField = GridFormTextField | GridFormSelectField;
