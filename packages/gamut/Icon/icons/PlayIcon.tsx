import React, { SVGProps } from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Play Icon</title>
      <g fill="none" fillRule="evenodd">
        <path
          d="m15 10-8 5v-10z"
          fill="currentColor"
          transform="translate(2 2)"
        />
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" />
      </g>
    </svg>
  );
});
