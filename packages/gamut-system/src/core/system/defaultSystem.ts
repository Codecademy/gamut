import { SystemTheme } from '../../types/theme';

export const defaultBreakpoints = {
  base: 0,
} as const;

export type DefaultBreakpoints = typeof defaultBreakpoints;

export const defaultTheme: SystemTheme<DefaultBreakpoints> = {
  breakpoints: defaultBreakpoints,
  breakpointsOrder: ['base'],
  groups: {},
};

export type DefaultTheme = typeof defaultTheme;
