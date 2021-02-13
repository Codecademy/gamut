import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ProjectIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Project Icon</title>
      <path d="M18.857 11.571h-1.286V8.143c0-.952-.771-1.714-1.714-1.714H12.43V5.143a2.143 2.143 0 1 0-4.286 0v1.286H4.714C3.768 6.429 3 7.196 3 8.143V11.4h1.286A2.305 2.305 0 0 1 6.6 13.714a2.305 2.305 0 0 1-2.314 2.315H3v3.257C3 20.232 3.768 21 4.714 21h3.257v-1.286a2.305 2.305 0 0 1 2.315-2.314 2.305 2.305 0 0 1 2.314 2.314V21h3.257c.947 0 1.714-.768 1.714-1.714v-3.429h1.286a2.143 2.143 0 0 0 0-4.286z" />
    </svg>
  );
};

ProjectIcon.defaultProps = defaultIconProps;
