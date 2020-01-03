import * as React from 'react';

export interface GamutIconProps extends React.SVGProps<SVGSVGElement> {
  titleId?: string;
  size?: number | string;
  title?: string;
  color?: string;
  svgRef?: React.Ref<SVGSVGElement>;
}
