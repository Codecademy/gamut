import React from 'react';
const defaultProps = {
  strokeLinecap: 'round',
  strokeWidth: 10,
  size: 24,
};
const offsetForEmptyProgress = 260;
const offsetForFullProgress = 8;
const offsetDelta = offsetForEmptyProgress - offsetForFullProgress;
const convertPercentToOffset = percent =>
  offsetForEmptyProgress - Math.floor(offsetDelta * (percent / 100));
const RadialProgress = ({
  size,
  duration,
  value,
  strokeLinecap,
  strokeWidth,
  ...props
}) => {
  let startingValue;
  let finalValue;
  if (Array.isArray(value)) {
    startingValue = convertPercentToOffset(value[0]);
    finalValue = convertPercentToOffset(value[1]);
  } else {
    startingValue = convertPercentToOffset(value);
    finalValue = convertPercentToOffset(value);
  }
  return React.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 100 100', height: size, width: size }, props),
    React.createElement('circle', {
      cx: '50',
      cy: '50',
      r: '40',
      stroke: 'currentColor',
      strokeWidth: strokeWidth,
      fill: 'none',
      opacity: '.2',
    }),
    React.createElement(
      'circle',
      {
        cx: '50',
        cy: '50',
        r: '40',
        stroke: 'currentColor',
        strokeWidth: strokeWidth,
        strokeLinecap: strokeLinecap,
        fill: 'none',
        opacity: '1',
        strokeDashoffset: finalValue,
        strokeDasharray: '260',
        transform: 'rotate(-90 50 50)',
      },
      startingValue !== finalValue &&
        React.createElement('animate', {
          attributeType: 'CSS',
          attributeName: 'stroke-dashoffset',
          from: startingValue,
          to: finalValue,
          dur: `${duration}ms`,
          begin: '0',
          fill: 'freeze',
        })
    )
  );
};
RadialProgress.defaultProps = defaultProps;
export default RadialProgress;
//# sourceMappingURL=index.js.map
