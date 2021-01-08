import React from 'react';

export type PatternProps = {
  width: number | string;
  height: number | string;
  name:
    | 'diagonalStripesLoose'
    | 'diagonalStripesRegular'
    | 'diagonalStripesDense';
  className?: string;
};

export const Pattern: React.FC<PatternProps> = ({
  width,
  height,
  name,
  className,
}) => (
  <div className={className}>
    <svg width={width} height={height}>
      <defs>
        <pattern
          id="diagonalStripesLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect y="15" width="1" height="1" fill="currentColor" />
          <rect x="1" y="14" width="1" height="1" fill="currentColor" />
          <rect x="2" y="13" width="1" height="1" fill="currentColor" />
          <rect x="3" y="12" width="1" height="1" fill="currentColor" />
          <rect x="4" y="11" width="1" height="1" fill="currentColor" />
          <rect x="5" y="10" width="1" height="1" fill="currentColor" />
          <rect x="6" y="9" width="1" height="1" fill="currentColor" />
          <rect x="7" y="8" width="1" height="1" fill="currentColor" />
          <rect x="8" y="7" width="1" height="1" fill="currentColor" />
          <rect x="9" y="6" width="1" height="1" fill="currentColor" />
          <rect x="10" y="5" width="1" height="1" fill="currentColor" />
          <rect x="11" y="4" width="1" height="1" fill="currentColor" />
          <rect x="12" y="3" width="1" height="1" fill="currentColor" />
          <rect x="13" y="2" width="1" height="1" fill="currentColor" />
          <rect x="14" y="1" width="1" height="1" fill="currentColor" />
          <rect x="15" width="1" height="1" fill="currentColor" />
        </pattern>
        <pattern
          id="diagonalStripesRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <g clipPath="url(#clipDiagonalStripesRegular)">
            <rect width="8" height="8" fill="white" />
            <rect y="7" width="1" height="1" fill="currentColor" />
            <rect x="1" y="6" width="1" height="1" fill="currentColor" />
            <rect x="2" y="5" width="1" height="1" fill="currentColor" />
            <rect x="3" y="4" width="1" height="1" fill="currentColor" />
            <rect x="4" y="3" width="1" height="1" fill="currentColor" />
            <rect x="5" y="2" width="1" height="1" fill="currentColor" />
            <rect x="6" y="1" width="1" height="1" fill="currentColor" />
            <rect x="7" width="1" height="1" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clipDiagonalStripesRegular">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </pattern>
        <pattern
          id="diagonalStripesDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <g clipPath="url(#clipDiagonalStripesDense)">
            <rect width="4" height="4" fill="white" />
            <rect y="3" width="1" height="1" fill="currentColor" />
            <rect x="1" y="2" width="1" height="1" fill="currentColor" />
            <rect x="2" y="1" width="1" height="1" fill="currentColor" />
            <rect x="3" width="1" height="1" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clipDiagonalStripesDense">
              <rect width="4" height="4" fill="white" />
            </clipPath>
          </defs>
        </pattern>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill={`url(#${name})`} />
    </svg>
  </div>
);
