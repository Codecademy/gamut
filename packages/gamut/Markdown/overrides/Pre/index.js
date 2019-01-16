import React from 'react';
import PropTypes from 'prop-types';
import Code from '../Code';
import isValidComponent from '../../../utils/isValidComponent';

const normalizeOverride = (override = {}) =>
  isValidComponent(override)
    ? {
        component: override,
        props: {},
      }
    : override;

const Pre = ({ overrides, ...props }) => {
  const children = React.Children.toArray(props.children);

  if (!children.length || children.length > 1) return <pre {...props} />;

  const child = children[0];

  const CodeBlock = normalizeOverride(overrides.CodeBlock);
  const CodeOverride = normalizeOverride(overrides.code || Code);

  const isCode =
    child.type === 'code' ||
    (CodeOverride.component && child.type === CodeOverride.component);

  if (isCode && CodeBlock.component) {
    const language =
      child.props.className && child.props.className.replace('lang-', '');

    return (
      <pre {...props}>
        <CodeBlock.component
          {...child.props}
          language={language}
          {...CodeBlock.props}
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

Pre.propTypes = {
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

export default Pre;
