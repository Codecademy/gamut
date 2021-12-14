import { pxRem } from '@codecademy/gamut-styles';
import React from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { Card } from '../Card';
import { Truncate } from '../Truncate';
import { Text } from '../Typography';

const cardHeight = 285;
const cardMinWidth = 250;

export type InfoCardProps = {
  href: string;
  onClick?: () => void;
  topText: string;
  title: string;
  subtitle: string;
  body: string;
  bottomLeftText?: string;
  bottomRightTagText?: string;
  bottomRightTagColor?: TagColor;
};

export type TagColor = 'blue' | 'green' | 'pink';
const tagColorMap = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: 'palePink',
} as const;

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
}) => {
  const renderTopText = (text: string) => (
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

  const renderTitle = (text: string) => (
    <Text as="h3" mb={4} fontSize={20}>
      <Truncate lines={2}>{text}</Truncate>
    </Text>
  );

  const renderSubtitle = (text: string) => (
    <Text variant="p-small" textColor="gray-900">
      <Truncate lines={2}>{text}</Truncate>
    </Text>
  );

  const renderBody = (text: string) => (
    <Text pt={16} variant="p-small" textColor="gray-900">
      <Truncate lines={3}>{text}</Truncate>
    </Text>
  );

  const renderBottomLeftText = (text: string) => (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      maxWidth={bottomRightTagText ? '50%' : '100%'}
    >
      <Text pl={16} variant="p-small" textColor="gray-900">
        {text}
      </Text>
    </Box>
  );

  const renderBottomRightTag = (text: string) => (
    <Box
      position="absolute"
      bottom={0}
      right={0}
      bg={tagColorMap[bottomRightTagColor]}
    >
      <Text py={4} p={12} variant="title-xs" fontSize={14}>
        {text}
      </Text>
    </Box>
  );

  return (
    <Anchor variant="interface" href={href} onClick={() => onClick?.()}>
      <Card
        display="grid"
        gridTemplateRows="repeat(3, max-content) 1fr max-content"
        height={pxRem(cardHeight)}
        minWidth={pxRem(cardMinWidth)}
        variant="white"
        shadow="medium"
        position="relative"
      >
        {renderTopText(topText)}
        {renderTitle(title)}
        {renderSubtitle(subtitle)}
        {renderBody(body)}
        {bottomLeftText && renderBottomLeftText(bottomLeftText)}
        {bottomRightTagText && renderBottomRightTag(bottomRightTagText)}
      </Card>
    </Anchor>
  );
};
