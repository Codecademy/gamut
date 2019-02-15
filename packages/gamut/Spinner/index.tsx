import React, { SVGProps } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.string,
};

const defaultProps = {
  size: '24',
};

export type SpinnerProps = SVGProps<SVGSVGElement> & {
  size?: string;
}

function Spinner({ size, ...props }: SpinnerProps) {
  return (
    <svg viewBox="0 0 100 100" height={size} width={size} {...props}>
      <defs>
        <linearGradient id="spinner-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <path
        d="M50 10 a 40 40 0 0 1 40 40"
        stroke="url(#spinner-stroke)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
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
}

Spinner.defaultProps = defaultProps;
Spinner.propTypes = propTypes;
export default Spinner;
