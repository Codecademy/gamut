// import { SystemThemeSettings } from '../core/system';
import { SystemBreakpoints } from './breakpoints';

export type System<
  // todo: use just ThemeSettings, and look up things within?
  Breakpoints extends SystemBreakpoints,
  // ThemeSettings extends SystemThemeSettings<Breakpoints>
  ThemeSettings
> = {
  properties: unknown;
  propertyGroups: unknown;
  variant: unknown;
};
