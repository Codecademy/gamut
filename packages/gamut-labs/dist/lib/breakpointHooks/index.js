function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { breakpoints as originalBreakpoints } from '@codecademy/gamut-styles';
import { mapValues } from 'lodash';
import { createBreakpoint } from 'react-use';
export var breakpoints = mapValues(_objectSpread({
  xxs: 0
}, originalBreakpoints), function (value) {
  return parseInt(value, 10);
});
/**
 * useBreakpoint will provide the current breakpoint to a React component.
 *
 * If you think you need this, make sure to think twice.  It is really nice
 * to allow your styles layer to concern itself about the appearance of a
 * component at different screen sizes, and not have to maintain two different
 * components that could drift from eachother.  That being said, sometimes
 * The content, layout, and/or functionality of a mobile page/component can
 * be so different that it is non-performant or difficult to maintain the
 * changes in only styles.  For those cases where it is actually easier to maintain
 * two components or a programatic distinction of the breakpoint, this helper
 * exists.
 *
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */

export var useBreakpoint = createBreakpoint(breakpoints);
/**
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */

export function useBreakpointAtOrAbove(breakpoint) {
  var currentBreakpoint = useBreakpoint();
  return breakpoints[currentBreakpoint] >= breakpoints[breakpoint];
}
/**
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */

export function useBreakpointAt(breakpoint) {
  var currentBreakpoint = useBreakpoint();
  return breakpoints[currentBreakpoint] === breakpoints[breakpoint];
}
/**
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */

export function useBreakpointAtOrBelow(breakpoint) {
  var currentBreakpoint = useBreakpoint();
  return breakpoints[currentBreakpoint] <= breakpoints[breakpoint];
}