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
  const scopeToMap = Object.keys(scope);
  const separatingChar = showAltSubtitle ? '|' : ',';

  return (
    <>
      {!showAltSubtitle && (
        <>
          <Difficulty difficulty={difficulty} />,{' '}
        </>
      )}
      {scopeToMap.map((scopeType, index) =>
        scope[scopeType] ? (
          <Text ml={4} variant="p-small" key={`${scopeType}-count`}>
            {index !== 0 && separatingChar} <b>{scope[scopeType]}</b>{' '}
            <Text textColor="gray-900">
              {capitalize(pluralizeWithS(scopeType, scope[scopeType]))}
            </Text>{' '}
          </Text>
        ) : null
      )}
    </>
  );
};
