import React from 'react';

import { IllustrationProps } from './types';

export const EmailAt: React.FC<IllustrationProps> = ({
  ariaHidden,
  className,
  height,
  width,
}) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Email At Icon</title>
    <circle cx="24" cy="24" r="23.5" fill="white" stroke="#10162F" />
    <path
      d="M28.375 24C28.375 24.8653 28.1184 25.7112 27.6377 26.4306C27.157 27.1501 26.4737 27.7108 25.6742 28.042C24.8748 28.3731 23.9951 28.4597 23.1465 28.2909C22.2978 28.1221 21.5183 27.7054 20.9064 27.0936C20.2946 26.4817 19.8779 25.7022 19.7091 24.8535C19.5403 24.0049 19.6269 23.1252 19.958 22.3258C20.2892 21.5263 20.8499 20.8431 21.5694 20.3623C22.2888 19.8816 23.1347 19.625 24 19.625C25.1603 19.625 26.2731 20.0859 27.0936 20.9064C27.9141 21.7269 28.375 22.8397 28.375 24Z"
      stroke="#10162F"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.3751 24V25.875C28.3751 26.538 28.6384 27.1739 29.1073 27.6427C29.5761 28.1116 30.212 28.375 30.8751 28.375C31.5381 28.375 32.174 28.1116 32.6428 27.6427C33.1117 27.1739 33.3751 26.538 33.3751 25.875V24C33.375 21.8883 32.6619 19.8385 31.3514 18.1827C30.0408 16.5269 28.2096 15.3621 26.1544 14.8769C24.0992 14.3918 21.9404 14.6148 20.0278 15.5098C18.1152 16.4048 16.5607 17.9194 15.6164 19.8081C14.672 21.6969 14.393 23.8492 14.8246 25.9163C15.2562 27.9834 16.373 29.8442 17.9943 31.1973C19.6155 32.5504 21.646 33.3165 23.757 33.3714C25.868 33.4263 27.9357 32.7669 29.6251 31.5"
      stroke="#10162F"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
