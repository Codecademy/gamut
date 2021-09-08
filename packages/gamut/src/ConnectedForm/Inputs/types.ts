import { RegisterOptions } from 'react-hook-form';

export type BaseConnectedInputProps = {
  name: string;
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
};
