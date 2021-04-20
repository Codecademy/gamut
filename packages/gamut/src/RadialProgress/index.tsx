import cx from 'classnames';
import React, { SVGProps } from 'react';

import styles from './styles.module.scss';

export interface RadialProgressProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  duration?: number;
  value: number | number[];
  strokeWidth?: number | string;
  strokeLinecap?: 'round' | 'butt' | 'square';
}

const offsetForEmptyProgress = 290;
const offsetForFullProgress = 10;
const offsetDelta = offsetForEmptyProgress - offsetForFullProgress;

const convertPercentToOffset = (percent: number) =>
  offsetForEmptyProgress - Math.floor(offsetDelta * (percent / 100));

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 */

export const RadialProgress: React.FC<RadialProgressProps> = ({
  children,
  className,
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
    <div
      className={cx(styles.radialProgress, className)}
      style={{ height: size, width: size }}
    >
      <svg
        aria-label={`${value}% progress`}
        viewBox="0 0 100 100"
        height={size}
        width={size}
        {...props}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          opacity=".2"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          fill="none"
          opacity="1"
          strokeDashoffset={finalValue}
          strokeDasharray={offsetForEmptyProgress}
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
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};
