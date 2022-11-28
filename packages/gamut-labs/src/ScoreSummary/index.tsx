import { Anchor, Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import { Colors, pxRem } from '@codecademy/gamut-styles';
import { UserClickData } from '@codecademy/tracking';
import React from 'react';

import { QuizScore } from '../QuizScore';
import { createResumeUrlPath } from './helpers';
import { CorrectAnswerCountsBySubContent, UntestedSubContent } from './types';

export interface ScoreSummaryProps {
  subScores: CorrectAnswerCountsBySubContent;
  totalCorrect: number;
  totalQuestions: number;
  pathSlug: string;
  trackSlug: string;
  trackingData: UserClickData;
  borderColor?: Colors;
  lighterBorderColor?: Colors;
  layout?: 'column' | 'row';
  untestedSubContent?: UntestedSubContent[];
  columnLayout?: boolean;
  trackUserClick: (data: UserClickData) => void;
  description?: string;
}

const renderSubScores = ({
  subScores,
  pathSlug,
  trackSlug,
  trackingData,
  trackUserClick,
}: {
  subScores: CorrectAnswerCountsBySubContent;
  pathSlug: string;
  trackSlug: string;
  trackingData: UserClickData;
  trackUserClick: (data: UserClickData) => void;
}) =>
  Object.entries(subScores).map(
    (
      [
        subContentId,
        {
          title: subContentTitle,
          correct: subContentCorrect,
          total: subContentTotal,
          slug: subContentSlug,
        },
      ],
      i
    ) => {
      const subContentPercentCorrect = subContentCorrect / subContentTotal;
      const reviewConceptsPath = createResumeUrlPath({
        pathSlug,
        trackSlug,
        moduleSlug: subContentSlug,
      });

      return (
        <FlexBox
          key={subContentId}
          borderTop={i !== 0 ? 1 : 'none'}
          px={16}
          py={8}
          justifyContent="space-between"
        >
          <Text fontWeight="bold">{subContentTitle}</Text>
          <FlexBox fontSize={14} minWidth="11rem" justifyContent="flex-end">
            {subContentPercentCorrect <= 0.6 && (
              <>
                <Anchor
                  aria-label={`Review concepts for ${subContentTitle}`}
                  mr={16}
                  href={reviewConceptsPath}
                  onClick={() =>
                    trackUserClick({
                      ...trackingData,
                      course_progress: parseFloat(
                        subContentPercentCorrect.toFixed(4)
                      ),
                      href: reviewConceptsPath,
                      module_id: subContentId,
                    })
                  }
                >
                  Review Concepts
                </Anchor>{' '}
              </>
            )}
            <Text
              aria-label={`${subContentCorrect} out of ${subContentTotal} correct`}
            >
              {`${subContentCorrect} / ${subContentTotal}`}
            </Text>
          </FlexBox>
        </FlexBox>
      );
    }
  );

const renderUntestedSubContent = ({
  untestedSubContent,
  lighterBorderColor,
}: {
  untestedSubContent: UntestedSubContent[];
  lighterBorderColor: Colors;
}) => (
  <FlexBox
    flexDirection="column"
    borderWidth={1}
    borderWidthTop={0}
    borderStyle="solid"
    borderColor={lighterBorderColor}
  >
    {untestedSubContent.map(({ id, title }, i) => {
      return (
        <FlexBox
          key={id}
          borderWidth={1}
          borderWidthTop={i === 0 ? 0 : 1}
          borderStyle="solid"
          borderColor={lighterBorderColor}
          px={16}
          py={8}
          justifyContent="space-between"
          color={lighterBorderColor}
        >
          <Text flexGrow={1}>{title}</Text>
          <FlexBox
            fontSize={14}
            alignItems="center"
            minWidth="6.5rem"
            justifyContent="flex-end"
          >
            <Text fontFamily="accent">Not tested</Text>
          </FlexBox>
        </FlexBox>
      );
    })}
  </FlexBox>
);

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  subScores,
  totalCorrect,
  totalQuestions,
  pathSlug,
  trackSlug,
  trackingData,
  untestedSubContent,
  borderColor = 'white',
  lighterBorderColor = 'navy-400',
  layout = 'row',
  columnLayout = false,
  trackUserClick,
  description,
}) => {
  let numOfRows = Object.entries(subScores).length;
  if (untestedSubContent) {
    numOfRows += untestedSubContent.length;
  }
  const isRowLayout = layout === 'row';
  return (
    <GridBox gridTemplateColumns={isRowLayout ? '2fr 3fr' : ''}>
      <GridBox
        zIndex={1}
        bg="transparent"
        maxWidth={isRowLayout ? pxRem(500) : pxRem(705)}
        mr={isRowLayout ? 24 : 0}
      >
        <Box
          px={isRowLayout ? [12, 24, 32] : [24, 32, 64, 96]}
          pt={24}
          pb={8}
          display={columnLayout ? 'flex' : 'block'}
          flexDirection={columnLayout ? 'column' : 'row'}
          justifyContent={columnLayout ? 'center' : ''}
          border={1}
        >
          <QuizScore
            borderColor={borderColor}
            correctCount={totalCorrect}
            layout={isRowLayout ? 'column' : 'row'}
            total={totalQuestions}
            smallerFont
            numOfRows={numOfRows}
            columnLayout={columnLayout}
          />
        </Box>
        {description && (
          <Box
            p={16}
            pb={isRowLayout ? 0 : 16}
            border={isRowLayout ? 'none' : 1}
            borderTop="none"
            textAlign={isRowLayout ? 'center' : 'left'}
          >
            <Text fontSize={14}>{description}</Text>
          </Box>
        )}
      </GridBox>
      <FlexBox flexDirection="column" maxWidth={pxRem(705)}>
        <FlexBox
          flexDirection="column"
          borderX={1}
          borderBottom={1}
          borderTop={isRowLayout ? 1 : undefined}
        >
          {renderSubScores({
            subScores,
            pathSlug,
            trackSlug,
            trackingData,
            trackUserClick,
          })}
        </FlexBox>
        <GridBox bg="transparent">
          {untestedSubContent &&
            untestedSubContent?.length > 0 &&
            renderUntestedSubContent({
              untestedSubContent,
              lighterBorderColor,
            })}
        </GridBox>
      </FlexBox>
    </GridBox>
  );
};
