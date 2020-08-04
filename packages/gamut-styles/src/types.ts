import * as theme from './variables';

export type Theme = typeof theme;

// Spacing
export type SpacingSize = keyof Theme['spacing'];

// Typography
export type TextType = keyof Theme['fontSize'];
export type HeadingSize = keyof Theme['fontSize']['heading'];
export type TextSize = keyof Theme['fontSize']['text'];
export type FontColor = keyof Theme['fontColor'];
export type FontStack = keyof Theme['fontStack'];
export type FontDecoration = keyof Theme['fontDecoration'];
export type LineHeight = keyof Theme['lineHeight'];
export type FontWeight = keyof Theme['fontWeight'];

// Media Queries
export type MediaSizes = keyof Theme['breakpoints'];

// Effects
export type EffectColor = keyof Theme['effectColors'];
