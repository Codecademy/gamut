import { Source } from '@storybook/blocks';
import { ComponentProps } from 'react';
import * as React from 'react';

import { DetailedCodeBodyWrapper } from '../elements';
import { DetailedCodeBodyProps } from '../types';

type SourceLanguage = ComponentProps<typeof Source>['language'];

export const DetailedCodeBody: React.FC<DetailedCodeBodyProps> = ({
  code,
  language,
}) => {
  return (
    <DetailedCodeBodyWrapper>
      <Source code={code} dark language={language as SourceLanguage} />
    </DetailedCodeBodyWrapper>
  );
};
