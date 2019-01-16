import React from 'react';
import PropTypes from 'prop-types';
import Code from '../Code';
import isValidComponent from '../../../utils/isValidComponent';

const getComponentFromOverride = (override = {}) =>
  isValidComponent(override) ? override : override.component;

const PreCodeBlock = ({ overrides, ...props }) => {
  const children = React.Children.toArray(props.children);

  if (!children.length || children.length > 1) return <pre {...props} />;

  const child = children[0];

  const CodeBlock = getComponentFromOverride(overrides.CodeBlock);
  const CodeOverride = getComponentFromOverride(overrides.code) || Code;

  const isCode =
    child.type === 'code' || (CodeOverride && child.type === CodeOverride);

  if (isCode && CodeBlock) {
    const language =
      child.props.className && child.props.className.replace('lang-', '');
    console.log(overrides.CodeBlock.props);
    return (
      <pre {...props}>
        <CodeBlock
          {...child.props}
          language={language}
          {...overrides.CodeBlock.props}
        />
      </pre>
    );
  }

  return <pre {...props} />;
};

const ComponentType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({ render: PropTypes.func.isRequired }),
]);

PreCodeBlock.propTypes = {
  overrides: PropTypes.objectOf(
    PropTypes.oneOfType([
      ComponentType,
      PropTypes.shape({
        component: ComponentType,
        props: PropTypes.object,
      }),
    ])
  ),

  children: PropTypes.node,
};

export default PreCodeBlock;
