import {
  Box,
  Card,
  CardProps,
  FlexBox,
  GridBox,
  HeadingTags,
  Text,
} from '@codecademy/gamut';
import { LevelIcon } from '@codecademy/gamut-icons';
import { Background, Colors } from '@codecademy/gamut-styles';
import pluralize from 'pluralize';
import React from 'react';

import { Divider } from './shared';
import { CourseDifficulty, EnrollmentStatus } from './types';

const Image = Box.withComponent('img');

type ContentGroupBaseCardProps = {
  headerBackgroundColor: Colors;
  headerText: string;
  title: string;
  headingLevel?: HeadingTags;
  description?: string;
  difficulty?: CourseDifficulty;
  numLessons: number;
  imageSrc?: string;
  isFullSize?: boolean;
  shadow?: 'small' | 'outline' | 'medium';
  enrollmentStatus?: EnrollmentStatus;
  children?: React.ReactNode;
  minHeight?: CardProps['minHeight'];
  minWidth?: CardProps['minWidth'];
};

type EnrollmentStatusAssets = {
  [status in
    | EnrollmentStatus.InProgress
    | EnrollmentStatus.Completed
    | EnrollmentStatus.None]: { text: string; backgroundColor: Colors };
};

export const ContentGroupBaseCard: React.FC<ContentGroupBaseCardProps> = ({
  headerBackgroundColor,
  headerText,
  title,
  headingLevel,
  description,
  difficulty,
  numLessons,
  imageSrc,
  isFullSize = false,
  shadow = 'medium',
  enrollmentStatus,
  children,
  minHeight,
  minWidth,
}) => {
  const enrollmentAssets: EnrollmentStatusAssets = {
    completed: { text: headerText + ' completed!', backgroundColor: 'green' },
    inProgress: { text: 'In progress...', backgroundColor: 'yellow' },
    none: { text: headerText, backgroundColor: headerBackgroundColor },
  };

  const isEnrolled =
    enrollmentStatus === EnrollmentStatus.InProgress ||
    enrollmentStatus === EnrollmentStatus.Completed;

  return (
    <Card
      variant={isEnrolled ? 'beige' : 'white'}
      borderRadius="4px"
      borderColor="navy"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      shadow={shadow}
      p={0}
      height="100%"
      minHeight={minHeight}
      minWidth={minWidth}
    >
      <Background
        bg={
          enrollmentStatus
            ? enrollmentAssets[enrollmentStatus].backgroundColor
            : headerBackgroundColor
        }
        pl={12}
        py={4}
      >
        <Text fontFamily="accent" fontSize={14}>
          {enrollmentStatus
            ? enrollmentAssets[enrollmentStatus].text
            : headerText}
        </Text>
      </Background>
      <GridBox
        gridAutoFlow="column"
        columnGap={isFullSize ? 16 : undefined}
        px={12}
        pt={4}
        pb={8}
        height="100%"
      >
        <FlexBox flexDirection="column" textAlign="left">
          <Box>
            <Text variant="title-xs" as={headingLevel} pt={12} pb={4}>
              {title}
            </Text>
            {description && (
              <Text
                variant="p-small"
                truncate="ellipsis"
                truncateLines={4}
                mb={isFullSize ? 16 : 0}
              >
                {description}
              </Text>
            )}
          </Box>
          <Box mt="auto">
            {children}
            <Divider />
            <FlexBox justifyContent="space-between">
              <FlexBox alignItems="center">
                <FlexBox pr={4}>
                  <LevelIcon />
                </FlexBox>
                <Text variant="p-small" pl={4} whiteSpace="nowrap">
                  <b>{difficulty}</b>
                  {difficulty === CourseDifficulty.Beginner && <> Friendly</>}
                </Text>
              </FlexBox>
              {numLessons > 0 && (
                <FlexBox>
                  <Text variant="p-small" pl={4} whiteSpace="nowrap">
                    <b>{numLessons}</b> {pluralize('Lessons', numLessons)}
                  </Text>
                </FlexBox>
              )}
            </FlexBox>
          </Box>
        </FlexBox>
        <Box
          display={isFullSize ? { _: 'none', md: 'flex' } : 'none'}
          alignItems="center"
          px={64}
        >
          <Image aria-hidden width={100} height={100} src={imageSrc} />
        </Box>
      </GridBox>
    </Card>
  );
};
