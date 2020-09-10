import { HandlerProps } from '../types';
import {
  BorderWidths,
  borderWidths,
  BorderRadii,
  borderRadii,
  BorderColors,
  borderColors,
} from '../../variables/border';
import { registerHandler, compose } from '../system';
import { identity } from 'lodash';

const borderWidthConfig = {
  scale: [] as BorderWidths[],
  type: 'directional',
  propName: 'borderWidth',
  computeValue: (value: any) => borderWidths[value as BorderWidths],
  altProps: [
    'borderWidthLeft',
    'borderWidthRight',
    'borderWidthTop',
    'borderWidthBottom',
    'borderWidthX',
    'borderWidthY',
  ],
} as const;

export const getBorderWidth = registerHandler(borderWidthConfig);
export type BorderWidthProps = HandlerProps<typeof getBorderWidth>;

const borderRadiusConfig = {
  type: 'standard',
  propName: 'borderRadius',
  scale: [] as BorderRadii[],
  computeValue: (value: any) => borderRadii[value as BorderRadii],
} as const;

export const getBorderRadius = registerHandler(borderRadiusConfig);
export type BorderRadiusProps = HandlerProps<typeof getBorderRadius>;

const borderColorConfig = {
  type: 'standard',
  propName: 'borderColor',
  scale: [] as BorderColors[],
  computeValue: (value: any) => borderColors[value as BorderColors],
} as const;

export const getBorderColor = registerHandler(borderColorConfig);
export type BorderColorProps = HandlerProps<typeof getBorderColor>;

const borderStyleConfig = {
  type: 'standard',
  propName: 'borderStyle',
  scale: [] as ('none' | 'solid')[],
  computeValue: identity,
} as const;

export const getBorderStyle = registerHandler(borderStyleConfig);
export type BorderStyleProps = HandlerProps<typeof getBorderStyle>;

export type BorderProps = HandlerProps<typeof getBorder>;

export const getBorder = compose(
  getBorderWidth,
  getBorderColor,
  getBorderRadius,
  getBorderStyle
);
