import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const CommunityIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Community Icon</title>
      <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.89.31 1.87.5 2.91.5A5.22 5.22 0 0 1 9 14c0-3.31 3.13-6 7-6 .19 0 .38 0 .56.03C15.54 5.69 12.78 4 9.5 4zM16 9c-3.31 0-6 2.24-6 5s2.69 5 6 5c.67 0 1.31-.08 1.91-.25L20 20l-.62-1.87C20.95 17.22 22 15.71 22 14c0-2.76-2.69-5-6-5z" />
    </svg>
  );
};

CommunityIcon.defaultProps = defaultIconProps;

export default CommunityIcon;
