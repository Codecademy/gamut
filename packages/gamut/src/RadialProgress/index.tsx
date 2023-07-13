import { theme } from '@codecademy/gamut-styles';
import cx from 'classnames';
import React, { SVGProps } from 'react';

import { Text } from '../Typography';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export interface RadialProgressProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  duration?: number;
  value: number | number[];
  strokeWidth?: number | string;
  strokeLinecap?: 'round' | 'butt' | 'square';
  outerStrokeWidth?: number | string;
  progressRemainingColor?: string;
  haasOuterStroke?: boolean;
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
  outerStrokeWidth = strokeWidth,
  progressRemainingColor = 'currentColor',
  hasOuterStroke = false,
  ...props
}) => {
  let startingValue;
  let finalValue;

  // outerStrokeWidth

  if (Array.isArray(value)) {
    startingValue = convertPercentToOffset(value[0]);
    finalValue = convertPercentToOffset(value[1]);
  } else {
    finalValue = startingValue = convertPercentToOffset(value);
  }
  const labelPercent = Array.isArray(value) ? value[1] : value;

  return (
    <figure
      className={cx(styles.radialProgress, className)}
      style={{ height: size, width: size }}
    >
      <Text as="figcaption" screenreader>{`${labelPercent}% progress`}</Text>
      <svg viewBox="0 0 100 100" height={size} width={size} {...props}>
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          opacity=".2"
          color={theme.colors['yellow-0']}
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={progressRemainingColor || 'currentColor'}
          strokeWidth={outerStrokeWidth || strokeWidth}
          strokeLinecap={strokeLinecap}
          fill="none"
          opacity="1"
          strokeDashoffset={finalValue}
          strokeDasharray={
            hasOuterStroke ? offsetForEmptyProgress + 3 : offsetForEmptyProgress
          }
          transform={hasOuterStroke ? 'rotate(-92 50 50)' : 'rotate(-90 50 50)'}
        >
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
        </circle>
      </svg>
      {children && <div className={styles.children}>{children}</div>}
    </figure>
  );
};
