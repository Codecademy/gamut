import React, { SVGProps } from 'react';

export default function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g fill-rule="nonzero">
        <path d="M19.778 18.364l-1.414 1.414L4.222 5.636l1.414-1.414z" />
        <path d="M5.636 19.778l-1.414-1.414L18.364 4.222l1.414 1.414z" />
      </g>
    </svg>
  );
}
