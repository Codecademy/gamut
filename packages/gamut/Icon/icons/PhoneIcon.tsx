import React, { SVGProps } from 'react';

export default function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 22" {...props}>
      <title>Phone Icon</title>
      <path
        d="M12 18H2V4h10v14zm0-18H2C.89 0 0 .89 0 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
        fillRule="nonzero"
      />
    </svg>
  );
}
