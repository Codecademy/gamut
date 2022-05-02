import { Card, FlexBox, HeadingTags, Text } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import React from 'react';

import { TagColor } from './BottomTag/index';
import { Footer } from './Footer/index';
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
};

// const LineDecoration = styled(Box)`
//   border-top: 1px solid
//     ${({ inProgress }: { inProgress?: boolean }) =>
//       inProgress ? theme.colors.navy : theme.colors['navy-200']};
// `;

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
  showProLogo,
  tag,
  tagColor,
  text,
  title,
  showCareerPathVariant,
  showAltSubtitle = false,
  footerTextVariant = 'enrolled',
  showDescription,
  difficultyVariant,
}) => {
  const boxVariant = progressState && cardStyles[progressState];
  // const mode = progressState === 'completed' ? 'dark' : 'light';

  // const isCareerPathVariant =
  //   text.toLowerCase() === 'career path' && showCareerPathVariant;

  return (
    <Card
      display="flex"
      flexDirection="column"
      minHeight={
        isStaticSize
          ? pxRem(285)
          : isFullSize
          ? pxRem(cardHeight * 2 + 32)
          : pxRem(cardHeight)
      }
      variant={boxVariant ?? 'white'}
      shadow="medium"
      position="relative"
    >
      <Text
        display="flex"
        fontSize={14}
        mb={12}
        fontFamily="accent"
        textTransform="capitalize"
      >
        {text}
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
