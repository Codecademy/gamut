import * as React from 'react';

import { PatternProps, Svg } from '../props';
import { usePatternId } from '../usePatternId';
export const CheckerDense = React.forwardRef<SVGSVGElement, PatternProps>(
  ({ title = 'Checker Dense', titleId, ...props }, svgRef) => {
    const patternId = usePatternId('CheckerDense');
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
          <rect width={1} height={1} fill="currentColor" />
          <rect x={2} y={2} width={1} height={1} fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    );
  }
);
