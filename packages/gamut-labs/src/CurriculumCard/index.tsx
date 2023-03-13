import {
  Box,
  Card,
  CardProps,
  FlexBox,
  HeadingTags,
  Text,
} from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import * as React from 'react';

import { TagColor } from './BottomTag/index';
import { Footer } from './Footer/index';
import { Image } from './Image/index';
import { Subtitle, SubtitleProps } from './Subtitle';

export type ProgressState = 'inProgress' | 'completed';

export type FooterTextVariantType = 'enrolled' | 'inProgress';

const cardHeight = 180;

const cardStyles = {
  inProgress: 'yellow',
  completed: 'navy',
} as const;

export type CurriculumCardProps = SubtitleProps & {
  beta?: boolean;
  /**
   * Displays the curriculum type above the title
   */
  text: string;
  title: string;
  headingLevel?: HeadingTags;
  image?: string;
  isFullSize?: boolean;
  isStaticSize?: boolean;
  progressState?: ProgressState;
  showProLogo?: boolean;
  tag?: string;
  tagColor?: TagColor;
  showAltSubtitle?: boolean;
  /**
   * Changes In Progress card footer text from "Enrolled..." to "In Progress..."
   */
  footerTextVariant?: FooterTextVariantType;
  /**
   * optional text to be displayed below card subtitle
   */
  description?: string;
  /**
   * allows description to be shown in card body.
   */
  showDescription?: boolean;
  /**
   * career path cards are displayed with a variant style / decorative element
   */
  showCareerPathVariant?: boolean;
  /**
   * displays inner content with a horizontal orientation
   */
  horizontalOrientation?: boolean;

  /**
   * custom minimum height for curriculum card in pixels
   */
  minHeight?: CardProps['minHeight'];
  /**
   * custom minimum width for curriculum card in pixels
   */
  minWidth?: CardProps['minWidth'];
};

const LineDecoration = styled(Box)`
  border-top: 1px solid
    ${({ inProgress }: { inProgress?: boolean }) =>
      inProgress ? theme.colors.navy : theme.colors['navy-200']};
`;

/**
 *
 * @deprecated  This component is deprecated
 *
 * Please use the CareerPathCard, SkillPathCard, or CourseCard instead
 */

export const CurriculumCard: React.FC<CurriculumCardProps> = ({
  beta,
  difficulty,
  description,
  headingLevel = 'h3',
  image,
  isFullSize = false,
  isStaticSize = false,
  progressState,
  scope,
  tag,
  tagColor,
  text,
  title,
  showCareerPathVariant,
  showAltSubtitle = false,
  footerTextVariant = 'enrolled',
  showDescription,
  difficultyVariant,
  horizontalOrientation,
  minHeight,
  minWidth,
  showProLogo: pro,
}) => {
  const boxVariant = progressState && cardStyles[progressState];

  const isCareerPathVariant =
    text.toLowerCase() === 'career path' && showCareerPathVariant;

  const minimumHeight = useMemo(() => {
    if (minHeight) return minHeight;
    return isStaticSize
      ? pxRem(285)
      : isFullSize
      ? pxRem(cardHeight * 2 + 32)
      : pxRem(cardHeight);
  }, [isFullSize, isStaticSize, minHeight]);

  const contentType = text === 'Course' && !pro ? 'Free Course' : text;
  return (
    <Card
      display="flex"
      flexDirection={{
        _: 'column',
        xs: horizontalOrientation ? 'row' : 'column',
      }}
      minHeight={minimumHeight}
      minWidth={minWidth}
      variant={boxVariant ?? 'white'}
      shadow="medium"
      position="relative"
    >
      <Box
        maxWidth={horizontalOrientation ? 418 : 'none'}
        pr={{ _: 0, xs: horizontalOrientation ? 40 : 0 }}
      >
        <Text
          display="flex"
          fontSize={14}
          mb={12}
          fontFamily="accent"
          textTransform="capitalize"
        >
          {contentType}
        </Text>
        <Text as={headingLevel} mb={4} fontSize={20}>
          {title}
        </Text>
        {!progressState && (
          <FlexBox flexWrap="wrap" alignItems="center">
            <Subtitle
              scope={scope}
              difficulty={difficulty}
              showAltSubtitle={showAltSubtitle}
              difficultyVariant={difficultyVariant}
            />
          </FlexBox>
        )}
        {isCareerPathVariant && (
          <LineDecoration inProgress={progressState === 'inProgress'} my={8} />
        )}
        {(isCareerPathVariant || showDescription) && (
          <Text pt={8} pb={16} fontSize={14}>
            {description}
          </Text>
        )}
      </Box>
      {isFullSize && image && (
        <FlexBox
          my="auto"
          ml="auto"
          mr={horizontalOrientation ? 0 : 'auto'}
          pt={16}
          pb={isCareerPathVariant ? 32 : 0}
          pr={{ _: 0, xs: horizontalOrientation ? 24 : 0 }}
        >
          <Image
            isSmall={isCareerPathVariant}
            image={image}
            progressState={progressState}
          />
        </FlexBox>
      )}
      <Footer
        beta={beta}
        progressState={progressState}
        tag={tag}
        tagColor={tagColor}
        footerTextVariant={footerTextVariant}
      />
    </Card>
  );
};
