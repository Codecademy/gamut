import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { usePatternId } from '../usePatternId';
export const DiagonalALoose = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Diagonal A Loose', titleId, ...props }, svgRef) => {
    const patternId = usePatternId('DiagonalALoose');
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
          <rect x={14} y={2} width={1} height={1} fill="currentColor" />
          <rect x={13} y={2} width={1} height={1} fill="currentColor" />
          <rect x={13} y={3} width={1} height={1} fill="currentColor" />
          <rect x={12} y={3} width={1} height={1} fill="currentColor" />
          <rect x={15} width={1} height={1} fill="currentColor" />
          <rect x={15} y={1} width={1} height={1} fill="currentColor" />
          <rect x={14} y={1} width={1} height={1} fill="currentColor" />
          <rect x={11} y={5} width={1} height={1} fill="currentColor" />
          <rect x={10} y={5} width={1} height={1} fill="currentColor" />
          <rect x={10} y={6} width={1} height={1} fill="currentColor" />
          <rect x={9} y={6} width={1} height={1} fill="currentColor" />
          <rect x={8} y={7} width={1} height={1} fill="currentColor" />
          <rect x={9} y={7} width={1} height={1} fill="currentColor" />
          <rect x={12} y={4} width={1} height={1} fill="currentColor" />
          <rect x={11} y={4} width={1} height={1} fill="currentColor" />
          <rect x={7} y={9} width={1} height={1} fill="currentColor" />
          <rect x={6} y={9} width={1} height={1} fill="currentColor" />
          <rect x={6} y={10} width={1} height={1} fill="currentColor" />
          <rect x={5} y={10} width={1} height={1} fill="currentColor" />
          <rect x={8} y={8} width={1} height={1} fill="currentColor" />
          <rect x={7} y={8} width={1} height={1} fill="currentColor" />
          <rect x={4} y={12} width={1} height={1} fill="currentColor" />
          <rect x={3} y={12} width={1} height={1} fill="currentColor" />
          <rect x={3} y={13} width={1} height={1} fill="currentColor" />
          <rect x={2} y={13} width={1} height={1} fill="currentColor" />
          <rect x={1} y={14} width={1} height={1} fill="currentColor" />
          <rect x={2} y={14} width={1} height={1} fill="currentColor" />
          <rect y={15} width={1} height={1} fill="currentColor" />
          <rect x={1} y={15} width={1} height={1} fill="currentColor" />
          <rect x={5} y={11} width={1} height={1} fill="currentColor" />
          <rect x={4} y={11} width={1} height={1} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
