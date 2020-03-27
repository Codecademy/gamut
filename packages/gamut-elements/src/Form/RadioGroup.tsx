import React, { cloneElement, HTMLAttributes } from 'react';

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  Pick<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
    /**
     * @remarks This is meant to be `Radio`s.
     */
    children: any[];
    htmlForPrefix?: string;
    name?: string;
    selected?: string;
  };

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  onChange,
  htmlForPrefix,
  name,
  ...rest
}) => (
  <div {...(rest as HTMLAttributes<HTMLDivElement>)}>
    {React.Children.map(children, (child, index) =>
      cloneElement(child, {
        onChange: onChange,
        htmlFor: `${htmlForPrefix}-${index}`,
        name: name,
      })
    )}
  </div>
);

export default RadioGroup;
