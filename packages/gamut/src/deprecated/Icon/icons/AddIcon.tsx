import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const AddIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Add Icon</title>
      <g fillRule="evenodd">
        <path d="M11 4h2v16h-2z" />
        <path d="M20 11v2H4v-2z" />
      </g>
    </svg>
  );
};

AddIcon.defaultProps = defaultIconProps;

export default AddIcon;
