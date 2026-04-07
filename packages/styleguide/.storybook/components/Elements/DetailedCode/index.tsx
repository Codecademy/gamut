import React, { useState } from 'react';

import { DetailedCodeBody } from './DetailedCodeBody';
import { DetailedCodeButton } from './DetailedCodeButton';
import { DetailedCodeWrapper } from './elements';
import { DetailedCodeProps } from './types';

const DEFAULT_PREVIEW_LINES = 20;
const DEFAULT_LANGUAGE = 'tsx';

export const DetailedCode: React.FC<DetailedCodeProps> = ({
  code,
  initiallyExpanded = false,
  language = DEFAULT_LANGUAGE,
  preview = false,
  previewLines = DEFAULT_PREVIEW_LINES,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const normalizedPreviewLines = Math.max(0, previewLines);
  const previewEnabled = preview && normalizedPreviewLines > 0;

  const allLines = code.trimEnd().split('\n');
  const hiddenLineCount = previewEnabled
    ? Math.max(0, allLines.length - normalizedPreviewLines)
    : 0;
  const hasMoreCode = hiddenLineCount > 0;

  const codeSnippet = previewEnabled
    ? allLines.slice(0, normalizedPreviewLines).join('\n')
    : code;

  const displayedCode = isExpanded ? code : codeSnippet;

  return (
    <DetailedCodeWrapper>
      <DetailedCodeBody
        code={displayedCode}
        language={language}
        showEllipses={hasMoreCode && !isExpanded}
        hiddenLineCount={hiddenLineCount}
      />
      {hasMoreCode && (
        <DetailedCodeButton
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded((prev) => !prev)}
          language={language}
        />
      )}
    </DetailedCodeWrapper>
  );
};
