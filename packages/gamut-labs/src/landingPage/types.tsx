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
    onClick?: CTAOnClickCallback;
  };
  testId?: string;
};

export type CTAOnClickCallback = (
  event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLLinkElement>
) => void;
