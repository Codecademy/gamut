import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const TerminalIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Terminal Icon</title>
      <path d="M2 4v16h20V4H2zm19 15H3V7h18v12zM3 6V5h18v.998L3 6z" />
      <path d="M4 8h1v2H4z" />
    </svg>
  );
};

TerminalIcon.defaultProps = defaultIconProps;

export default TerminalIcon;
