import { SystemProps } from '../types';
import {
  BorderWidths,
  borderWidths,
  BorderRadii,
  borderRadii,
  BorderColors,
  borderColors,
} from '../../variables/border';
import { system } from '../system';
import { identity } from 'lodash';
import { composeSystem } from '../templating/responsiveProp';

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

export type BorderWidthProps = SystemProps<typeof borderWidthConfig>;

export const getborderWidth = system<BorderRadiusProps>(borderWidthConfig);

const borderRadiusConfig = {
  type: 'standard',
  propName: 'borderRadius',
  scale: [] as BorderRadii[],
  computeValue: (value: any) => borderRadii[value as BorderRadii],
} as const;

export type BorderRadiusProps = SystemProps<typeof borderRadiusConfig>;

export const getBorderRadius = system<BorderRadiusProps>(borderRadiusConfig);

const borderColorConfig = {
  type: 'standard',
  propName: 'borderColor',
  scale: [] as BorderColors[],
  computeValue: (value: any) => borderColors[value as BorderColors],
} as const;

export type BorderColorProps = SystemProps<typeof borderColorConfig>;

export const getBorderColor = system<BorderColorProps>(borderColorConfig);

const borderStyleConfig = {
  type: 'standard',
  propName: 'borderStyle',
  scale: [] as ('none' | 'solid')[],
  computeValue: identity,
} as const;

export type BorderStyleProps = SystemProps<typeof borderStyleConfig>;

export const getBorderStyle = system<BorderStyleProps>(borderStyleConfig);

export type BorderProps = BorderStyleProps &
  BorderWidthProps &
  BorderRadiusProps &
  BorderColorProps;

export const getBorder = composeSystem<BorderProps>(
  getborderWidth,
  getBorderColor,
  getBorderRadius,
  getBorderStyle
);
