import * as React from 'react';

import { IllustrationProps } from './types';

export const Confetti: React.FC<IllustrationProps> = ({
  'aria-hidden': ariaHidden,
  className,
  height,
  width,
}) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 80 60"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Confetti Illustration</title>
    <rect fill="white" height="60" width="80" />
    <path
      d="M51.9001 43.4534L21.9763 52.8439L10 56.6023L23.2835 14.2055"
      fill="white"
    />
    <path
      d="M51.9001 43.4534L21.9763 52.8439L10 56.6023L23.2835 14.2055"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M53.697 42.5305C56.8019 39.4256 52.687 30.2767 44.5061 22.0958C36.3253 13.915 27.1764 9.80009 24.0715 12.905C20.9666 16.0099 25.0815 25.1588 33.2623 33.3396C41.4432 41.5205 50.5921 45.6354 53.697 42.5305Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M19.88 25.0681L23.2834 14.2056"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M36.18 48.3864L21.9764 52.8438C15.2615 46.129 16.213 36.7732 16.213 36.7732L19.8803 25.0682C19.8803 25.0682 22.1487 34.3552 36.18 48.3864Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M36.2246 48.3086L22.021 52.7659C15.3061 46.0511 16.2576 36.6953 16.2576 36.6953L19.9248 24.9903C19.9248 24.9903 22.1933 34.2773 36.2246 48.3086Z"
      fill="url(#pattern0)"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M21.9341 53.0172L21.8689 52.952C18.3727 49.4559 16.9799 45.2404 16.4271 42.3193C15.8284 39.1558 16.0591 36.7819 16.0618 36.7588L16.068 36.7284L19.8984 24.5026L20.0283 25.0327C20.034 25.0558 20.6219 27.3926 22.9109 31.4084C25.024 35.1154 29.0599 41.0516 36.288 48.2795L36.4656 48.4571L36.2259 48.5324L21.9341 53.0172ZM16.3629 36.8034C16.3446 37.0076 16.1599 39.2793 16.7281 42.2726C17.2703 45.1302 18.6288 49.246 22.0192 52.6714L35.8952 48.3169C28.7464 41.1372 24.7412 35.2376 22.6363 31.5413C20.9323 28.5494 20.1639 26.4764 19.8763 25.5892L16.3629 36.8034Z"
      fill="#10162F"
    />
    <path
      d="M32.389 26.4508C32.389 26.4508 42.0196 13.9349 38.219 3"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M37.2533 27.5039C37.2533 27.5039 42.9696 18.6008 50.3582 15.1393"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M39.8839 30.8061C39.8839 30.8061 48.1706 23.4395 61.9813 25.7283"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M67.6147 30.1238C68.932 30.1238 69.9999 29.0559 69.9999 27.7386C69.9999 26.4212 68.932 25.3533 67.6147 25.3533C66.2974 25.3533 65.2295 26.4212 65.2295 27.7386C65.2295 29.0559 66.2974 30.1238 67.6147 30.1238Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M58.4767 7.94479L57.5287 10.7402L59.2943 13.106L56.3426 13.0682L54.638 15.4783L53.7618 12.6595L50.943 11.7833L53.3531 10.0787L53.3153 7.12715L55.6811 8.8927L58.4767 7.94479Z"
      fill="white"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <path
      d="M47.2601 33.3889C47.2601 33.3889 52.2097 31.0675 58.8413 33.1386"
      stroke="#10162F"
      strokeMiterlimit="10"
    />
    <defs>
      <pattern
        height="2.30418"
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="3.19786"
      >
        <use transform="scale(0.0499666 0.0360028)" xlinkHref="#image0" />
      </pattern>
      <image
        height="64"
        id="image0"
        width="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACkSURBVHgB7dcxEsIwDAVR6f53Boo/FNBkPEkYrN3Xye3+xlVVz/pEu/XmEqgsr3AJVJZXuAQqyytcApXlFS6ByvIKl0BleYVLoLK8wiVQWV5BK/8oheWh+vuBVh67BMsXVB/cuPKYJVj+4B6rF29c+bFLsPziPUafvHHlxyzB8ifvbfXFN678tkuw/MX3NvrmG1d+myVY/ub7b/WPb1z5sb/CJS8ZOf4BH9R+4AAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);
