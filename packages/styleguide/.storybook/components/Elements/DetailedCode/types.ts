import { Source } from '@storybook/blocks';
import { ComponentProps } from 'react';

type SourceLanguage = ComponentProps<typeof Source>['language'];

export interface DetailedCodeProps {
  code: string;
  language?: SourceLanguage;
  initiallyExpanded?: boolean;
  preview?: boolean;
  previewLines?: number;
}

export interface DetailedCodeButtonProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  language: SourceLanguage;
}

export interface DetailedCodeBodyProps {
  code: string;
  language: SourceLanguage;
  showFloatingBadge?: boolean;
}
