import React, {
  cloneElement,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react';

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
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
