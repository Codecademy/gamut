import {
  fontFamily as fonts,
  FontFamilies,
  FontWeights,
  fontWeight as weights,
  LineHeights,
  lineHeight as heights,
  FontScale,
  fontScale,
} from '../../variables/typography';

export const typography = {
  fontFamily: {
    propName: 'fontFamily',
    scale: [] as FontFamilies[],
    computeValue: (value: any) => fonts[value as FontFamilies],
  },
  fontWeight: {
    propName: 'fontWeight',
    scale: [] as FontWeights[],
    computeValue: (value: any) => weights[value as FontWeights],
  },
  lineHeight: {
    propName: 'lineHeight',
    scale: [] as LineHeights[],
    computeValue: (value: any) => heights[value as LineHeights],
  },
  fontSize: {
    propName: 'fontSize',
    scale: 'fontSize',
    computeValue: (value: any) => fontScale[value as FontScale],
  },
  letterSpacing: {
    propName: 'letterSpacing',
    scale: [] as string[],
  },
  textAlign: {
    propName: 'textAlign',
    scale: [] as ('left' | 'right' | 'center')[],
  },
  fontStyle: {
    propName: 'fontStyle',
    scale: [] as ('normal' | 'italic' | 'oblique')[],
  },
} as const;
