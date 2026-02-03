export interface DetailedCodeProps {
  code: string;
  language: string;
  initiallyExpanded?: boolean;
  preview?: boolean;
  previewLines?: number;
}

export interface DetailedCodeButtonProps {
  isExpanded?: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DetailedCodeBodyProps {
  code: string;
  language: string;
}
