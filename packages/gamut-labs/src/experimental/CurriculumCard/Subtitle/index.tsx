import { FlexBox } from '@codecademy/gamut';
import { capitalize } from 'lodash';
import pluralize from 'pluralize';
import React from 'react';

import { Difficulty, DifficultyProps } from '../Difficulty';

export type SubtitleProps = DifficultyProps & {
  scope: string;
  scopeCount?: number;
};

export const Subtitle: React.FC<SubtitleProps> = ({
  difficulty,
  scope,
  scopeCount,
}) => {
  return (
    <FlexBox flexWrap="wrap" fontSize={14} color="gray-700">
      <Difficulty difficulty={difficulty} />
      {scopeCount && (
        <>
          ,&nbsp;
          <span data-testid="scope-count">
            <b>{scopeCount}</b> {capitalize(pluralize(scope, scopeCount))}
          </span>
        </>
      )}
    </FlexBox>
  );
};
