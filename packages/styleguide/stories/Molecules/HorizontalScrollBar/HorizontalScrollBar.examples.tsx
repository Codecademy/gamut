import { Box, ContentContainer, HorizontalScrollBar } from '@codecademy/gamut';
import { CurriculumCard, CurriculumCardProps } from '@codecademy/gamut-labs';
import React from 'react';

const courseData = [
  {
    id: 'a',
    title: 'JavaScript',
    difficulty: 1 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 24 },
    text: 'course',
  },
  {
    id: 'b',
    title: 'Python',
    difficulty: 0 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 32 },
    text: 'course',
  },
  {
    id: 'c',
    title: 'Go',
    difficulty: 1 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 5 },
    text: 'course',
  },
  {
    id: 'd',
    title: 'React',
    difficulty: 1 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 18 },
    text: 'course',
  },
];

export const HorizontalScrollBarExample = () => {
  return (
    <ContentContainer py={32}>
      <HorizontalScrollBar scrollInterval={400}>
        {courseData.map((props) => (
          <Box key={props.id} minWidth={400} maxWidth={400} mx={16}>
            <CurriculumCard {...props} />
          </Box>
        ))}
      </HorizontalScrollBar>
    </ContentContainer>
  );
};
