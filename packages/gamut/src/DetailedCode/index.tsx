import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { ExpandInCollapseOut } from '../Animation';
import { DetailedCodeBody } from './DetailedCodeBody';
import { DetailedCodeButton } from './DetailedCodeButton';
import { DetailedCodeWrapper } from './elements';
import { DetailedCodeProps } from './types';

const DEFAULT_PREVIEW_LINES = 10;

const getPreviewCode = (code: string, previewLines: number) => {
  const trimmedLines = code.split('\n');

  if (trimmedLines.length <= previewLines) {
    return code;
  }

  return `${trimmedLines.slice(0, previewLines).join('\n')}\n...`;
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
  const shouldShowPreview = previewEnabled && !isExpanded;
  const previewCode = previewEnabled
    ? getPreviewCode(code, normalizedPreviewLines)
    : code;

  return (
    <DetailedCodeWrapper column>
      <DetailedCodeButton
        heading={heading}
        isExpanded={isExpanded}
        language={language}
        setIsExpanded={setIsExpanded}
      />
      {shouldShowPreview && (
        <DetailedCodeBody code={previewCode} language={language} />
      )}
      <AnimatePresence>
        {isExpanded && (
          <ExpandInCollapseOut>
            <DetailedCodeBody code={code} language={language} />
          </ExpandInCollapseOut>
        )}
      </AnimatePresence>
    </DetailedCodeWrapper>
  );
};
