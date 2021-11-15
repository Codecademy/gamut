export type IllustrationProps = {
  'aria-hidden'?: boolean;

  className?: string;

  /**
   * How high the root SVG should be, if not calculated by width or CSS.
   */
  height?: number | string;

  /**
   * How wide the root SVG should be, if not calculated by height or CSS.
   */
  width?: number | string;
};
