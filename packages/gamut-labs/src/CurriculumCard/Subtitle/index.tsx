import { Text } from '@codecademy/gamut';
import { capitalize } from 'lodash';
import React from 'react';

import { Difficulty, DifficultyProps } from '../Difficulty';
import { pluralizeWithS } from './helpers';

export type SubtitleProps = DifficultyProps & {
  scope: Record<string, number>;
  showAltSubtitle: boolean;
};

export const Subtitle: React.FC<SubtitleProps> = ({
  difficulty,
  scope,
  showAltSubtitle,
}) => {
  const scopeToMap = Object.keys(scope).filter((val) => scope[val] > 0);

  const separatingChar = showAltSubtitle ? '|' : ',';

  return (
    <>
      {!showAltSubtitle && <Difficulty difficulty={difficulty} />}
      {!showAltSubtitle && scopeToMap.length && separatingChar}
      {scopeToMap.map((scopeType, index) => (
        <Text ml={4} variant="p-small" key={`${scopeType}-count`}>
          <b>{scope[scopeType]}</b>{' '}
          <Text textColor="gray-900">
            {capitalize(pluralizeWithS(scopeType, scope[scopeType]))}
          </Text>{' '}
          {index < scopeToMap.length - 1 && separatingChar}
        </Text>
      ))}
    </>
  );
};
