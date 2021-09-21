import { ColorModes } from '@codecademy/gamut-styles';

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
   *
   * buttonType: whether to show a CTA button or a regular fill button
   */
  cta?: {
    text: string;
    href: string;
    onClick?: React.MouseEventHandler;
    buttonType?: 'cta' | 'regular';
  };

  testId?: string;
};

export type DarkModeProps = { mode?: ColorModes };
