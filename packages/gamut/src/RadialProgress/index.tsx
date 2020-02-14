import React, { SVGProps } from 'react';

export interface RadialProgressProps extends SVGProps<SVGSVGElement> {
  size?: number;
  duration?: number;
  value?: number | number[];
  strokeWidth?: number | string;
  strokeLinecap?: 'round' | 'butt' | 'square';
}

const offsetForEmptyProgress = 260;
const offsetForFullProgress = 8;
const offsetDelta = offsetForEmptyProgress - offsetForFullProgress;

const convertPercentToOffset = (percent: number) =>
  offsetForEmptyProgress - Math.floor(offsetDelta * (percent / 100));

export const RadialProgress: React.FC<RadialProgressProps> = ({
  size = 24,
  duration,
  value,
  strokeLinecap = 'round',
  strokeWidth = 10,
  ...props
}) => {
  let startingValue;
  let finalValue;

  if (Array.isArray(value)) {
    startingValue = convertPercentToOffset(value[0]);
    finalValue = convertPercentToOffset(value[1]);
  } else {
    finalValue = startingValue = convertPercentToOffset(value);
  }

  return (
    <svg
      aria-label={`${finalValue}% progress`}
      viewBox="0 0 100 100"
      height={size}
      width={size}
      {...props}
    >
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
        {startingValue !== finalValue && (
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

export default RadialProgress;
