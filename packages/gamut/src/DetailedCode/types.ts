export interface DetailedCodeProps {
  code: string;
  heading?: string;
  language: string;
  initiallyExpanded?: boolean;
}

export interface DetailedCodeButtonProps {
  heading?: string;
  isExpanded?: boolean;
  language: string;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DetailedCodeBodyProps {
  code: string;
  language: string;
}
