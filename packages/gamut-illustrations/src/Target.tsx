import React from 'react';

import { IllustrationProps } from './types';

export const Target: React.FC<IllustrationProps> = ({
  className,
  height,
  width,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 173 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.827 29.455L47.222 6.133l40.396 23.322V76.1L47.222 99.423 6.827 76.1V29.455z"
      stroke="#10162F"
      strokeLinejoin="round"
    />
    <path
      d="M24.147 39.455l23.075-13.322 23.075 13.322V66.1L47.222 79.423 24.147 66.1V39.455z"
      stroke="#10162F"
      strokeLinejoin="round"
    />
    <path
      d="M39.469 49.178l7.198-4.156 7.198 4.156v8.311l-7.198 4.156-7.198-4.156v-8.311z"
      stroke="#10162F"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M55.872 41.649l5.008 14.519-11.71-4.096 6.702-10.423z"
      stroke="#10162F"
    />
    <path
      d="M58.91 48.799l70.542-24.258M123.612 26.298l3.187-6.532M119.324 27.725l3.187-6.531M115.036 29.153l3.188-6.532M123.722 26.434l6.54 3.188M119.434 28.218l6.541 3.188M115.146 29.645l6.541 3.189"
      stroke="#10162F"
      strokeLinecap="square"
    />
  </svg>
);
