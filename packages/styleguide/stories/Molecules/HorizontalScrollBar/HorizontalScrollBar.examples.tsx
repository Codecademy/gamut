import { Box, ContentContainer, HorizontalScrollBar } from '@codecademy/gamut';
import { CurriculumCard, CurriculumCardProps } from '@codecademy/gamut-labs';
import React from 'react';

const courseData = [
  {
    title: 'JavaScript',
    difficulty: 1 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 24 },
    text: 'course',
  },
  {
    title: 'Python',
    difficulty: 0 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 32 },
    text: 'course',
  },
  {
    title: 'Go',
    difficulty: 1 as CurriculumCardProps['difficulty'],
    scope: { Lesson: 5 },
    text: 'course',
  },
  {
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
        {courseData.map((props, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box
            key={`${props.title}-${index}`}
            minWidth={400}
            maxWidth={400}
            mx={16}
          >
            <CurriculumCard {...props} />
          </Box>
        ))}
      </HorizontalScrollBar>
    </ContentContainer>
  );
};
