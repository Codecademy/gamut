import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { useUniqueId } from '../useUniqueId';
export const DotRegular = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Dot Regular', titleId, ...props }, svgRef) => {
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
          width={8}
          height={8}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={0.5} cy={0.5} r={0.5} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
