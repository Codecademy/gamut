import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const SQLIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>SQL Icon</title>
      <path d="M15.21 3H8.776L4 4.532v5.189l4.776 1.532h6.448L20 9.721V4.532L15.21 3zM8.965 4.082h6.056l2.608.837-2.61.84H8.962l-2.61-.84 2.613-.837zm9.87 4.865l-3.816 1.224H8.962l-3.82-1.224V5.675h.014l3.62 1.166h6.448l3.625-1.163-.014 3.269z" />
      <path d="M18.835 13.912l-.01.003-3.809 1.222H8.962L5.15 13.912v-2.697L4 10.848v3.838l4.774 1.533h6.436l4.77-1.533v-3.838l-1.145.367z" />
      <path d="M18.835 18.694l-.01.002-3.809 1.222H8.962L5.15 18.694v-2.698L4 15.629v3.839L8.774 21h6.436l4.77-1.532v-3.839l-1.145.367z" />
    </svg>
  );
};

SQLIcon.defaultProps = defaultIconProps;
