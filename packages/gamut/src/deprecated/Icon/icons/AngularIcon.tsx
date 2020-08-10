import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const AngularIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>AngularJS Icon</title>
      <path d="M19.412 16.658l-7.327 4.034-7.328-4.034-1.32-11.306 8.648-3.133 8.647 3.133-1.32 11.306zM12.085 1L2.19 4.584l1.494 12.793 8.4 4.623 8.4-4.623 1.493-12.793L12.085 1z" />
      <path d="M9.906 12.096l2.33-5.61 2.328 5.61H9.906zm-3.123 4.046h1.444l1.196-2.882h5.625l1.196 2.882h1.444L12.235 4.09 6.783 16.142z" />
    </svg>
  );
};

AngularIcon.defaultProps = defaultIconProps;

export default AngularIcon;
