import * as React from 'react';

export type GamutIconProps = {
  titleId?: string;
  size?: number | string;
  title?: string;
  color?: string;
  ref?: React.Ref<SVGSVGElement>;
} & React.SVGProps<SVGSVGElement>;
