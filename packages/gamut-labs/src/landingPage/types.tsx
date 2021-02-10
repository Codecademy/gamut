import { HandlerProps } from '@codecademy/gamut-system';

import { darkModeVariants } from './variants';

export type BaseProps = {
  title?: string;
  /**
   * Body text as markdown
   */
  desc?: string;
  /**
   * Callback when a markdown anchor tag is clicked
   */
  onAnchorClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * text: button text
   *
   * href: url to navigate to when clicking the button
   *
   * onClick: callback when the button is clicked
   */
  cta?: {
    text: string;
    href: string;
    onClick?: React.MouseEventHandler;
  };
  testId?: string;
};

export type DarkModeProps = HandlerProps<typeof darkModeVariants>;
