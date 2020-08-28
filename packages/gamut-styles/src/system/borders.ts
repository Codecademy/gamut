import { css } from '@emotion/core';
import {
  BorderWidths,
  BorderRadii,
  BorderColors,
  borderColors,
  borderRadii,
  borderWidths,
} from '../variables/border';
import { pick, keys, mapKeys } from 'lodash';

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
type BorderWidthProperties = Partial<Record<AllBorderWidths, BorderWidths>>;
type ShortHands = typeof borderProps[AllBorderWidths];

export type BorderProps = BorderWidthProperties & {
  borderRadius?: BorderRadii;
  borderColor?: BorderColors;
};

export const getBorder = (props: BorderProps) => {
  const {
    base,
    x = base,
    y = base,
    l = x ?? base,
    r = x ?? base,
    t = y ?? base,
    b = y ?? base,
  } = mapKeys(
    pick(props, keys(borderProps)),
    (value, key) => borderProps[key as keyof typeof borderProps]
  ) as Record<ShortHands, BorderWidths>;

  const values = [t, r, b, l];
  const isBordered = values.some((val) => val > 0);

  if (!isBordered) return;

  const { borderRadius = 2, borderColor = 'base' } = props;

  return css`
    border-style: 'solid';
    border-width: ${values.map((size = 0) => borderWidths[size]).join(' ')};
    border-color: ${borderColors[borderColor]};
    border-radius: ${borderRadii[borderRadius]};
  `;
};
