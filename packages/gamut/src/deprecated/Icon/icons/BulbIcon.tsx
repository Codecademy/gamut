import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const BulbIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Bulb Icon</title>
      <path
        d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7zM9 21v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-17a5 5 0 0 0-2 9.58V16h4v-2.42A5 5 0 0 0 12 4z"
        fillRule="nonzero"
      />
    </svg>
  );
};

BulbIcon.defaultProps = defaultIconProps;

export default BulbIcon;
