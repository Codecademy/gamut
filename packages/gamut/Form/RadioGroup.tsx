import React, { cloneElement, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

export type RadioGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: any;
  htmlForPrefix: string;
  name?: string;
  onChange: () => void;
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

RadioGroup.propTypes = {
  name: PropTypes.string,
  htmlForPrefix: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default RadioGroup;
