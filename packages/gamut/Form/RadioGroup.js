import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const children = props.children.map((child, index) => {
    return cloneElement(
      child,
      {
        onChange: props.onChange,
        htmlFor: `${props.htmlForPrefix}-${index}`,
        name: props.name,
        key: child.props.key || child.props.value
      }
    );
  });
  return (
    <div>
      {children}
    </div>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  htmlForPrefix: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node
};

export default RadioGroup;
