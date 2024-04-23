export interface DisclosureButtonProps {
  // TODO:  pull it directly from variant call
  spacing?: 'normal' | 'condensed' | 'compact';
  header: string;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5';
  overline?: string;
  subheader?: string;
  // Is this right? since we're always passing this in for them?
  isExpanded?: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

export interface DisclosureAreaProps {
  body: React.ReactNode;
  withBackground: boolean;
  ctaText?: string;
  spacing?: 'normal' | 'condensed' | 'compact';
  ctaCallback?: () => void;
}

export interface DisclosureProps
  extends DisclosureButtonProps,
    DisclosureAreaProps {
  initiallyExpanded: boolean;
  variant?: 'default' | 'block';
}
