import { Card, FlexBox, HeadingTags, Text } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import React, { ComponentProps } from 'react';

import { TagColor } from './BottomTag/index';
import { Footer } from './Footer/index';
import { Header } from './Header';
import { Image } from './Image/index';
import { Subtitle, SubtitleProps } from './Subtitle';

type ProgressState = 'inProgress' | 'completed';

const cardHeight = 180;

const cardStyles: Record<
  ProgressState,
  ComponentProps<typeof Card>['variant']
> = {
  inProgress: 'yellow',
  completed: 'navy',
};

type CurriculumCardProps = SubtitleProps & {
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

  return (
    <Card
      display="grid"
      gridTemplateRows="repeat(3, max-content) 1fr max-content"
      minHeight={isFullSize ? pxRem(cardHeight * 2 + 32) : pxRem(cardHeight)}
      variant={boxVariant ?? 'white'}
      shadow="medium"
      position="relative"
    >
      <Header
        invertColors={progressState === 'completed'}
        showProLogo={showProLogo}
        text={text}
      />
      <Text as={headingLevel} mb={4} fontSize={20}>
        {title}
      </Text>
      <div>
        {!progressState && (
          <Subtitle
            scope={scope}
            scopeCount={scopeCount}
            difficulty={difficulty}
          />
        )}
      </div>
      <FlexBox alignItems="center" justifyContent="center" paddingBottom={16}>
        {isFullSize && image && (
          <Image image={image} progressState={progressState} />
        )}
      </FlexBox>
      <Footer progressState={progressState} tag={tag} tagColor={tagColor} />
    </Card>
  );
};
