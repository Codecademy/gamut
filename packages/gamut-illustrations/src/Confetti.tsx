import React from 'react';

import { IllustrationProps } from './types';

export const Confetti: React.FC<IllustrationProps> = ({
  className,
  height,
  width,
}) => (
  <svg
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 62 56"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M42.9001 41.4535L12.9763 50.844L1 54.6024L14.2835 12.2056"
      fill="white"
    />
    <path
      d="M42.9001 41.4535L12.9763 50.844L1 54.6024L14.2835 12.2056"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M44.697 40.5305C47.8019 37.4256 43.687 28.2767 35.5061 20.0958C27.3253 11.9149 18.1764 7.80006 15.0715 10.905C11.9666 14.0098 16.0815 23.1587 24.2623 31.3396C32.4432 39.5205 41.5921 43.6353 44.697 40.5305Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M10.88 23.0681L14.2834 12.2056"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M27.18 46.3864L12.9764 50.8437C6.26155 44.1289 7.21302 34.7731 7.21302 34.7731L10.8803 23.0681C10.8803 23.0681 13.1487 32.3551 27.18 46.3864Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M27.2246 46.3085L13.021 50.7658C6.3061 44.051 7.25757 34.6952 7.25757 34.6952L10.9248 22.9902C10.9248 22.9902 13.1933 32.2772 27.2246 46.3085Z"
      fill="url(#pattern0)"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M12.9341 51.0172L12.8689 50.9519C9.37275 47.4558 7.97989 43.2403 7.42709 40.3192C6.82842 37.1557 7.05906 34.7819 7.0618 34.7587L7.06799 34.7283L10.8984 22.5026L11.0283 23.0326C11.034 23.0558 11.6219 25.3926 13.9109 29.4083C16.024 33.1154 20.0599 39.0516 27.288 46.2795L27.4656 46.4571L27.2259 46.5324L12.9341 51.0172ZM7.36285 34.8034C7.34459 35.0076 7.15992 37.2792 7.72814 40.2726C8.27029 43.1301 9.62875 47.246 13.0192 50.6714L26.8952 46.3168C19.7464 39.1371 15.7412 33.2375 13.6363 29.5412C11.9323 26.5493 11.1639 24.4763 10.8763 23.5892L7.36285 34.8034Z"
      fill="#10162F"
    />
    <path
      d="M23.389 24.4508C23.389 24.4508 33.0196 11.9349 29.219 1"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M28.2533 25.5038C28.2533 25.5038 33.9696 16.6008 41.3582 13.1393"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M30.8839 28.8061C30.8839 28.8061 39.1706 21.4395 52.9813 23.7283"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M58.6147 28.1238C59.932 28.1238 60.9999 27.0559 60.9999 25.7386C60.9999 24.4213 59.932 23.3534 58.6147 23.3534C57.2974 23.3534 56.2295 24.4213 56.2295 25.7386C56.2295 27.0559 57.2974 28.1238 58.6147 28.1238Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M49.4767 5.94483L48.5287 8.74029L50.2943 11.106L47.3426 11.0683L45.638 13.4784L44.7618 10.6596L41.943 9.78339L44.3531 8.07871L44.3153 5.1272L46.6811 6.89275L49.4767 5.94483Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M38.2601 31.3889C38.2601 31.3889 43.2097 29.0675 49.8413 31.1386"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="3.19786"
        height="2.30418"
      >
        <use xlinkHref="#image0" transform="scale(0.0499666 0.0360028)" />
      </pattern>
      <image
        id="image0"
        width="64"
        height="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACkSURBVHgB7dcxEsIwDAVR6f53Boo/FNBkPEkYrN3Xye3+xlVVz/pEu/XmEqgsr3AJVJZXuAQqyytcApXlFS6ByvIKl0BleYVLoLK8wiVQWV5BK/8oheWh+vuBVh67BMsXVB/cuPKYJVj+4B6rF29c+bFLsPziPUafvHHlxyzB8ifvbfXFN678tkuw/MX3NvrmG1d+myVY/ub7b/WPb1z5sb/CJS8ZOf4BH9R+4AAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);
