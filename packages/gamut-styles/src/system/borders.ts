import { css } from '@emotion/core';
import {
  BorderWidths,
  BorderRadii,
  BorderColors,
  borderColors,
  borderRadii,
} from '../variables/border';
import { directionalShorthand } from './directionalProp';
import { pick, keys, entries } from 'lodash';
import { createSystemHandler } from './responsive';
import { ResponsiveProp } from './types';

export const borderProps = {
  borderColor: 'borderColor',
  borderRadius: 'borderRadius',
  borderWidth: [
    'border',
    'borderLeft',
    'borderRight',
    'borderTop',
    'borderBottom',
    'borderX',
    'borderY',
  ],
} as const;

type AllBorderWidths = typeof borderProps['borderWidth'][number];
export type BorderWidthProperties = Partial<
  Record<AllBorderWidths, BorderWidths | ResponsiveProp<BorderWidths>>
>;

export type BorderProps = BorderWidthProperties & {
  borderRadius?: BorderRadii;
  borderColor?: BorderColors;
};

const getBorderWidth = directionalShorthand('border');

export const getBorder = createSystemHandler<BorderProps>((props) => {
  const bordered = entries(pick(props, keys(borderProps.borderWidth))).some(
    ([key, value]) => value
  );

  if (!bordered) {
    return css``;
  }
  const { borderRadius, borderColor } = props;
  return css`
    ${getBorderWidth(props)}
    border-style: solid;
    border-color: ${borderColors[borderColor!]};
    border-radius: ${borderRadii[borderRadius!]};
  `;
});
