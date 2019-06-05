import React, { cloneElement, HTMLAttributes } from 'react';

export type RadioGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: any;
  htmlForPrefix: string;
  name?: string;
};

const RadioGroup = ({
  children,
  onChange,
  htmlForPrefix,
  name,
  ...rest
}: RadioGroupProps) => (
  <div {...rest}>
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
