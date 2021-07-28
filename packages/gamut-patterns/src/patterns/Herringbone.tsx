import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { usePatternId } from '../usePatternId';
export const Herringbone = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Herringbone', titleId, ...props }, svgRef) => {
    const patternId = usePatternId('Herringbone');
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
          width={4}
          height={4}
          patternUnits="userSpaceOnUse"
        >
          <rect y={1} width={1} height={1} fill="herringbone" />
          <rect x={1} y={2} width={1} height={1} fill="herringbone" />
          <rect x={3} width={1} height={1} fill="herringbone" />
          <rect x={2} width={1} height={1} fill="herringbone" />
          <rect x={3} y={1} width={1} height={1} fill="herringbone" />
          <rect x={3} y={3} width={1} height={1} fill="herringbone" />
          <rect y={3} width={1} height={1} fill="herringbone" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
