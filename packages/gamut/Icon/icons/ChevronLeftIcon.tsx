import React, { SVGProps } from 'react';

import { wrapIcon } from '../wrapIcon';

export default wrapIcon(function ChevronLeftIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <title>Chevron Left Icon</title>
      <path d="M9.475 12.06l7.293 7.294-1.414 1.414-8.708-8.707 8.708-8.707 1.414 1.414z" />
    </svg>
  );
});
