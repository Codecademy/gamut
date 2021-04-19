import React from 'react';

import { PatternName } from './index';

export const defs = (name: PatternName) => {
  return (
    <defs>
      {name === 'diagonalStripeBLoose' && (
        <pattern
          id="diagonalStripeBLoose"
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
      {name === 'diagonalStripeBRegular' && (
        <pattern
          id="diagonalStripeBRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <g clipPath="url(#clipDiagonalStripeBRegular)">
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
            <clipPath id="clipDiagonalStripeBRegular">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </pattern>
      )}
      {name === 'diagonalStripeBDense' && (
        <pattern
          id="diagonalStripeBDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <g clipPath="url(#clipDiagonalStripeBDense)">
            <rect width="4" height="4" fill="white" />
            <rect y="3" width="1" height="1" fill="currentColor" />
            <rect x="1" y="2" width="1" height="1" fill="currentColor" />
            <rect x="2" y="1" width="1" height="1" fill="currentColor" />
            <rect x="3" width="1" height="1" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clipDiagonalStripeBDense">
              <rect width="4" height="4" fill="white" />
            </clipPath>
          </defs>
        </pattern>
      )}
      {name === 'checkerLoose' && (
        <pattern
          id="checkerLoose"
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
          id="checkerRegular"
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
          id="checkerDense"
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
      {name === 'diagonalStripeALoose' && (
        <pattern
          id="diagonalStripeALoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="14" y="2" width="1" height="1" fill="currentColor" />
          <rect x="13" y="2" width="1" height="1" fill="currentColor" />
          <rect x="13" y="3" width="1" height="1" fill="currentColor" />
          <rect x="12" y="3" width="1" height="1" fill="currentColor" />
          <rect x="15" width="1" height="1" fill="currentColor" />
          <rect x="15" y="1" width="1" height="1" fill="currentColor" />
          <rect x="14" y="1" width="1" height="1" fill="currentColor" />
          <rect x="11" y="5" width="1" height="1" fill="currentColor" />
          <rect x="10" y="5" width="1" height="1" fill="currentColor" />
          <rect x="10" y="6" width="1" height="1" fill="currentColor" />
          <rect x="9" y="6" width="1" height="1" fill="currentColor" />
          <rect x="8" y="7" width="1" height="1" fill="currentColor" />
          <rect x="9" y="7" width="1" height="1" fill="currentColor" />
          <rect x="12" y="4" width="1" height="1" fill="currentColor" />
          <rect x="11" y="4" width="1" height="1" fill="currentColor" />
          <rect x="7" y="9" width="1" height="1" fill="currentColor" />
          <rect x="6" y="9" width="1" height="1" fill="currentColor" />
          <rect x="6" y="10" width="1" height="1" fill="currentColor" />
          <rect x="5" y="10" width="1" height="1" fill="currentColor" />
          <rect x="8" y="8" width="1" height="1" fill="currentColor" />
          <rect x="7" y="8" width="1" height="1" fill="currentColor" />
          <rect x="4" y="12" width="1" height="1" fill="currentColor" />
          <rect x="3" y="12" width="1" height="1" fill="currentColor" />
          <rect x="3" y="13" width="1" height="1" fill="currentColor" />
          <rect x="2" y="13" width="1" height="1" fill="currentColor" />
          <rect x="1" y="14" width="1" height="1" fill="currentColor" />
          <rect x="2" y="14" width="1" height="1" fill="currentColor" />
          <rect y="15" width="1" height="1" fill="currentColor" />
          <rect x="1" y="15" width="1" height="1" fill="currentColor" />
          <rect x="5" y="11" width="1" height="1" fill="currentColor" />
          <rect x="4" y="11" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'diagonalStripeARegular' && (
        <pattern
          id="diagonalStripeARegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="6" y="2" width="1" height="1" fill="currentColor" />
          <rect x="5" y="2" width="1" height="1" fill="currentColor" />
          <rect x="5" y="3" width="1" height="1" fill="currentColor" />
          <rect x="4" y="3" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
          <rect x="7" y="1" width="1" height="1" fill="currentColor" />
          <rect x="6" y="1" width="1" height="1" fill="currentColor" />
          <rect x="3" y="5" width="1" height="1" fill="currentColor" />
          <rect x="2" y="5" width="1" height="1" fill="currentColor" />
          <rect x="2" y="6" width="1" height="1" fill="currentColor" />
          <rect x="1" y="6" width="1" height="1" fill="currentColor" />
          <rect y="7" width="1" height="1" fill="currentColor" />
          <rect x="1" y="7" width="1" height="1" fill="currentColor" />
          <rect x="4" y="4" width="1" height="1" fill="currentColor" />
          <rect x="3" y="4" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'diagonalStripeADense' && (
        <pattern
          id="diagonalStripeADense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="2" y="2" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="1" y="3" width="1" height="1" fill="currentColor" />
          <rect y="3" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="3" y="1" width="1" height="1" fill="currentColor" />
          <rect x="2" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'dotLoose' && (
        <pattern
          id="dotLoose"
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
            fill-opacity="0.5"
          />
          <rect
            y="1"
            width="0.5"
            height="0.5"
            fill="currentColor"
            fill-opacity="0.5"
          />
          <rect y="0.5" width="0.5" height="0.5" fill="currentColor" />
          <rect
            x="1"
            width="0.5"
            height="0.5"
            fill="currentColor"
            fill-opacity="0.5"
          />
          <rect
            x="1"
            y="1"
            width="0.5"
            height="0.5"
            fill="currentColor"
            fill-opacity="0.5"
          />
          <rect x="1" y="0.5" width="0.5" height="0.5" fill="currentColor" />
          <rect x="0.5" width="0.5" height="0.5" fill="currentColor" />
          <rect x="0.5" y="1" width="0.5" height="0.5" fill="currentColor" />
          <rect x="0.5" y="0.5" width="0.5" height="0.5" fill="currentColor" />
        </pattern>
      )}
      {name === 'dotRegular' && (
        <pattern
          id="dotRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="0.5" cy="0.5" r="0.5" fill="currentColor" />
        </pattern>
      )}
      {name === 'dotDense' && (
        <pattern
          id="dotDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="0.5" cy="0.5" r="0.5" fill="currentColor" />
        </pattern>
      )}
      {name === 'xLoose' && (
        <pattern
          id="xLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" width="1" height="1" fill="currentColor" />
          <rect y="1" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="15" width="1" height="1" fill="currentColor" />
          <rect x="15" y="2" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'xRegular' && (
        <pattern
          id="xRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" width="1" height="1" fill="currentColor" />
          <rect y="1" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
          <rect x="7" y="2" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'xDense' && (
        <pattern
          id="xDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" width="1" height="1" fill="currentColor" />
          <rect y="1" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="3" y="2" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'flowerLoose' && (
        <pattern
          id="flowerLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="1" y="1" width="1" height="1" fill="currentColor" />
          <rect y="2" width="1" height="1" fill="currentColor" />
          <rect x="15" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'flowerRegular' && (
        <pattern
          id="flowerRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="1" y="1" width="1" height="1" fill="currentColor" />
          <rect y="2" width="1" height="1" fill="currentColor" />
          <rect x="7" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'flowerDense' && (
        <pattern
          id="flowerDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="1" y="1" width="1" height="1" fill="currentColor" />
          <rect y="2" width="1" height="1" fill="currentColor" />
          <rect x="3" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'gridLoose' && (
        <pattern
          id="gridLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect y="8" width="1" height="1" fill="currentColor" />
          <rect x="8" width="1" height="1" fill="currentColor" />
          <rect x="8" y="8" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'gridRegular' && (
        <pattern
          id="gridRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect y="4" width="1" height="1" fill="currentColor" />
          <rect x="4" width="1" height="1" fill="currentColor" />
          <rect x="4" y="4" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'gridDense' && (
        <pattern
          id="gridDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect y="2" width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="2" y="2" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'herringboneLoose' && (
        <pattern
          id="herringboneLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect y="1" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="3" y="1" width="1" height="1" fill="currentColor" />
          <rect x="15" width="1" height="1" fill="currentColor" />
          <rect x="14" width="1" height="1" fill="currentColor" />
          <rect x="15" y="1" width="1" height="1" fill="currentColor" />
          <rect x="15" y="3" width="1" height="1" fill="currentColor" />
          <rect x="15" y="4" width="1" height="1" fill="currentColor" />
          <rect x="14" y="4" width="1" height="1" fill="currentColor" />
          <rect x="15" y="5" width="1" height="1" fill="currentColor" />
          <rect x="3" y="3" width="1" height="1" fill="currentColor" />
          <rect x="4" y="3" width="1" height="1" fill="currentColor" />
          <rect x="2" y="4" width="1" height="1" fill="currentColor" />
          <rect x="3" y="4" width="1" height="1" fill="currentColor" />
          <rect x="3" y="5" width="1" height="1" fill="currentColor" />
          <rect x="4" y="5" width="1" height="1" fill="currentColor" />
          <rect x="4" y="1" width="1" height="1" fill="currentColor" />
          <rect x="5" y="2" width="1" height="1" fill="currentColor" />
          <rect x="15" y="7" width="1" height="1" fill="currentColor" />
          <rect x="15" y="8" width="1" height="1" fill="currentColor" />
          <rect x="14" y="8" width="1" height="1" fill="currentColor" />
          <rect x="15" y="9" width="1" height="1" fill="currentColor" />
          <rect x="3" y="7" width="1" height="1" fill="currentColor" />
          <rect x="4" y="7" width="1" height="1" fill="currentColor" />
          <rect x="2" y="8" width="1" height="1" fill="currentColor" />
          <rect x="3" y="8" width="1" height="1" fill="currentColor" />
          <rect x="3" y="9" width="1" height="1" fill="currentColor" />
          <rect x="4" y="9" width="1" height="1" fill="currentColor" />
          <rect x="5" y="6" width="1" height="1" fill="currentColor" />
          <rect x="15" y="11" width="1" height="1" fill="currentColor" />
          <rect x="15" y="12" width="1" height="1" fill="currentColor" />
          <rect x="14" y="12" width="1" height="1" fill="currentColor" />
          <rect x="15" y="13" width="1" height="1" fill="currentColor" />
          <rect x="3" y="11" width="1" height="1" fill="currentColor" />
          <rect x="4" y="11" width="1" height="1" fill="currentColor" />
          <rect x="2" y="12" width="1" height="1" fill="currentColor" />
          <rect x="3" y="12" width="1" height="1" fill="currentColor" />
          <rect x="3" y="13" width="1" height="1" fill="currentColor" />
          <rect x="4" y="13" width="1" height="1" fill="currentColor" />
          <rect x="15" y="15" width="1" height="1" fill="currentColor" />
          <rect x="3" y="15" width="1" height="1" fill="currentColor" />
          <rect x="4" y="15" width="1" height="1" fill="currentColor" />
          <rect x="5" y="10" width="1" height="1" fill="currentColor" />
          <rect x="5" y="14" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
          <rect x="6" width="1" height="1" fill="currentColor" />
          <rect x="7" y="1" width="1" height="1" fill="currentColor" />
          <rect x="7" y="3" width="1" height="1" fill="currentColor" />
          <rect x="8" y="3" width="1" height="1" fill="currentColor" />
          <rect x="6" y="4" width="1" height="1" fill="currentColor" />
          <rect x="7" y="4" width="1" height="1" fill="currentColor" />
          <rect x="7" y="5" width="1" height="1" fill="currentColor" />
          <rect x="8" y="5" width="1" height="1" fill="currentColor" />
          <rect x="8" y="1" width="1" height="1" fill="currentColor" />
          <rect x="9" y="2" width="1" height="1" fill="currentColor" />
          <rect x="7" y="7" width="1" height="1" fill="currentColor" />
          <rect x="8" y="7" width="1" height="1" fill="currentColor" />
          <rect x="6" y="8" width="1" height="1" fill="currentColor" />
          <rect x="7" y="8" width="1" height="1" fill="currentColor" />
          <rect x="7" y="9" width="1" height="1" fill="currentColor" />
          <rect x="8" y="9" width="1" height="1" fill="currentColor" />
          <rect x="9" y="6" width="1" height="1" fill="currentColor" />
          <rect x="7" y="11" width="1" height="1" fill="currentColor" />
          <rect x="8" y="11" width="1" height="1" fill="currentColor" />
          <rect x="6" y="12" width="1" height="1" fill="currentColor" />
          <rect x="7" y="12" width="1" height="1" fill="currentColor" />
          <rect x="7" y="13" width="1" height="1" fill="currentColor" />
          <rect x="8" y="13" width="1" height="1" fill="currentColor" />
          <rect x="7" y="15" width="1" height="1" fill="currentColor" />
          <rect x="8" y="15" width="1" height="1" fill="currentColor" />
          <rect x="9" y="10" width="1" height="1" fill="currentColor" />
          <rect x="9" y="14" width="1" height="1" fill="currentColor" />
          <rect x="11" width="1" height="1" fill="currentColor" />
          <rect x="10" width="1" height="1" fill="currentColor" />
          <rect x="11" y="1" width="1" height="1" fill="currentColor" />
          <rect x="11" y="3" width="1" height="1" fill="currentColor" />
          <rect x="12" y="3" width="1" height="1" fill="currentColor" />
          <rect x="10" y="4" width="1" height="1" fill="currentColor" />
          <rect x="11" y="4" width="1" height="1" fill="currentColor" />
          <rect x="11" y="5" width="1" height="1" fill="currentColor" />
          <rect x="12" y="5" width="1" height="1" fill="currentColor" />
          <rect x="12" y="1" width="1" height="1" fill="currentColor" />
          <rect x="13" y="2" width="1" height="1" fill="currentColor" />
          <rect x="11" y="7" width="1" height="1" fill="currentColor" />
          <rect x="12" y="7" width="1" height="1" fill="currentColor" />
          <rect x="10" y="8" width="1" height="1" fill="currentColor" />
          <rect x="11" y="8" width="1" height="1" fill="currentColor" />
          <rect x="11" y="9" width="1" height="1" fill="currentColor" />
          <rect x="12" y="9" width="1" height="1" fill="currentColor" />
          <rect x="13" y="6" width="1" height="1" fill="currentColor" />
          <rect x="11" y="11" width="1" height="1" fill="currentColor" />
          <rect x="12" y="11" width="1" height="1" fill="currentColor" />
          <rect x="10" y="12" width="1" height="1" fill="currentColor" />
          <rect x="11" y="12" width="1" height="1" fill="currentColor" />
          <rect x="11" y="13" width="1" height="1" fill="currentColor" />
          <rect x="12" y="13" width="1" height="1" fill="currentColor" />
          <rect x="11" y="15" width="1" height="1" fill="currentColor" />
          <rect x="12" y="15" width="1" height="1" fill="currentColor" />
          <rect x="13" y="10" width="1" height="1" fill="currentColor" />
          <rect x="13" y="14" width="1" height="1" fill="currentColor" />
          <rect y="3" width="1" height="1" fill="currentColor" />
          <rect y="5" width="1" height="1" fill="currentColor" />
          <rect x="1" y="6" width="1" height="1" fill="currentColor" />
          <rect y="7" width="1" height="1" fill="currentColor" />
          <rect y="9" width="1" height="1" fill="currentColor" />
          <rect x="1" y="10" width="1" height="1" fill="currentColor" />
          <rect y="11" width="1" height="1" fill="currentColor" />
          <rect y="13" width="1" height="1" fill="currentColor" />
          <rect x="1" y="14" width="1" height="1" fill="currentColor" />
          <rect y="15" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'herringboneRegular' && (
        <pattern
          id="herringboneRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect y="1" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="3" y="1" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
          <rect x="6" width="1" height="1" fill="currentColor" />
          <rect x="7" y="1" width="1" height="1" fill="currentColor" />
          <rect x="7" y="3" width="1" height="1" fill="currentColor" />
          <rect x="7" y="4" width="1" height="1" fill="currentColor" />
          <rect x="6" y="4" width="1" height="1" fill="currentColor" />
          <rect x="7" y="5" width="1" height="1" fill="currentColor" />
          <rect x="7" y="7" width="1" height="1" fill="currentColor" />
          <rect x="3" y="3" width="1" height="1" fill="currentColor" />
          <rect x="4" y="3" width="1" height="1" fill="currentColor" />
          <rect x="2" y="4" width="1" height="1" fill="currentColor" />
          <rect x="3" y="4" width="1" height="1" fill="currentColor" />
          <rect x="3" y="5" width="1" height="1" fill="currentColor" />
          <rect x="4" y="5" width="1" height="1" fill="currentColor" />
          <rect x="3" y="7" width="1" height="1" fill="currentColor" />
          <rect x="4" y="7" width="1" height="1" fill="currentColor" />
          <rect x="4" y="1" width="1" height="1" fill="currentColor" />
          <rect x="5" y="2" width="1" height="1" fill="currentColor" />
          <rect x="5" y="6" width="1" height="1" fill="currentColor" />
          <rect y="3" width="1" height="1" fill="currentColor" />
          <rect y="5" width="1" height="1" fill="currentColor" />
          <rect x="1" y="6" width="1" height="1" fill="currentColor" />
          <rect y="7" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'herringboneDense' && (
        <pattern
          id="herringboneDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect y="1" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="3" y="1" width="1" height="1" fill="currentColor" />
          <rect x="3" y="3" width="1" height="1" fill="currentColor" />
          <rect y="3" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'rainLoose' && (
        <pattern
          id="rainLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="1" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'rainRegular' && (
        <pattern
          id="rainRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="1" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'rainDense' && (
        <pattern
          id="rainDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="1" fill="currentColor" />
          <rect x="1" y="1" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'stripeLoose' && (
        <pattern
          id="stripeLoose"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" width="1" height="1" fill="currentColor" />
          <rect width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="1" y="8" width="1" height="1" fill="currentColor" />
          <rect y="8" width="1" height="1" fill="currentColor" />
          <rect x="2" y="8" width="1" height="1" fill="currentColor" />
          <rect x="3" y="8" width="1" height="1" fill="currentColor" />
          <rect x="5" width="1" height="1" fill="currentColor" />
          <rect x="4" width="1" height="1" fill="currentColor" />
          <rect x="6" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
          <rect x="5" y="8" width="1" height="1" fill="currentColor" />
          <rect x="4" y="8" width="1" height="1" fill="currentColor" />
          <rect x="6" y="8" width="1" height="1" fill="currentColor" />
          <rect x="7" y="8" width="1" height="1" fill="currentColor" />
          <rect x="9" width="1" height="1" fill="currentColor" />
          <rect x="8" width="1" height="1" fill="currentColor" />
          <rect x="10" width="1" height="1" fill="currentColor" />
          <rect x="11" width="1" height="1" fill="currentColor" />
          <rect x="9" y="8" width="1" height="1" fill="currentColor" />
          <rect x="8" y="8" width="1" height="1" fill="currentColor" />
          <rect x="10" y="8" width="1" height="1" fill="currentColor" />
          <rect x="11" y="8" width="1" height="1" fill="currentColor" />
          <rect x="13" width="1" height="1" fill="currentColor" />
          <rect x="12" width="1" height="1" fill="currentColor" />
          <rect x="14" width="1" height="1" fill="currentColor" />
          <rect x="15" width="1" height="1" fill="currentColor" />
          <rect x="13" y="8" width="1" height="1" fill="currentColor" />
          <rect x="12" y="8" width="1" height="1" fill="currentColor" />
          <rect x="14" y="8" width="1" height="1" fill="currentColor" />
          <rect x="15" y="8" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'stripeRegular' && (
        <pattern
          id="stripeRegular"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" width="1" height="1" fill="currentColor" />
          <rect width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="1" y="4" width="1" height="1" fill="currentColor" />
          <rect y="4" width="1" height="1" fill="currentColor" />
          <rect x="2" y="4" width="1" height="1" fill="currentColor" />
          <rect x="3" y="4" width="1" height="1" fill="currentColor" />
          <rect x="5" width="1" height="1" fill="currentColor" />
          <rect x="4" width="1" height="1" fill="currentColor" />
          <rect x="6" width="1" height="1" fill="currentColor" />
          <rect x="7" width="1" height="1" fill="currentColor" />
          <rect x="5" y="4" width="1" height="1" fill="currentColor" />
          <rect x="4" y="4" width="1" height="1" fill="currentColor" />
          <rect x="6" y="4" width="1" height="1" fill="currentColor" />
          <rect x="7" y="4" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
      {name === 'stripeDense' && (
        <pattern
          id="stripeDense"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" width="1" height="1" fill="currentColor" />
          <rect width="1" height="1" fill="currentColor" />
          <rect x="2" width="1" height="1" fill="currentColor" />
          <rect x="3" width="1" height="1" fill="currentColor" />
          <rect x="1" y="2" width="1" height="1" fill="currentColor" />
          <rect y="2" width="1" height="1" fill="currentColor" />
          <rect x="2" y="2" width="1" height="1" fill="currentColor" />
          <rect x="3" y="2" width="1" height="1" fill="currentColor" />
        </pattern>
      )}
    </defs>
  );
};
