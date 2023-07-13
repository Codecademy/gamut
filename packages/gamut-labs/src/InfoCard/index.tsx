import {
  Anchor,
  Box,
  Card,
  FlexBox,
  HeadingTags,
  Text,
} from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import { Theme } from '@emotion/react';
import * as React from 'react';

const cardMinWidth = 250;

export type TagColor = 'blue' | 'green' | 'pink';
const tagColorMap: Record<TagColor, keyof Theme['colors']> = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: 'palePink',
};

interface TextProps {
  text: string;
}

interface TitleProps {
  text: string;
  headingLevel: HeadingTags;
}

interface FooterProps {
  bottomLeftText?: string;
  bottomRightTagText?: string;
  bottomRightTagColor: TagColor;
}

interface BottomRightTagProps {
  text: string;
  color: TagColor;
}

const TopText: React.FC<TextProps> = ({ text }) => (
  <Text
    display="flex"
    fontSize={14}
    mb={12}
    fontFamily="accent"
    textTransform="capitalize"
  >
    {text}
  </Text>
);

const Title: React.FC<TitleProps> = ({ text, headingLevel }) => (
  <Text as={headingLevel} mb={4} fontSize={20}>
    <Text truncate="ellipsis" truncateLines={2}>
      {text}
    </Text>
  </Text>
);

const Subtitle: React.FC<TextProps> = ({ text }) => (
  <Text variant="p-small" textColor="gray-900">
    <Text truncate="ellipsis" truncateLines={2}>
      {text}
    </Text>
  </Text>
);

const Body: React.FC<TextProps> = ({ text }) => (
  <Text pt={16} variant="p-small" textColor="gray-900">
    <Text truncate="ellipsis" truncateLines={3}>
      {text}
    </Text>
  </Text>
);

const Footer: React.FC<FooterProps> = ({
  bottomLeftText,
  bottomRightTagText,
  bottomRightTagColor,
}) => (
  <FlexBox alignItems="flex-end" justifyContent="space-between">
    <Box>{bottomLeftText && <BottomLeftText text={bottomLeftText} />}</Box>
    <Box>
      {bottomRightTagText && (
        <BottomRightTag text={bottomRightTagText} color={bottomRightTagColor} />
      )}
    </Box>
  </FlexBox>
);

const BottomLeftText: React.FC<TextProps> = ({ text }) => (
  <Text
    maxWidth="calc(100%-16px)"
    px={16}
    variant="p-small"
    textColor="gray-900"
  >
    {text}
  </Text>
);

const BottomRightTag: React.FC<BottomRightTagProps> = ({ text, color }) => (
  <Box bg={tagColorMap[color]}>
    <Text py={4} p={12} variant="title-xs" fontSize={14} whiteSpace="nowrap">
      {text}
    </Text>
  </Box>
);

export interface InfoCardProps {
  href: string;
  onClick?: () => void;
  topText: string;
  title: string;
  subtitle: string;
  body?: string;
  bottomLeftText?: string;
  bottomRightTagText?: string;
  bottomRightTagColor?: TagColor;
  cardHeight?: string | number;
  titleHeadingLevel?: HeadingTags;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  href,
  onClick,
  topText,
  title,
  subtitle,
  body,
  bottomLeftText,
  bottomRightTagText,
  bottomRightTagColor = 'pink',
  cardHeight = 285,
  titleHeadingLevel = 'h3',
}) => {
  const displayFooter = bottomLeftText || bottomRightTagText;

  return (
    <Anchor variant="interface" href={href} onClick={() => onClick?.()}>
      <Card
        display="flex"
        flexDirection="column"
        height={pxRem(cardHeight)}
        justifyContent="space-between"
        minWidth={pxRem(cardMinWidth)}
        variant="white"
        shadow="medium"
        p={0}
        position="relative"
      >
        <Box pt={16} px={16}>
          <TopText text={topText} />
          <Title text={title} headingLevel={titleHeadingLevel} />
          <Subtitle text={subtitle} />
          {body && <Body text={body} />}
        </Box>
        {displayFooter && (
          <Footer
            bottomLeftText={bottomLeftText}
            bottomRightTagText={bottomRightTagText}
            bottomRightTagColor={bottomRightTagColor}
          />
        )}
      </Card>
    </Anchor>
  );
};
