import { colors } from './variables';
import emotionStyled, { CreateStyled } from '@emotion/styled';

export const theme = {
  colors: colors,
};

export type GamutTheme = typeof theme;

export const styled = emotionStyled as CreateStyled<GamutTheme>;
