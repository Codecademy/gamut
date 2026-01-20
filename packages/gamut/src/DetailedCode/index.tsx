import { useState } from 'react';
import * as React from 'react';

import { DetailedCodeBody } from './DetailedCodeBody';
import { DetailedCodeButton } from './DetailedCodeButton';
import { DetailedCodeWrapper } from './elements';
import { DetailedCodeProps } from './types';

const DEFAULT_PREVIEW_LINES = 10;

const getPreviewCode = (code: string, previewLines: number) => {
  const lines = code.split('\n');

  if (lines.length <= previewLines) {
    return code;
  }

  return lines.slice(0, previewLines).join('\n');
};

export const DetailedCode: React.FC<DetailedCodeProps> = ({
  code,
  heading,
  initiallyExpanded = false,
  language,
  preview = false,
  previewLines = DEFAULT_PREVIEW_LINES,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const normalizedPreviewLines = Math.max(0, previewLines);
  const previewEnabled = preview && normalizedPreviewLines > 0;
  const previewCode = previewEnabled
    ? getPreviewCode(code, normalizedPreviewLines)
    : code;

  // Show the button to expand the code if there is more code than the preview lines, and hide the button if there is no more code
  const hasMoreCode = previewEnabled && code.split('\n').length > normalizedPreviewLines;

  const displayedCode = isExpanded ? code : previewCode;

  return (
    <DetailedCodeWrapper column>
      <DetailedCodeBody code={displayedCode} language={language} />
      {hasMoreCode && (
        <DetailedCodeButton
          heading={heading}
          isExpanded={isExpanded}
          language={language}
          setIsExpanded={setIsExpanded}
        />
      )}
    </DetailedCodeWrapper>
  );
};
