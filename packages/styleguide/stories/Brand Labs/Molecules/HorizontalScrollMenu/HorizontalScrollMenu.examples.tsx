import { Box, ContentContainer } from '@codecademy/gamut';
import {
  ContainerDifficulty,
  CurriculumCard,
  HorizontalScrollMenu,
} from '@codecademy/gamut-labs';

const courseData = [
  {
    id: 'a',
    title: 'JavaScript',
    difficulty: ContainerDifficulty.Beginner,
    scope: { Lesson: 24 },
    text: 'course',
  },
  {
    id: 'b',
    title: 'Python',
    difficulty: ContainerDifficulty.Beginner,
    scope: { Lesson: 32 },
    text: 'course',
  },
  {
    id: 'c',
    title: 'Go',
    difficulty: ContainerDifficulty.Beginner,
    scope: { Lesson: 5 },
    text: 'course',
  },
  {
    id: 'd',
    title: 'React',
    difficulty: ContainerDifficulty.Beginner,
    scope: { Lesson: 18 },
    text: 'course',
  },
  {
    id: 'e',
    title: 'Intro to Django',
    difficulty: ContainerDifficulty.Beginner,
    scope: { Lesson: 29 },
    text: 'course',
  },
  {
    id: 'f',
    title: 'PHP',
    difficulty: ContainerDifficulty.Beginner,
    scope: { Lesson: 52 },
    text: 'course',
  },
];

export const HorizontalScrollMenuExample = () => {
  return (
    <ContentContainer py={32}>
      <HorizontalScrollMenu>
        {courseData.map((props) => (
          <Box key={props.id} minWidth={400} maxWidth={400} mx={16}>
            <CurriculumCard {...props} />
          </Box>
        ))}
      </HorizontalScrollMenu>
    </ContentContainer>
  );
};
