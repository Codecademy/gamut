import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const AlertIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Alert Icon</title>
      <path d="M12.526 12.526h-1.914V6.785h1.914v5.741zm0 3.828h-1.914V14.44h1.914v1.914zM11.568 2a9.568 9.568 0 1 0 0 19.137 9.568 9.568 0 0 0 0-19.137z" />
    </svg>
  );
};

AlertIcon.defaultProps = defaultIconProps;

export default AlertIcon;
