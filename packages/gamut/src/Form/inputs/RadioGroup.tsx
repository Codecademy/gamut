import { cloneElement, HTMLAttributes, InputHTMLAttributes } from 'react';
import * as React from 'react';

import { BaseInputProps } from './types';

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'disabled'> &
  Pick<BaseInputProps, 'name'> & {
    /**
     * @remarks This is meant to be `Radio`s.
     */
    children: any[];
    htmlForPrefix?: string;
    selected?: string;
  };

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  onChange,
  htmlForPrefix,
  name,
  ...rest
}) => (
  <div {...rest}>
    {React.Children.map(children, (child, index) =>
      cloneElement(child, {
        onChange,
        htmlFor: `${htmlForPrefix}-${index}`,
        name,
      })
    )}
  </div>
);
