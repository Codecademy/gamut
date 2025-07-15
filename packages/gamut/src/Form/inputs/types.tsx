import { ReactNode } from 'react';

export type CheckboxStringLabelProps = {
  label: string;
  'aria-label'?: string;
};

export type CheckboxReactNodeLabelProps = {
  label: ReactNode;
  'aria-label': string;
};

type CheckboxIndeterminate = {
  indeterminate: boolean;
  checked?: false;
};

type CheckboxRegular = {
  indeterminate?: never;
  checked?: boolean;
};

export type CheckboxCheckedUnion = CheckboxRegular | CheckboxIndeterminate;

export type CheckboxLabelUnion =
  | CheckboxStringLabelProps
  | CheckboxReactNodeLabelProps;
