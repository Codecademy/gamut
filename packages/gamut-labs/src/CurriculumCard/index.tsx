import {
  Box,
  Card,
  FlexBox,
  HeadingTags,
  ProLabel,
  Text,
} from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

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
   * career path cards are displayed with a variant style / decorative element
   */
  showCareerPathVariant?: boolean;
};

const LineDecoration = styled(Box)`
  border-top: 1px solid #dbdce0;
`;

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
}) => {
  const boxVariant = progressState && cardStyles[progressState];
  const mode = progressState === 'completed' ? 'dark' : 'light';

  const isCareerPathVariant =
    text === 'Career Path' && showCareerPathVariant && !progressState;

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
        {showProLogo && <ProLabel alignSelf="center" mr={8} mode={mode} />}
        {text}
      </Text>
      <Text as={headingLevel} mb={4} fontSize={20}>
        {title}
      </Text>
      <FlexBox flexWrap="wrap" alignItems="center">
        {!progressState && (
          <Subtitle
            scope={scope}
            difficulty={difficulty}
            showAltSubtitle={showAltSubtitle}
          />
        )}
      </FlexBox>
      {!progressState && isCareerPathVariant && <LineDecoration my={8} />}
      {description && (
        <Text pt={8} pb={16} fontSize={14}>
          {description}
        </Text>
      )}
      <FlexBox m="auto" center pt={16} pb={isCareerPathVariant ? 32 : 0}>
        {isFullSize && image && (
          <Image
            small={isCareerPathVariant}
            image={image}
            progressState={progressState}
          />
        )}
      </FlexBox>
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
