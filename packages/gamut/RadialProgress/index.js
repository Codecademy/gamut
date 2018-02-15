import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  strokeWidth: PropTypes.string,
  strokeLinecap: PropTypes.oneOf(['round', 'butt', 'square']),
};

const defaultProps = {
  strokeLinecap: 'round',
  strokeWidth: '10',
  size: '24',
};

const offsetForEmptyProgress = 260;
const offsetForFullProgress = 8;
const offsetDelta = offsetForEmptyProgress - offsetForFullProgress;

const convertPercentToOffset = percent =>
  offsetForEmptyProgress - Math.floor(offsetDelta * (percent / 100));

function RadialProgress({
  size,
  className,
  duration,
  value,
  strokeLinecap,
  strokeWidth,
}) {
  const shouldAnimate = Array.isArray(value);

  const startingValue = shouldAnimate
    ? convertPercentToOffset(value[0])
    : offsetForEmptyProgress;

  const finalValue = shouldAnimate
    ? convertPercentToOffset(value[1])
    : convertPercentToOffset(value);

  return (
    <svg viewBox="0 0 100 100" height={size} width={size} className={className}>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        opacity=".2"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        fill="none"
        opacity="1"
        strokeDashoffset={finalValue}
        strokeDasharray="260"
        transform="rotate(-90 50 50)"
      >
        {shouldAnimate && (
          <animate
            attributeType="CSS"
            attributeName="stroke-dashoffset"
            from={startingValue}
            to={finalValue}
            dur={`${duration}ms`}
            begin="0"
            fill="freeze"
          />
        )}
      </circle>
    </svg>
  );
}

RadialProgress.propTypes = propTypes;
RadialProgress.defaultProps = defaultProps;
export default RadialProgress;
