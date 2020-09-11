import {
  BorderWidths,
  borderWidths,
  BorderRadii,
  borderRadii,
  BorderColors,
  borderColors,
} from '../../variables/border';

export const border = {
  borderWidth: {
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
  },
  borderRadius: {
    propName: 'borderRadius',
    scale: [] as BorderRadii[],
    computeValue: (value: any) => borderRadii[value as BorderRadii],
  },
  borderColor: {
    propName: 'borderColor',
    scale: [] as BorderColors[],
    computeValue: (value: any) => borderColors[value as BorderColors],
  },
  borderStyle: {
    propName: 'borderStyle',
    scale: [] as ('none' | 'solid')[],
  },
} as const;
