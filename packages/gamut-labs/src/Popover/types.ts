import { PatternName } from '@codecademy/gamut';

export type SharedPopoverProps = {
  /** Popover contents */
  children: React.ReactElement<any>;

  className?: string;

  /**
   * Which vertical edge of the source component to align against.
   */
  align?: 'left' | 'right';

  /**
   * Number of pixels to offset the popover vertically from the source component.
   */
  verticalOffset?: number;

  /**
   * Number of pixels to offset the popover horizontally from the source component.
   */
  horizontalOffset?: number;

  /**
   * Whether to add outline style (i.e. used for dropdowns and coachmarks).
   */
  outline?: boolean;

  /**
   * Which horizontal edge of the source componet to align against.
   */
  position?: 'above' | 'below';

  /**
   * Which side to position the beak. If not provided, beak will not be rendered.
   */
  beak?: 'left' | 'right';

  /**
   * Whether to add a pattern background.
   */
  pattern?: PatternName;

  /**
   * What kind of user interaction triggers the popover.
   * Defaults to click.
   */
  popoverType?: 'click' | 'hover';
};
