export interface DisclosureButtonProps {
  /**
   * Renders the Disclosure unclickable.
   */
  disabled?: boolean;
  heading: string;
  /**
   * Set the heading to the proper semantic heading level (h2, h3, etc...)
   * Default value is 'h3'.
   */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5';
  isExpanded?: boolean;
  /**
   * Provide a string value to render overline text appear above the heading.
   */
  overline?: string;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  spacing?: 'normal' | 'condensed' | 'compact';
  /**
   * Provide a string value to appear below the heading.
   */
  subheading?: string;
}

export interface DisclosureBodyProps {
  /**
   * If only providing text, set the max width of the text container to be `600px` for readability's sake.
   */
  body: React.ReactNode;
  /**
   * These are pre-styled buttons that can be rendered in the body.
   */
  buttonType?: 'FillButton' | 'StrokeButton' | 'TextButton';
  /**
   * You can specify `"right"` (default) or `"left"` placement of the optional button at the bottom of the body.
   */
  buttonPlacement?: 'left' | 'right';
  /**
   * A callback function MUST be included when providing a `ctaButton` to render the optional button.
   */
  ctaCallback?: () => void;
  /**
   * This string is the value displayed in the optional button rendered in the body.
   */
  ctaText?: string;
  /**
   * Accepts a boolean to render a background for the body and adds extra padding for the text.
   */
  hasPanelBg?: boolean;
  href?: string;
  spacing?: 'normal' | 'condensed' | 'compact';
}

export interface DisclosureProps
  extends DisclosureButtonProps,
    DisclosureBodyProps {
  /**
   * Determines whether or not the Disclosure is expanded upon load.
   * Default value is `false`.
   */
  initiallyExpanded: boolean;
  isListItem?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'block' | 'defaultWithPanelBg' | 'defaultWithPanelBgOnWhite' | 'blockWithPanelBgOnWhite';
}
