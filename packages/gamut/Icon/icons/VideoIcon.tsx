import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export default function VideoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <title>Video Icon</title>
      <path d="M18 12L6 20V4z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

VideoIcon.defaultProps = defaultIconProps;
