import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { usePatternId } from '../usePatternId';
export const DiagonalARegular = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Diagonal A Regular', titleId, ...props }, svgRef) => {
    const patternId = usePatternId('DiagonalARegular');
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
          <rect x={6} y={2} width={1} height={1} fill="currentColor" />
          <rect x={5} y={2} width={1} height={1} fill="currentColor" />
          <rect x={5} y={3} width={1} height={1} fill="currentColor" />
          <rect x={4} y={3} width={1} height={1} fill="currentColor" />
          <rect x={7} width={1} height={1} fill="currentColor" />
          <rect x={7} y={1} width={1} height={1} fill="currentColor" />
          <rect x={6} y={1} width={1} height={1} fill="currentColor" />
          <rect x={3} y={5} width={1} height={1} fill="currentColor" />
          <rect x={2} y={5} width={1} height={1} fill="currentColor" />
          <rect x={2} y={6} width={1} height={1} fill="currentColor" />
          <rect x={1} y={6} width={1} height={1} fill="currentColor" />
          <rect y={7} width={1} height={1} fill="currentColor" />
          <rect x={1} y={7} width={1} height={1} fill="currentColor" />
          <rect x={4} y={4} width={1} height={1} fill="currentColor" />
          <rect x={3} y={4} width={1} height={1} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
