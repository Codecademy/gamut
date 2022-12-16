import { Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import { CheckFilledIcon, DeleteFilledIcon } from '@codecademy/gamut-icons';
import { Colors, platformColors } from '@codecademy/gamut-styles';
import * as React from 'react';

interface QuizScoreProps {
  correctCount: number;
  total: number;
  layout?: 'row' | 'column';
  smallerFont?: boolean;
  numOfRows?: number;
  colorfulIcons?: boolean;
}

export const QuizScore: React.FC<QuizScoreProps> = ({
  correctCount,
  layout = 'row',
  smallerFont,
  total,
  numOfRows,
  colorfulIcons,
}) => {
  const isRowLayout = layout === 'row';
  const moreThan5Rows = !isRowLayout && numOfRows && numOfRows > 5;
  const quizScore = total < 1 ? 0 : Math.round((correctCount / total) * 100);
  const affirmation = quizScore > 70 ? 'Great job!' : 'Practice makes perfect!';
  return (
    <GridBox
      gridTemplateColumns={
        isRowLayout
          ? {
              _: 'minmax(0,1fr)',
              md: '1fr min-content 1fr',
            }
          : ''
      }
      gridTemplateRows={isRowLayout ? '' : 'min-content 1fr min-content'}
      fontFamily="accent"
      gap={{ _: 16, sm: 8 }}
      mb={{ _: !isRowLayout ? 16 : 32, sm: 16 }}
    >
      <FlexBox flexDirection="column" textAlign="center">
        <Text fontSize={smallerFont ? 34 : 44}>{quizScore}%</Text>
        <Text fontSize={14}>{affirmation}</Text>
      </FlexBox>
      <Box
        borderRight={1}
        borderBottom={1}
        width="100%"
        height="100%"
        display={{ _: 'none', xs: 'block' }}
      />
      <GridBox
        gridTemplateColumns={
          moreThan5Rows
            ? 'repeat(2,minmax(0,max-content))'
            : layout === 'row'
            ? 'repeat(2,minmax(0,max-content))'
            : { _: 'repeat(2,minmax(0,max-content))', xl: '20px 1fr 20px 1fr' }
        }
        gridTemplateRows={moreThan5Rows ? '1fr 1fr' : ''}
        alignItems="center"
        columnGap={16}
        justifyContent="center"
        display={total === correctCount ? 'flex' : 'grid'}
      >
        <Text
          color={
            colorfulIcons ? (platformColors.mint['500'] as Colors) : 'inherit'
          }
        >
          <CheckFilledIcon aria-hidden size={24} />
        </Text>
        <Text fontSize={smallerFont ? 16 : 22} lineHeight={2 as any}>
          {correctCount} correct
        </Text>
        {correctCount < total && (
          <>
            <Text color={colorfulIcons ? ('#FA4359' as Colors) : 'inherit'}>
              <DeleteFilledIcon aria-hidden size={24} />
            </Text>
            <Text fontSize={smallerFont ? 16 : 22} lineHeight={2 as any}>{`${
              total - correctCount
            } to work on`}</Text>
          </>
        )}
      </GridBox>
    </GridBox>
  );
};
