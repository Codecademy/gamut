import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const HTMLIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>HTML Icon</title>
      <path d="M3 2l1.628 18 7.304 2 7.324-2 1.627-18H3zm15.211 17.148l-6.28 1.72-6.269-1.715L4.209 3.09h15.465l-1.463 16.058z" />
      <path d="M7.503 11.87h7.88l-.35 4.076-3.011.856-.173-.045-2.882-.81-.15-1.732h-1.11l.223 2.61L11.996 18l4.071-1.175.526-6.105H8.517L8.21 7.15h8.688L17 6H7z" />
    </svg>
  );
};

HTMLIcon.defaultProps = defaultIconProps;

export default HTMLIcon;
