import React, { SVGProps } from 'react';

export default function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Close Icon</title>
      <path
        d="M21 4.813L19.187 3 12 10.187 4.813 3 3 4.813 10.187 12 3 19.187 4.813 21 12 13.813 19.187 21 21 19.187 13.813 12z"
        fillRule="nonzero"
      />
    </svg>
  );
}
