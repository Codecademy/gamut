import { SystemBreakpoints } from './breakpoints';
import { SystemGroups } from './groups';
import { SystemScales } from './scales';

export type SystemTheme<Breakpoints extends SystemBreakpoints> = {
  breakpoints: Breakpoints;
  breakpointsOrder: (keyof Breakpoints)[];
  groups: SystemGroups<Breakpoints>;
  scales: SystemScales;
};
