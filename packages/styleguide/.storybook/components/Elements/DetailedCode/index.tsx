import React, { useState } from 'react';

import { DetailedCodeBody } from './DetailedCodeBody';
import { DetailedCodeButton } from './DetailedCodeButton';
import { DetailedCodeWrapper } from './elements';
import { DetailedCodeProps } from './types';

const DEFAULT_PREVIEW_LINES = 20;
const DEFAULT_LANGUAGE = 'tsx';

const getPreviewCode = (code: string, previewLines: number) => {
  const lines = code.split('\n');

  if (lines.length <= previewLines) {
    return code;
  }

  return lines.slice(0, previewLines).join('\n');
};

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
  const previewCode = previewEnabled
    ? getPreviewCode(code, normalizedPreviewLines)
    : code;

  const hasMoreCode =
    previewEnabled && code.split('\n').length > normalizedPreviewLines;

  const displayedCode = isExpanded ? code : previewCode;

  return (
    <DetailedCodeWrapper>
      <DetailedCodeBody
        code={displayedCode}
        language={language}
        showFloatingBadge={hasMoreCode && !isExpanded}
      />
      {hasMoreCode && (
        <DetailedCodeButton
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          language={language}
        />
      )}
    </DetailedCodeWrapper>
  );
};
