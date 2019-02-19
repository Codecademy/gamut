import React, { SVGProps, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

export interface RadialProgressProps extends SVGProps<SVGSVGElement> {
  size?: number;
  duration?: number;
  value?: number | number[];
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
}

const defaultProps: RadialProgressProps = {
  strokeLinecap: 'round',
  strokeWidth: 10,
  size: 24,
};

const offsetForEmptyProgress = 260;
const offsetForFullProgress = 8;
const offsetDelta = offsetForEmptyProgress - offsetForFullProgress;

const convertPercentToOffset = percent =>
  offsetForEmptyProgress - Math.floor(offsetDelta * (percent / 100));

const RadialProgress: FunctionComponent<RadialProgressProps> = ({
  size,
  duration,
  value,
  strokeLinecap,
  strokeWidth,
  ...props
}) => {
  const shouldAnimate = Array.isArray(value);

  const startingValue = shouldAnimate
    ? convertPercentToOffset(value[0])
    : offsetForEmptyProgress;

  const finalValue = shouldAnimate
    ? convertPercentToOffset(value[1])
    : convertPercentToOffset(value);

  return (
    <svg viewBox="0 0 100 100" height={size} width={size} {...props}>
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
};

RadialProgress.defaultProps = defaultProps;
export default RadialProgress;
