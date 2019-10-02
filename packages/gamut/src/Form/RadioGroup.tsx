import React, { cloneElement, HTMLAttributes } from 'react';

export type RadioGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: any;
  htmlForPrefix?: string;
  name?: string;
  selected?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
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
