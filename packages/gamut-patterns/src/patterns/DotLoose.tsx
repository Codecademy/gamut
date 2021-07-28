import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { usePatternId } from '../usePatternId';
export const DotLoose = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Dot Loose', titleId, ...props }, svgRef) => {
    const patternId = usePatternId('DotLoose');
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
          <rect width={0.5} height={0.5} fill="currentColor" />
          <rect y={1} width={0.5} height={0.5} fill="currentColor" />
          <rect y={0.5} width={0.5} height={0.5} fill="currentColor" />
          <rect x={1} width={0.5} height={0.5} fill="currentColor" />
          <rect x={1} y={1} width={0.5} height={0.5} fill="currentColor" />
          <rect x={1} y={0.5} width={0.5} height={0.5} fill="currentColor" />
          <rect x={0.5} width={0.5} height={0.5} fill="currentColor" />
          <rect x={0.5} y={1} width={0.5} height={0.5} fill="currentColor" />
          <rect x={0.5} y={0.5} width={0.5} height={0.5} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
