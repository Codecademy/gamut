import { Anchor, Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import { CheckFilledIcon, DeleteFilledIcon } from '@codecademy/gamut-icons';
import { Colors, pxRem } from '@codecademy/gamut-styles';
import { UserClickData } from '@codecademy/tracking';
import * as React from 'react';

import { QuizScore } from '../QuizScore';
import { createResumeUrlPath } from './helpers';
import { CorrectAnswerCountsBySubContent, UntestedSubContent } from './types';

export interface ScoreSummaryProps {
  subScores: CorrectAnswerCountsBySubContent;
  totalCorrect: number;
  totalQuestions: number;
  pathSlug: string;
  trackSlug?: string;
  trackingData?: UserClickData;
  lighterBorderColor?: Colors;
  layout?: 'column' | 'row';
  untestedSubContent?: UntestedSubContent[];
  trackUserClick?: (data: UserClickData) => void;
  description?: string;
  noMaxWidth?: boolean;
  colorfulIcons?: boolean;
}

const SHOW_REVIEW_SCORE = 0.6;
const PASSING_SCORE = 0.7;

const renderSubScores = ({
  subScores,
  pathSlug,
  trackSlug,
  trackingData,
  trackUserClick,
  colorfulIcons,
}: {
  subScores: CorrectAnswerCountsBySubContent;
  pathSlug: string;
  trackSlug?: string;
  trackingData?: UserClickData;
  trackUserClick?: (data: UserClickData) => void;
  colorfulIcons?: boolean;
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
          alignItems="center"
          role="listitem"
        >
          <FlexBox alignItems="center">
            {colorfulIcons ? (
              subContentPercentCorrect >= PASSING_SCORE ? (
                <CheckFilledIcon
                  minWidth={16}
                  mr={12}
                  color="feedback-success"
                />
              ) : (
                <DeleteFilledIcon
                  minWidth={16}
                  mr={12}
                  color="feedback-error"
                />
              )
            ) : null}
            <Text fontWeight="bold">{subContentTitle}</Text>
          </FlexBox>
          <FlexBox
            fontSize={14}
            minWidth={
              subContentPercentCorrect < SHOW_REVIEW_SCORE && trackSlug
                ? '11rem'
                : '3rem'
            }
            justifyContent="flex-end"
          >
            {subContentPercentCorrect < SHOW_REVIEW_SCORE && trackSlug && (
              <>
                <Anchor
                  aria-label={`Review concepts for ${subContentTitle}`}
                  mr={16}
                  href={reviewConceptsPath}
                  onClick={() =>
                    trackingData &&
                    trackUserClick?.({
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
              aria-label={`${subContentCorrect} out of ${subContentTotal} questions correct`}
            >{`${subContentCorrect} / ${subContentTotal}`}</Text>
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
          role="listitem"
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
  lighterBorderColor = 'navy-400',
  layout = 'row',
  trackUserClick,
  description,
  noMaxWidth = false,
  colorfulIcons = false,
}) => {
  let numOfRows = Object.entries(subScores).length;
  if (untestedSubContent) {
    numOfRows += untestedSubContent.length;
  }
  const isRowLayout = layout === 'row';
  return (
    <GridBox gridTemplateColumns={isRowLayout ? { _: '', md: '2fr 3fr' } : ''}>
      <Box
        zIndex={1}
        bg="transparent"
        display="inline"
        maxWidth={
          noMaxWidth
            ? ''
            : isRowLayout
            ? { _: pxRem(705), md: pxRem(500) }
            : pxRem(705)
        }
        mr={isRowLayout ? { _: 0, md: 24 } : 0}
      >
        <Box
          px={{ _: 24, xs: 32 }}
          pt={24}
          pb={8}
          display={isRowLayout ? { _: 'flex', md: 'block' } : 'flex'}
          flexDirection={isRowLayout ? { _: 'column', md: 'row' } : 'column'}
          justifyContent={isRowLayout ? { _: 'center', md: '' } : 'center'}
          border={1}
        >
          <QuizScore
            correctCount={totalCorrect}
            layout={isRowLayout ? 'column' : 'row'}
            total={totalQuestions}
            smallerFont
            numOfRows={numOfRows}
            colorfulIcons={colorfulIcons}
          />
        </Box>
        {description && (
          <Box
            p={16}
            pb={isRowLayout ? { _: 16, md: 0 } : 16}
            border={
              isRowLayout
                ? {
                    _: 1,
                    md: 'none',
                  }
                : 1
            }
            borderTop="none"
            textAlign={isRowLayout ? { _: 'left', md: 'center' } : 'left'}
          >
            <Text fontSize={14}>{description}</Text>
          </Box>
        )}
      </Box>
      <FlexBox
        flexDirection="column"
        maxWidth={noMaxWidth ? '' : pxRem(705)}
        role="list"
        aria-label="Unit Subjects"
      >
        <FlexBox
          flexDirection="column"
          borderX={1}
          borderBottom={1}
          borderTop={isRowLayout ? { _: undefined, md: 1 } : undefined}
        >
          {renderSubScores({
            subScores,
            pathSlug,
            trackSlug,
            trackingData,
            trackUserClick,
            colorfulIcons,
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
