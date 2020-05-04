import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const ForumsIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Forums Icon</title>
      <g fillRule="evenodd">
        <path
          d="M8.522 5a3.043 3.043 0 1 1 0 6.087 3.043 3.043 0 0 1 0-6.087zm-.435 6.957c3.363 0 6.087 1.815 6.087 4.057v2.03H2v-2.03c0-2.242 2.724-4.057 6.087-4.057z"
          fillRule="nonzero"
        />
        <path d="M15.043 18.043v-2.029c0-1.502-.874-2.814-2.173-3.515a8.506 8.506 0 0 1 3.043-.542c3.363 0 6.087 1.815 6.087 4.057v2.03h-6.957zM16.348 5a3.043 3.043 0 1 1 0 6.087 3.043 3.043 0 0 1 0-6.087z" />
      </g>
    </svg>
  );
};

ForumsIcon.defaultProps = defaultIconProps;

export default ForumsIcon;
