import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const NewPageIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>NewPageIcon</title>
      <path
        d="M13.778 4v1.778h3.19l-8.737 8.738 1.253 1.253 8.738-8.738v3.191H20V4h-6.222zm4.444 14.222H5.778V5.778H12V4H5.778C4.79 4 4 4.8 4 5.778v12.444C4 19.204 4.796 20 5.778 20h12.444c.982 0 1.778-.796 1.778-1.778V12h-1.778v6.222z"
        fillRule="nonzero"
      />
    </svg>
  );
};

NewPageIcon.defaultProps = defaultIconProps;

export default NewPageIcon;
