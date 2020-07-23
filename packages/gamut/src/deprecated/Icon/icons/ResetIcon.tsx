import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ResetIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Reset Icon</title>
      <path d="M5.338 10.91A6.752 6.752 0 0 1 12 5.25c1.868 0 3.533.776 4.748 2.003l-3.623 3.622H21V3l-2.644 2.644A8.953 8.953 0 0 0 12 3c-4.621 0-8.488 3.426-9 7.91m15.724 2.265a6.752 6.752 0 0 1-6.648 5.575c-1.867 0-3.532-.776-4.747-2.003l3.622-3.622H3.076V21l2.644-2.644A8.953 8.953 0 0 0 12.076 21 9.002 9.002 0 0 0 21 13.177" />
    </svg>
  );
};

ResetIcon.defaultProps = defaultIconProps;

export default ResetIcon;
