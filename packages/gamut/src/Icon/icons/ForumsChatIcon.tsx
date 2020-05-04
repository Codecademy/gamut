import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ForumsChatIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>ForumsChat Icon</title>
      <path
        d="M18.4 4H5.6A1.6 1.6 0 0 0 4 5.6V20l3.2-3.2h11.2a1.6 1.6 0 0 0 1.6-1.6V5.6A1.6 1.6 0 0 0 18.4 4m0 11.2H7.2l-1.6 1.6V5.6h12.8"
        fillRule="nonzero"
      />
    </svg>
  );
};

ForumsChatIcon.defaultProps = defaultIconProps;

export default ForumsChatIcon;
