import { FlexBox } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { capitalize } from 'lodash';
import pluralize from 'pluralize';
import React from 'react';

import { Difficulty, DifficultyProps } from '../Difficulty';

const StyledText = styled.span`
  color: ${colors.navy};
`;

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
          <StyledText data-testid="scope-count">
            <b>{scopeCount}</b> {capitalize(pluralize(scope, scopeCount))}
          </StyledText>
        </>
      )}
    </FlexBox>
  );
};
