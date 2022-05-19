/**
 * The below types map to various Popper properties. Sadly, react-popper doesn't expose its types.
 * Having our own enums allows us to change the placement library without having to touch the callsites.
 */

/**
 * From https://popper.js.org/popper-documentation.html#Popper.placements:
 *
 * List of accepted placements to use as values of the placement option
 * Valid placements are:
 *
 * auto
 * top
 * right
 * bottom
 * left
 *
 * Each placement can have a variation from this list:
 *
 * -start
 * -end
 *
 * Variations are interpreted easily if you think of them as the left to right written languages.
 * Horizontally (top and bottom), start is left and end is right.
 * Vertically (left and right), start is top and end is bottom.
 */
export enum PopoverPosition {
  Auto = 'auto',
  AutoStart = 'auto-start',
  AutoEnd = 'auto-end',
  Top = 'top',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  Right = 'right',
  RightStart = 'right-start',
  RightEnd = 'right-end',
  Bottom = 'bottom',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
  Left = 'left',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',
}

/**
 * For the most part, popovers should just stay within the browser viewport (Viewport).
 * Sometimes, especially for popovers inside popovers, you might want them to remain within their parent.
 * For this case, use ScrollParent.
 */
export enum PopoverBoundary {
  Viewport = 'viewport',
  ScrollParent = 'scrollParent',
}

export enum PopoverType {
  Focus,
  Hover,
}
