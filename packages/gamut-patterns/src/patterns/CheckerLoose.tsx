import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { useUniqueId } from '../useUniqueId';
export const CheckerLoose = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Checker Loose', titleId, ...props }, svgRef) => {
    const patternId = useUniqueId(title);
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
          width={16}
          height={16}
          patternUnits="userSpaceOnUse"
        >
          <rect width={1} height={1} fill="currentColor" />
          <rect x={8} y={8} width={1} height={1} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
