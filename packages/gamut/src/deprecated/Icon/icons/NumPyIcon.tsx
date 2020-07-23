import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const NumPyIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>NumPy Icon</title>
      <path d="M3 17h4v4H3zM3 12h4v4H3zM3 7h4v4H3zM3 2h4v4H3zM8 7h4v4H8zM12 12h4v4h-4zM17 17h4v4h-4zM17 12h4v4h-4zM17 7h4v4h-4zM17 2h4v4h-4z" />
    </svg>
  );
};

NumPyIcon.defaultProps = defaultIconProps;

export default NumPyIcon;
