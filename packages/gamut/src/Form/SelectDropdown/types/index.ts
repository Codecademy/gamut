/* `export type { … }`, not `export { … }`.
 *
 * Every name here is an interface or type alias. Babel transpiles file-by-file
 * and erases types, so it never notices that these re-exports have no runtime
 * value — but a bundler tracks the module graph and errors with MISSING_EXPORT.
 * This is what surfaced when the tsdown spike (GMT-1715) built this package.
 *
 * Correct regardless of bundler: this is what `isolatedModules` /
 * `verbatimModuleSyntax` would require, and neither is currently enabled.
 */
export type {
  ExtendedOption,
  IconOption,
  OptionStrict,
  SelectDropdownGroup,
  SelectDropdownOptions,
} from './options';

export type {
  BaseOnChangeProps,
  MultiSelectDropdownProps,
  SelectDropdownProps,
  SingleSelectDropdownProps,
  TypedReactSelectProps,
} from './component-props';

export type {
  CustomSelectComponentProps,
  SelectDropdownContextValueTypes,
  SizedIndicatorProps,
} from './internal';

export type { ControlState, OptionState, SelectDropdownSizes } from './styles';
