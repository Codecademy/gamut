import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { ExpandInCollapseOut } from '../Animation';
import { DetailedCodeBody } from './DetailedCodeBody';
import { DetailedCodeButton } from './DetailedCodeButton';
import { DetailedCodeWrapper } from './elements';
import { DetailedCodeProps } from './types';

export const DetailedCode: React.FC<DetailedCodeProps> = ({
  code,
  heading,
  initiallyExpanded = false,
  language,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  return (
    <DetailedCodeWrapper column>
      <DetailedCodeButton
        heading={heading}
        isExpanded={isExpanded}
        language={language}
        setIsExpanded={setIsExpanded}
      />
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
