import { Source } from '@storybook/blocks';
import * as React from 'react';

import { DetailedCodeBodyWrapper, FloatingIndicator } from '../elements';
import { DetailedCodeBodyProps } from '../types';

export const DetailedCodeBody: React.FC<DetailedCodeBodyProps> = ({
  code,
  language,
  showFloatingBadge = false,
}) => {
  return (
    <DetailedCodeBodyWrapper hasFloatingBadge={showFloatingBadge}>
      <Source code={code} dark language={language} />
      {showFloatingBadge && (
        <FloatingIndicator aria-label="More code below">...</FloatingIndicator>
      )}
    </DetailedCodeBodyWrapper>
  );
};
