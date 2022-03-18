import { FlexBox, Text } from '@codecademy/gamut';
import { capitalize } from 'lodash';
import React from 'react';

import { ContentDifficulty } from '../../ContentDifficulty';
import { ContentDifficultyProps } from '../../ContentDifficulty/types';
import { pluralizeWithS } from './helpers';

export type SubtitleProps = Pick<ContentDifficultyProps, 'difficulty'> & {
  scope: Record<string, number>;
  showAltSubtitle?: boolean;
};

export const Subtitle: React.FC<SubtitleProps> = ({
  difficulty,
  scope,
  showAltSubtitle = false,
}) => {
  const scopeToMap = Object.keys(scope).filter((val) => scope[val] > 0);

  const separatingChar = showAltSubtitle ? '|' : ',';

  return (
    <>
      {!showAltSubtitle && (
        <>
          <FlexBox fontSize={14} alignItems="center">
            <ContentDifficulty difficulty={difficulty} />
          </FlexBox>
          {scopeToMap.length ? separatingChar : null}
        </>
      )}
      {scopeToMap.map((scopeType, index) => (
        <Text
          ml={showAltSubtitle && index === 0 ? 0 : 4}
          variant="p-small"
          key={`${scopeType}-count`}
        >
          <b>{scope[scopeType]}</b>{' '}
          <Text textColor="gray-900">
            {capitalize(pluralizeWithS(scopeType, scope[scopeType]))}
          </Text>{' '}
          {index < scopeToMap.length - 1 && separatingChar}{' '}
        </Text>
      ))}
    </>
  );
};
