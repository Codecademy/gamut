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
  border: 'base',
  borderLeft: 'l',
  borderRight: 'r',
  borderTop: 't',
  borderBottom: 'b',
  borderX: 'x',
  borderY: 'y',
} as const;

type AllBorderWidths = keyof typeof borderProps;
type BorderWidthProperties = Partial<
  Record<AllBorderWidths, BorderWidths | ResponsiveProp<BorderWidths>>
>;

export type BorderProps = BorderWidthProperties & {
  borderRadius?: BorderRadii;
  borderColor?: BorderColors;
};

const getBorderWidth = directionalShorthand('border');

export const getBorder = createSystemHandler<BorderProps>((props) => {
  const bordered = entries(pick(props, keys(borderProps))).some(
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
