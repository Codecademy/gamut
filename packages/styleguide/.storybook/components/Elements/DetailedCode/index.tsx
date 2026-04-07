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

  const codeLines = code.trimEnd().split('\n');
  const hasMoreCode =
    previewEnabled && codeLines.length > normalizedPreviewLines;

  const previewCode = previewEnabled
    ? codeLines.slice(0, normalizedPreviewLines).join('\n')
    : code;

  const displayedCode = isExpanded ? code : previewCode;

  return (
    <DetailedCodeWrapper>
      <DetailedCodeBody
        code={displayedCode}
        language={language}
        showEllipses={hasMoreCode && !isExpanded}
        codeLines={
          previewEnabled
            ? Math.max(0, codeLines.length - normalizedPreviewLines)
            : 0
        }
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
