import { Text } from '@codecademy/gamut';
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
    <>
      <Difficulty difficulty={difficulty} />
      {scopeCount ? (
        <>
          ,
          <Text ml={4} variant="p-small">
            <b>{scopeCount}</b>{' '}
            <Text textColor="gray-900">
              {capitalize(pluralizeWithS(scope, scopeCount))}
            </Text>
          </Text>
        </>
      ) : null}
    </>
  );
};
