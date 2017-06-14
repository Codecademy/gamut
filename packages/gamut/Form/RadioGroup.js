import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({children, onChange, htmlForPrefix, name}) => (
  <div>
    {React.Children.map(children, (child, index) => cloneElement(
      child, {
        onChange: onChange,
        htmlFor: `${htmlForPrefix}-${index}`,
        name: name
      })
    )}
  </div>
);

RadioGroup.propTypes = {
  name: PropTypes.string,
  htmlForPrefix: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node
};

export default RadioGroup;
