import { Source } from '@storybook/blocks';
import { ComponentProps } from 'react';
import * as React from 'react';

import { DetailedCodeBodyWrapper, FloatingExpandButton } from '../elements';
import { DetailedCodeBodyProps } from '../types';

type SourceLanguage = ComponentProps<typeof Source>['language'];

export const DetailedCodeBody: React.FC<DetailedCodeBodyProps> = ({
  code,
  language,
  showFloatingBadge = false,
  isExpanded = false,
  setIsExpanded,
}) => {
  const handleClick = () => {
    if (setIsExpanded) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <DetailedCodeBodyWrapper hasFloatingBadge={showFloatingBadge}>
      <Source code={code} dark language={language as SourceLanguage} />
      {showFloatingBadge && (
        <FloatingExpandButton
          onClick={handleClick}
          size="normal"
        >
          {isExpanded ? 'Show less code' : 'Show more code'}
        </FloatingExpandButton>
      )}
    </DetailedCodeBodyWrapper>
  );
};