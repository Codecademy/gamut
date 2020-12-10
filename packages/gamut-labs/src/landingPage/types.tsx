export type BaseProps = {
  title?: string;
  /**
   * Main body text (can include markdown)
   */
  desc?: string;
  /**
   * Callback when a markdown anchor tag is clicked
   */
  onMarkdownLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
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
    onClick?: () => void;
  };
  testId?: string;
};
