import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const CSSIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>CSS Icon</title>
      <path d="M3 2l1.635 18 7.356 2 7.374-2L21 2H3zm15.344 17.145l-6.335 1.728-6.316-1.71L4.226 3.092h15.585l-1.467 16.054z" />
      <path d="M7.02 7.239h8.768l-.317 3.653h-5.58l.105 1.095h5.387l-.37 4.147-2.887.822-.158.054-.194-.054-2.922-.822-.159-1.736H7.637l.229 2.576 4.067 1.169L16 16.973l.933-10.83h-10z" />
    </svg>
  );
};

CSSIcon.defaultProps = defaultIconProps;
