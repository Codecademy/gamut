import {
  FontFamilies,
  FontScale,
  FontWeights,
  LineHeights,
  fontFamily,
  fontScale,
  fontWeight,
  lineHeight,
} from '../variables/typography';
import { css } from '@emotion/core';

export type TypographyProps = {
  fontFamily?: FontFamilies;
  fontSize?: FontScale;
  fontWeight?: FontWeights;
  lineHeight?: LineHeights;
  letterSpacing?: string;
  textAlign?: 'left' | 'right' | 'center';
  fontStyle?: 'normal' | 'itelic' | 'oblique';
};

export const getTypography = (props: TypographyProps) => {
  const {
    fontFamily: family,
    fontSize: size,
    fontWeight: weight,
    lineHeight: height,
    letterSpacing,
    textAlign,
    fontStyle,
  } = props;

  return css`
    font-family: ${family && fontFamily[family]};
    font-size: ${size && fontScale[size]};
    font-weight: ${weight && fontWeight[weight]};
    line-height: ${height && lineHeight[height]};
    letter-spacing: ${letterSpacing};
    text-align: ${textAlign};
    font-style: ${fontStyle};
  `;
};
