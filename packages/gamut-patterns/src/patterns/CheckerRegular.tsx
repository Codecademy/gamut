import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { usePatternId } from '../usePatternId';
export const CheckerRegular = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Checker Regular', titleId, ...props }, svgRef) => {
    const patternId = usePatternId('CheckerRegular');
    return (
      <Svg
        fill="currentColor"
        role="img"
        aria-hidden="true"
        ref={svgRef}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <pattern
          id={patternId}
          x={0}
          y={0}
          width={8}
          height={8}
          patternUnits="userSpaceOnUse"
        >
          <rect width={1} height={1} fill="currentColor" />
          <rect x={4} y={4} width={1} height={1} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
