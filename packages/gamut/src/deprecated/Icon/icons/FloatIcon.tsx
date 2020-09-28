import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const FloatIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props}>
      <title>Float Icon</title>
      <g fillRule="evenodd">
        <path d="M5.227 8.631L8.18 10.44a4.134 4.134 0 0 0 .268 3.66L5.51 15.886a7.578 7.578 0 0 1-.284-7.256zm2.886-3.12a7.575 7.575 0 0 1 7.774 0l-1.788 2.937a4.132 4.132 0 0 0-4.198 0L8.113 5.511zm7.259 13.26a7.582 7.582 0 0 1-6.741.002l1.808-2.953a4.14 4.14 0 0 0 3.133-.005l1.8 2.957zm3.119-2.886l-2.933-1.796a4.134 4.134 0 0 0 .261-3.65l2.954-1.808a7.578 7.578 0 0 1-.282 7.254z" />
        <path
          d="M12 16.125a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25zm0-.917a3.208 3.208 0 1 0 0-6.416 3.208 3.208 0 0 0 0 6.416z"
          fillRule="nonzero"
        />
        <path
          d="M12 20.25a8.25 8.25 0 1 1 0-16.5 8.25 8.25 0 0 1 0 16.5zm0-1.833a6.417 6.417 0 1 0 0-12.834 6.417 6.417 0 0 0 0 12.834z"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

FloatIcon.defaultProps = defaultIconProps;
