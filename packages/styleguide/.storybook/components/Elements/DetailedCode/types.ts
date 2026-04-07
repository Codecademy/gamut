import { Source } from '@storybook/addon-docs/blocks';
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
  onToggle: () => void;
  language: SourceLanguage;
}

export interface DetailedCodeBodyProps {
  code: string;
  language: SourceLanguage;
  showEllipses?: boolean;
  codeLines: number;
}
