import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const RubyIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Ruby Icon</title>
      <path d="M1.5 9.5v-1h21v1z" />
      <path d="M12 19.52l9.733-10.618L18.465 4H5.535L2.267 8.902 12 19.52zM5 3h14l4 6-11 12L1 9l4-6z" />
      <path d="M12 18.753L18.542 3.8a.5.5 0 0 1 .916.4l-7 16a.5.5 0 0 1-.916 0l-7-16a.5.5 0 0 1 .916-.4L12 18.753z" />
      <path d="M7.354 9.354l-.708-.708L12 3.293l5.354 5.353-.708.708L12 4.707z" />
    </svg>
  );
};

RubyIcon.defaultProps = defaultIconProps;

export default RubyIcon;
