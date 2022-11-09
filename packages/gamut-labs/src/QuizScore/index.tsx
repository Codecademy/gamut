import { Box, FlexBox, GridBox, Text } from '@codecademy/gamut';
import { CheckFilledIcon, DeleteFilledIcon } from '@codecademy/gamut-icons';
import { Colors } from '@codecademy/gamut-styles';
import React from 'react';

interface QuizScoreProps {
  correctCount: number;
  total: number;
  borderColor?: Colors;
  layout?: 'row' | 'column';
  smallerFont?: boolean;
  numOfRows?: number;
  columnLayout?: boolean;
}

export const QuizScore: React.FC<QuizScoreProps> = ({
  borderColor = 'white',
  correctCount,
  layout = 'row',
  smallerFont,
  total,
  numOfRows,
  columnLayout,
}) => {
  const quizScore = total < 1 ? 0 : Math.floor((correctCount / total) * 100);
  const affirmation = quizScore > 70 ? 'Great job!' : 'Practice makes perfect!';
  return (
    <GridBox
      gridTemplateColumns={
        layout === 'row'
          ? {
              _: 'minmax(0,1fr)',
              sm: '1fr min-content 1fr',
            }
          : ''
      }
      gridTemplateRows={layout === 'row' ? '' : 'min-content 1fr min-content'}
      fontFamily="accent"
      gap={[32, , 24]}
      mb={{ _: 32, sm: 16 }}
    >
      <FlexBox flexDirection="column" textAlign="center">
        <Text fontSize={smallerFont ? 34 : 44}>{quizScore}%</Text>
        <Text fontSize={14}>{affirmation}</Text>
      </FlexBox>
      <Box
        bg={borderColor}
        width={layout === 'row' ? '1px' : ''}
        height={layout === 'row' ? '' : '1px'}
        display={['none', , 'block']}
      />
      <GridBox
        gridTemplateColumns={
          columnLayout && numOfRows && numOfRows > 5
            ? 'repeat(2,minmax(0,max-content))'
            : layout === 'row'
            ? 'repeat(2,minmax(0,max-content))'
            : { _: 'repeat(2,minmax(0,max-content))', xl: '20px 1fr 20px 1fr' }
        }
        gridTemplateRows={
          columnLayout && numOfRows && numOfRows > 5 ? '1fr 1fr' : ''
        }
        alignItems="center"
        columnGap={16}
        justifyContent="center"
        display={total === correctCount ? 'flex' : 'grid'}
      >
        <CheckFilledIcon aria-hidden size={24} />
        <Text fontSize={smallerFont ? 16 : 22} lineHeight={2 as any}>
          {correctCount} correct
        </Text>
        {correctCount < total && (
          <>
            <DeleteFilledIcon aria-hidden size={24} />
            <Text fontSize={smallerFont ? 16 : 22} lineHeight={2 as any}>{`${
              total - correctCount
            } to work on`}</Text>
          </>
        )}
      </GridBox>
    </GridBox>
  );
};
