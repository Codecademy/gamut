import cx from 'classnames';
import { SVGProps } from 'react';
import * as React from 'react';

import { Text } from '../Typography';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export interface RadialProgressProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  duration?: number;
  value: number | number[];
  strokeWidth?: number | string;
  strokeLinecap?: 'round' | 'butt' | 'square';
  progressOutline?: {
    size: number;
    color: string;
  };
  adjustForStrokeWidth?: boolean;
  baseColor?: string;
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
  progressOutline,
  adjustForStrokeWidth,
  baseColor,
  ...props
}) => {
  let startingValue;
  let finalValue;
  const MAX_VIEWABLE_STROKE_WIDTH = 10;
  const strokeWidthParsed =
    typeof strokeWidth === 'number' ? strokeWidth : parseFloat(strokeWidth);
  let strokeWidthForOutline = 0;
  const circleRadius = 45;
  const viewBox = {
    minX: 0,
    minY: 0,
    width: 100,
    height: 100,
  };

  if (progressOutline) {
    const { size: progressOutlineSize = 0 } = progressOutline;
    if (!Number.isNaN(strokeWidthParsed)) {
      strokeWidthForOutline = strokeWidthParsed + progressOutlineSize;
    }
  }

  if (
    adjustForStrokeWidth &&
    !Number.isNaN(strokeWidthParsed) &&
    (strokeWidthParsed > MAX_VIEWABLE_STROKE_WIDTH ||
      strokeWidthForOutline > MAX_VIEWABLE_STROKE_WIDTH)
  ) {
    const largestStrokeWidth =
      strokeWidthForOutline > strokeWidthParsed
        ? strokeWidthForOutline
        : strokeWidthParsed;
    const excessStrokeWidth = largestStrokeWidth - MAX_VIEWABLE_STROKE_WIDTH;
    const halfOfExcessStrokeWidth = excessStrokeWidth / 2;
    viewBox.minX -= halfOfExcessStrokeWidth;
    viewBox.minY -= halfOfExcessStrokeWidth;
    viewBox.width += excessStrokeWidth;
    viewBox.height += excessStrokeWidth;
  }

  if (Array.isArray(value)) {
    startingValue = convertPercentToOffset(value[0]);
    finalValue = convertPercentToOffset(value[1]);
  } else {
    finalValue = startingValue = convertPercentToOffset(value);
  }
  const labelPercent = Array.isArray(value) ? value[1] : value;

  const svgViewBoxStr = `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`;

  return (
    <figure
      className={cx(styles.radialProgress, className)}
      style={{ height: size, width: size }}
    >
      <Text as="figcaption" screenreader>{`${labelPercent}% progress`}</Text>
      <svg viewBox={svgViewBoxStr} height={size} width={size} {...props}>
        <circle
          cx="50"
          cy="50"
          r={`${circleRadius}`}
          stroke={baseColor || 'currentColor'}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={baseColor ? '1' : '.2'}
        />
        {progressOutline && strokeWidthForOutline && (
          <circle
            cx="50"
            cy="50"
            r={`${circleRadius}`}
            stroke={progressOutline.color}
            strokeWidth={strokeWidthForOutline}
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
        )}
        <circle
          cx="50"
          cy="50"
          r={`${circleRadius}`}
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
    </figure>
  );
};
