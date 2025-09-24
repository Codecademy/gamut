import {
  DisclosureBodyWrapperStyles,
  DisclosureWrapperStyles,
} from './elements';

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
  /**
   * Determines the size of the heading text and the space between text in the body.
   */
  spacing?: 'normal' | 'condensed' | 'compact';
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Provide a string value to appear below the heading.
   */
  subheading?: string;
}

export interface DisclosureBodyProps extends DisclosureBodyWrapperStyles {
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
  href?: string;
  /**
   * Determines the size of the heading text and the space between text in the body.
   */
  spacing?: 'normal' | 'condensed' | 'compact';
}

export interface DisclosureProps
  extends Omit<DisclosureButtonProps, 'isExpanded' | 'setIsExpanded'>,
    DisclosureBodyProps,
    DisclosureWrapperStyles {
  /**
   * Determines whether or not the Disclosure is expanded upon load.
   * Default value is `false`.
   */
  initiallyExpanded?: boolean;
  /**
   * Renders as a `li` if `true`.
   */
  isListItem?: boolean;
  onClick?: () => void;
}
