export type BaseProps = {
  title?: string;
  /**
   * Main body text (can include markdown)
   */
  desc?: string;
  /**
   * text: button text
   *
   * href: url to navigate to when clicking the button
   */
  cta?: {
    text: string;
    href: string;
  };
  testId?: string;
};
