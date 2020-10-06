import { SystemBreakpoints } from './breakpoints';
import { PropertyConfig } from './props';

export type SystemGroups<Breakpoints extends SystemBreakpoints> = Record<
  string,
  GroupConfig<Breakpoints>
>;

/** A Group of Property Configurations EG: typography | spacing */
export type GroupConfig<Breakpoints extends SystemBreakpoints> = Record<
  string,
  PropertyConfig<Breakpoints>
>;
