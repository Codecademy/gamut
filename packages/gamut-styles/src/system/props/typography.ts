import {
  fontFamily as fonts,
  FontFamilies,
  FontWeights,
  fontWeight as weights,
  LineHeights,
  lineHeight,
  FontScale,
  fontScale,
} from '../../variables/typography';
import { HandlerProps } from '../types';
import { registerHandler, compose } from '../system';
import { identity } from 'lodash';

const fontFamilyConfig = {
  type: 'standard',
  propName: 'fontFamily',
  scale: [] as FontFamilies[],
  computeValue: (value: any) => fonts[value as FontFamilies],
} as const;

export const getFontFamily = registerHandler(fontFamilyConfig);
export type FontFamilyProps = HandlerProps<typeof getFontFamily>;

const fontWeightConfig = {
  type: 'standard',
  propName: 'fontWeight',
  scale: [] as FontWeights[],
  computeValue: (value: any) => weights[value as FontWeights],
} as const;

export const getFontWeight = registerHandler(fontWeightConfig);
export type FontWeightProps = HandlerProps<typeof getFontWeight>;

const lineHeightConfig = {
  type: 'standard',
  propName: 'lineHeight',
  scale: [] as LineHeights[],
  computeValue: (value: any) => lineHeight[value as LineHeights],
} as const;

export const getLineHeight = registerHandler(lineHeightConfig);
export type LineHeightProps = HandlerProps<typeof getLineHeight>;

const fontSizeConfig = {
  type: 'standard',
  propName: 'fontSize',
  scale: [] as FontScale[],
  computeValue: (value: any) => fontScale[value as FontScale],
} as const;

export const getFontSize = registerHandler(fontSizeConfig);
export type FontSizeProps = HandlerProps<typeof getFontSize>;

const letterSpacingConfig = {
  type: 'standard',
  propName: 'letterSpacing',
  scale: [] as string[],
  computeValue: identity,
} as const;

export const getLetterSpacing = registerHandler(letterSpacingConfig);
export type LetterSpacingProps = HandlerProps<typeof getLetterSpacing>;

const textAlignConfig = {
  type: 'standard',
  propName: 'textAlign',
  scale: [] as ('left' | 'right' | 'center')[],
  computeValue: identity,
} as const;

export const getTextAlign = registerHandler(textAlignConfig);
export type TextAlignProps = HandlerProps<typeof getTextAlign>;

const fontStyleConfig = {
  type: 'standard',
  propName: 'fontStyle',
  scale: [] as ('normal' | 'italic' | 'oblique')[],
  computeValue: identity,
} as const;

export const getFontStyle = registerHandler(fontStyleConfig);
export type FontStyleProps = HandlerProps<typeof getFontStyle>;

export type TypographyProps = FontWeightProps &
  FontFamilyProps &
  FontSizeProps &
  FontStyleProps &
  LineHeightProps &
  TextAlignProps &
  LetterSpacingProps;

export const getTypography = compose<TypographyProps>(
  getFontFamily,
  getFontWeight,
  getFontSize,
  getFontStyle,
  getLetterSpacing,
  getTextAlign,
  getLineHeight
);
