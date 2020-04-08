import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const TrophyIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Trophy Icon</title>
      <g fillRule="nonzero">
        <path d="M6.503 3.801v5.404a5.404 5.404 0 1 0 10.808 0V3.801H6.503zm6.305 12.554V19h2.894v1h-8v-1h3.304v-2.645a7.206 7.206 0 0 1-6.304-7.15V2h14.41v7.205a7.206 7.206 0 0 1-6.304 7.15zm-7.205 4.559h12v1h-12v-1z" />
        <path d="M4.702 5.603H2.9v2.702c0 1.176.752 2.177 1.8 2.548.601.237.902.288.902.153 0-1.031-.3-2.833-.901-5.403zm.9 6.304A3.603 3.603 0 0 1 2 8.305V4.702h3.603v7.205zM19.112 5.603h1.802v2.702a2.703 2.703 0 0 1-1.802 2.548c-.6.237-.9.288-.9.153 0-1.031.3-2.833.9-5.403zm-.9 6.304a3.603 3.603 0 0 0 3.602-3.602V4.702h-3.602v7.205z" />
      </g>
    </svg>
  );
};

TrophyIcon.defaultProps = defaultIconProps;

export default TrophyIcon;
