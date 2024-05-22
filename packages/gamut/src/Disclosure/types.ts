// import { ButtonProps } from "../Button/shared/types";

export interface DisclosureButtonProps {
  spacing?: 'normal' | 'condensed' | 'compact';
  heading: string;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5';
  overline?: string;
  subheading?: string;
  isExpanded?: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

export interface DisclosureBodyProps {
  body: React.ReactNode;
  withBackground?: boolean;
  ctaText?: string;
  spacing?: 'normal' | 'condensed' | 'compact';
  ctaCallback?: () => void;
  button?: 'FillButton' | 'StrokeButton' | 'TextButton';
  buttonPlacement?: 'left' | 'right';
  href?: string;
}

export interface DisclosureProps
  extends DisclosureButtonProps,
    DisclosureBodyProps {
  initiallyExpanded: boolean;
  variant?: 'default' | 'block';
}
