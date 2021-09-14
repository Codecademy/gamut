import { Card, FlexBox, HeadingTags, ProLabel, Text } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import React from 'react';

import { TagColor } from './BottomTag/index';
import { Footer } from './Footer/index';
import { Image } from './Image/index';
import { Subtitle, SubtitleProps } from './Subtitle';

export type ProgressState = 'inProgress' | 'completed';

const cardHeight = 180;

const cardStyles = {
  inProgress: 'yellow',
  completed: 'navy',
} as const;

export type CurriculumCardProps = SubtitleProps & {
  beta?: boolean;
  text: string;
  title: string;
  headingLevel?: HeadingTags;
  image?: string;
  isFullSize?: boolean;
  progressState?: ProgressState;
  showProLogo?: boolean;
  tag?: string;
  tagColor?: TagColor;
};

export const CurriculumCard: React.FC<CurriculumCardProps> = ({
  beta,
  difficulty,
  headingLevel = 'h3',
  image,
  isFullSize = false,
  progressState,
  scope,
  scopeCount,
  showProLogo,
  tag,
  tagColor,
  text,
  title,
}) => {
  const boxVariant = progressState && cardStyles[progressState];
  const mode = progressState === 'completed' ? 'dark' : 'light';

  return (
    <Card
      display="grid"
      gridTemplateRows="repeat(3, max-content) 1fr max-content"
      minHeight={isFullSize ? pxRem(cardHeight * 2 + 32) : pxRem(cardHeight)}
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
      <FlexBox flexWrap="wrap">
        {!progressState && (
          <Subtitle
            scope={scope}
            scopeCount={scopeCount}
            difficulty={difficulty}
          />
        )}
      </FlexBox>
      <FlexBox center pb={16}>
        {isFullSize && image && (
          <Image image={image} progressState={progressState} />
        )}
      </FlexBox>
      <Footer
        beta={beta}
        progressState={progressState}
        tag={tag}
        tagColor={tagColor}
      />
    </Card>
  );
};
