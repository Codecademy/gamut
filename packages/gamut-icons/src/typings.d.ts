import * as React from 'react';

export * from './icons';

export type GamutIconProps = React.SVGProps<SVGSVGElement> & {
  titleId?: string;
  size?: number | string;
  title?: string;
  color?: string;
  svgRef?: React.Ref<any>
};
