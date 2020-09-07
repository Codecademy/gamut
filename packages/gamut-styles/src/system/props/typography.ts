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
import { SystemProps } from '../types';
import { system } from '../system';
import { composeSystem } from '../templating/responsiveProp';
import { identity } from 'lodash';

const fontFamilyConfig = {
  type: 'default',
  propName: 'fontFamily',
  scale: [] as FontFamilies[],
  computeValue: (value: any) => fonts[value as FontFamilies],
} as const;

export type FontFamilyProps = SystemProps<typeof fontFamilyConfig>;

export const getFontFamily = system<FontFamilyProps>(fontFamilyConfig);

const fontWeightConfig = {
  type: 'default',
  propName: 'fontWeight',
  scale: [] as FontWeights[],
  computeValue: (value: any) => weights[value as FontWeights],
} as const;

export type FontWeightProps = SystemProps<typeof fontWeightConfig>;

export const getFontWeight = system<FontWeightProps>(fontWeightConfig);

const lineHeightConfig = {
  type: 'default',
  propName: 'lineHeight',
  scale: [] as LineHeights[],
  computeValue: (value: any) => lineHeight[value as LineHeights],
} as const;

export type LineHeightProps = SystemProps<typeof lineHeightConfig>;

export const getLineHeight = system<LineHeightProps>(lineHeightConfig);

const fontSizeConfig = {
  type: 'default',
  propName: 'fontSize',
  scale: [] as FontScale[],
  computeValue: (value: any) => fontScale[value as FontScale],
} as const;

export type FontSizeProps = SystemProps<typeof fontSizeConfig>;

export const getFontSize = system<FontSizeProps>(fontSizeConfig);

const letterSpacingConfig = {
  type: 'default',
  propName: 'letterSpacing',
  scale: [] as string[],
  computeValue: identity,
} as const;

export type LetterSpacingProps = SystemProps<typeof letterSpacingConfig>;

export const getLetterSpacing = system<LetterSpacingProps>(letterSpacingConfig);

const textAlignConfig = {
  type: 'default',
  propName: 'textAlign',
  scale: [] as ('left' | 'right' | 'center')[],
  computeValue: identity,
} as const;

export type TextAlignProps = SystemProps<typeof textAlignConfig>;

export const getTextAlign = system<TextAlignProps>(textAlignConfig);

const fontStyleConfig = {
  type: 'default',
  propName: 'fontStyle',
  scale: [] as ('normal' | 'italic' | 'oblique')[],
  computeValue: identity,
} as const;

export type FontStyleProps = SystemProps<typeof fontStyleConfig>;

export const getFontStyle = system<FontStyleProps>(fontStyleConfig);

export type TypographyProps = FontWeightProps &
  FontFamilyProps &
  FontSizeProps &
  FontStyleProps &
  LineHeightProps &
  TextAlignProps &
  LetterSpacingProps;

export const getTypography = composeSystem<TypographyProps>(
  getFontFamily,
  getFontWeight,
  getFontSize,
  getFontStyle,
  getLetterSpacing,
  getTextAlign,
  getLineHeight
);
