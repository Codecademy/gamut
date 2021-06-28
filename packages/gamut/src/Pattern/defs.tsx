import React from 'react';

import { PatternName } from './index';

export const defs = (name: PatternName, idSuffix: string) => {
  return (
    <defs>
      {name === 'diagonalStripesLoose' && (
        <pattern
          id={`diagonalStripesLoose${idSuffix}`}
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
      )}
      {name === 'diagonalStripesRegular' && (
        <pattern
          id={`diagonalStripesRegular${idSuffix}`}
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <g clipPath={`url(#clipDiagonalStripesRegular${idSuffix})`}>
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
            <clipPath id={`clipDiagonalStripesRegular${idSuffix}`}>
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </pattern>
      )}
      {name === 'diagonalStripesDense' && (
        <pattern
          id={`diagonalStripesDense${idSuffix}`}
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <g clipPath={`url(#clipDiagonalStripesDense${idSuffix})`}>
            <rect width="4" height="4" fill="white" />
            <rect y="3" width="1" height="1" fill="currentColor" />
            <rect x="1" y="2" width="1" height="1" fill="currentColor" />
            <rect x="2" y="1" width="1" height="1" fill="currentColor" />
            <rect x="3" width="1" height="1" fill="currentColor" />
          </g>
          <defs>
            <clipPath id={`clipDiagonalStripesDense${idSuffix}`}>
              <rect width="4" height="4" fill="white" />
            </clipPath>
          </defs>
        </pattern>
      )}
      {name === 'checkerLoose' && (
        <pattern
          id={`checkerLoose${idSuffix}`}
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="8" y="8" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'checkerRegular' && (
        <pattern
          id={`checkerRegular${idSuffix}`}
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="4" y="4" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'checkerDense' && (
        <pattern
          id={`checkerDense${idSuffix}`}
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="2" y="2" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'dotLoose' && (
        <pattern
          id={`dotLoose${idSuffix}`}
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="0.5"
            height="0.5"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <rect
            y="1"
            width="0.5"
            height="0.5"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <rect y="0.5" width="0.5" height="0.5" fill="currentColor" />
          <rect
            x="1"
            width="0.5"
            height="0.5"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <rect
            x="1"
            y="1"
            width="0.5"
            height="0.5"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <rect x="1" y="0.5" width="0.5" height="0.5" fill="currentColor" />
          <rect x="0.5" width="0.5" height="0.5" fill="currentColor" />
          <rect x="0.5" y="1" width="0.5" height="0.5" fill="currentColor" />
          <rect x="0.5" y="0.5" width="0.5" height="0.5" fill="currentColor" />
        </pattern>
      )}
    </defs>
  );
};
