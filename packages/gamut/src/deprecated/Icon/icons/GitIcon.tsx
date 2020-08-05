import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const GitIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Git Icon</title>
      <path d="M12 1L1 12l11 11 11-11L12 1zM2.697 12l6.43-6.427 1.484 1.485-.707.707 1.65 1.65v5.437l-1.65 1.65 2.264 2.263 2.263-2.263-1.65-1.65V9.429l.107-.107 2.093 2.092-.707.707 2.264 2.263 2.263-2.263-2.263-2.263-.707.707-2.093-2.093.707-.707-2.263-2.263-.732.707-1.485-1.485L12 2.697 21.303 12 12 21.303 2.697 12zm10.035 4.515l-.567.567-.566-.567.566-.566.567.566zm-.564-8.184l-.567-.566.567-.566.566.566-.566.567zm3.79 3.79l.566-.566.566.566-.566.566-.567-.566z" />
    </svg>
  );
};

GitIcon.defaultProps = defaultIconProps;

export default GitIcon;
