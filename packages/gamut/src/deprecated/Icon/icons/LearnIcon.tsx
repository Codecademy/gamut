import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const LearnIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Learn Icon</title>
      <path d="M15 16.6l4.351-4.6L15 7.4 16.324 6 22 12l-5.676 6L15 16.6zm-6 0L4.649 12 9 7.4 7.676 6 2 12l5.676 6L9 16.6z" />
    </svg>
  );
};

LearnIcon.defaultProps = defaultIconProps;

export default LearnIcon;
