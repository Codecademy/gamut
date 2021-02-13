import React, { FunctionComponent, SVGProps } from 'react';

export type SpinnerProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

const defaultProps: SpinnerProps = {
  size: 24,
};

export const Spinner: FunctionComponent<SpinnerProps> = ({
  size,
  ...props
}) => {
  return (
    <svg viewBox="0 0 1000 1000" height={size} width={size} {...props}>
      <circle fill="currentColor" cx="937.5" cy="500" r="62.5" />
      <path
        fill="currentColor"
        d="M1000 500H875c0-22.2-1.9-44-5.6-65.1l123.1-21.7h.1c4.8 28.2 7.4 57.2 7.4 86.8z"
      />
      <path
        opacity=".96"
        fill="currentColor"
        d="M992.5 413.2l-123.1 21.7c-3.8-21.8-9.5-42.9-16.9-63.2L969.9 329l.1-.1c9.8 27.1 17.4 55.2 22.5 84.3z"
      />
      <path
        opacity=".92"
        fill="currentColor"
        d="M969.9 328.9l-.1.1-117.3 42.7c-7.5-20.6-16.8-40.4-27.7-59.2L933 249.9l.1-.1a503.3 503.3 0 0 1 36.8 79.1z"
      />
      <path
        opacity=".88"
        fill="currentColor"
        d="M933.1 249.9l-108.2 62.6c-10.9-18.9-23.6-36.9-37.6-53.5l95.7-80.4c18.7 22.2 35.4 46.1 50.1 71.3z"
      />
      <path
        opacity=".84"
        fill="currentColor"
        d="M883 178.6L787.3 259c-14.1-16.7-29.5-32.2-46.2-46.2l80.3-95.8c22.3 18.7 42.9 39.3 61.6 61.6z"
      />
      <path
        opacity=".8"
        fill="currentColor"
        d="M821.4 116.9L741 212.7c-16.7-14-34.6-26.6-53.5-37.6l62.4-108.2.1-.1c25.3 14.8 49.2 31.5 71.4 50.1z"
      />
      <path
        opacity=".76"
        fill="currentColor"
        d="M750.1 66.9l-62.5 108.2c-18.8-10.9-38.6-20.1-59.2-27.7L671 30.1l.1-.1c27.5 10.1 53.9 22.4 79 36.9z"
      />
      <path
        opacity=".72"
        fill="currentColor"
        d="M671.1 30l-.1.1-42.7 117.4c-20.3-7.4-41.4-13.1-63.2-16.9l21.7-123v-.1c29.1 5.1 57.2 12.7 84.3 22.5z"
      />
      <path
        opacity=".68"
        fill="currentColor"
        d="M586.8 7.5l-21.7 123.1c-21.1-3.7-42.9-5.6-65.1-5.6V0c29.6 0 58.6 2.6 86.8 7.5z"
      />
      <path
        opacity=".64"
        fill="currentColor"
        d="M500 0v125c-22.2 0-44 1.9-65.1 5.6l-21.7-123v-.1C441.4 2.6 470.4 0 500 0z"
      />
      <path
        opacity=".6"
        fill="currentColor"
        d="M413.2 7.6l21.7 123.1c-21.8 3.8-42.9 9.5-63.2 16.9L329 30.1l-.1-.1c27.1-9.9 55.2-17.4 84.3-22.4z"
      />
      <path
        opacity=".56"
        fill="currentColor"
        d="M329 30.1l42.7 117.4c-20.6 7.5-40.4 16.8-59.2 27.7L250 67l-.1-.1C275 52.4 301.4 40.1 329 30.1z"
      />
      <path
        opacity=".04"
        fill="currentColor"
        d="M371.7 852.5L329 969.9l-.1.1c-27.6-10-53.9-22.4-79-36.9l.1-.1 62.5-108.2c18.7 10.9 38.6 20.1 59.2 27.7z"
      />
      <path
        opacity=".52"
        fill="currentColor"
        d="M250 67l62.5 108.2c-18.9 11-36.9 23.6-53.5 37.6L178.6 117c22.2-18.7 46.1-35.4 71.4-50z"
      />
      <path
        opacity=".08"
        fill="currentColor"
        d="M312.5 824.8L250 933l-.1.1c-25.2-14.6-49.1-31.4-71.4-50.1l80.4-95.7c16.7 13.9 34.6 26.6 53.6 37.5z"
      />
      <path
        opacity=".48"
        fill="currentColor"
        d="M178.6 117l80.4 95.8c-16.7 14.1-32.2 29.5-46.2 46.2L117 178.6c18.7-22.3 39.3-42.9 61.6-61.6z"
      />
      <path
        opacity=".12"
        fill="currentColor"
        d="M258.9 787.2L178.6 883c-22.3-18.7-42.9-39.3-61.6-61.6l95.8-80.3c14 16.7 29.4 32.1 46.1 46.1z"
      />
      <path
        opacity=".44"
        fill="currentColor"
        d="M117 178.6l95.8 80.4c-14 16.6-26.6 34.5-37.6 53.5L67 250l-.1-.1c14.7-25.2 31.4-49.1 50.1-71.3z"
      />
      <path
        opacity=".16"
        fill="currentColor"
        d="M212.8 741.1L117 821.4c-18.7-22.2-35.4-46.1-50.1-71.4l.1-.1 108.2-62.4c11 19 23.6 36.9 37.6 53.6z"
      />
      <path
        opacity=".4"
        fill="currentColor"
        d="M67 250l108.2 62.5c-10.9 18.8-20.1 38.6-27.7 59.2L30.1 329l-.1-.1c10-27.6 22.4-53.9 36.9-79l.1.1z"
      />
      <path
        opacity=".2"
        fill="currentColor"
        d="M175.2 687.6L67 750l-.1.1C52.4 725 40 698.7 30 671.1l.1-.1 117.4-42.7c7.6 20.6 16.8 40.5 27.7 59.3z"
      />
      <path
        opacity=".36"
        fill="currentColor"
        d="M30.1 329l117.4 42.7c-7.4 20.3-13.1 41.4-16.9 63.2l-123-21.7h-.1c5.1-29 12.6-57.2 22.5-84.2h.1z"
      />
      <path
        opacity=".24"
        fill="currentColor"
        d="M147.5 628.3L30.1 671l-.1.1c-9.9-27.1-17.4-55.2-22.5-84.2h.1l123.1-21.7c3.7 21.7 9.4 42.8 16.8 63.1z"
      />
      <path
        opacity=".32"
        fill="currentColor"
        d="M7.6 413.2l123.1 21.7c-3.7 21.1-5.6 42.9-5.6 65.1H0c0-29.6 2.6-58.6 7.6-86.8z"
      />
      <path
        opacity=".28"
        fill="currentColor"
        d="M130.6 565.1l-123 21.7h-.1A506.7 506.7 0 0 1 0 500h125c0 22.2 1.9 44 5.6 65.1z"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0"
        to="360"
        dur="1s"
        begin="0"
        repeatCount="indefinite"
      />
    </svg>
  );
};

Spinner.defaultProps = defaultProps;
