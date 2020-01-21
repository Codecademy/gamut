export type Option = unknown;
export type Size = unknown;
export type Validate = (value: string) => boolean;
export type BaseField = {
  label: string;
  field: string;
  size?: Size;
};
export type TextField = BaseField & {
  validate?: Validate;
  type: 'text' | 'email';
};
export type SelectField = BaseField & {
  options: Option[];
  type: 'select';
};
export type Field = TextField | SelectField;
export type Submit<T extends {}> = {
  text: React.ReactNode;
  onSubmit: (values: T) => Promise<void>;
  size?: Size;
};

export type FancyFormProps<T extends {}> = {
  fields: Field[];
  submit: Submit<T>;
};
