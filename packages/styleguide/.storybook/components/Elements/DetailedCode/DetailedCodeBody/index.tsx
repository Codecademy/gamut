import { Source } from '@storybook/addon-docs/blocks';

import { DetailedCodeBodyWrapper, FloatingIndicator } from '../elements';
import { DetailedCodeBodyProps } from '../types';

export const DetailedCodeBody: React.FC<DetailedCodeBodyProps> = ({
  code,
  language,
  showEllipses = false,
  codeLines,
}) => {
  return (
    <DetailedCodeBodyWrapper hasShowCodeButton={showEllipses}>
      <Source code={code} dark language={language} />
      {showEllipses && (
        <FloatingIndicator aria-label="More code below">
          ... {codeLines} more line{codeLines === 1 ? '' : 's'}
        </FloatingIndicator>
      )}
    </DetailedCodeBodyWrapper>
  );
};
