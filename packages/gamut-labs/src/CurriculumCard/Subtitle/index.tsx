import { FlexBox, Text } from '@codecademy/gamut';
import { capitalize } from 'lodash';
import React from 'react';

import { Difficulty, DifficultyProps } from '../Difficulty';

export type SubtitleProps = DifficultyProps & {
  scope: string;
  scopeCount?: number;
};

/* Quick and easy credit: https://stackoverflow.com/a/39835908 */
const pluralizeWithS = (scope: string, scopeCount: number) =>
  `${scope}${scopeCount !== 1 ? 's' : ''}`;

export const Subtitle: React.FC<SubtitleProps> = ({
  difficulty,
  scope,
  scopeCount,
}) => {
  return (
    <FlexBox flexWrap="wrap">
      <Difficulty difficulty={difficulty} />
      {scopeCount && (
        <Text ml={4} variant="p-small" textColor="gray-700">
          <b>{scopeCount}</b> {capitalize(pluralizeWithS(scope, scopeCount))}
        </Text>
      )}
    </FlexBox>
  );
};
