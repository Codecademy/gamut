import {
  Box,
  FlexBox,
  Text,
  TextButton,
  TextButtonProps,
} from '@codecademy/gamut';
import React from 'react';

type SectionButton = TextButtonProps & {
  text: string;
};

export type PageSectionProps = {
  title: string;
  headerButton?: SectionButton;
  headerSecondaryButton?: SectionButton;
  footerButton?: SectionButton;
};

export const PageSection: React.FC<PageSectionProps> = ({
  title,
  headerButton,
  headerSecondaryButton,
  footerButton,
  children,
}) => {
  const renderSectionButton = (button: SectionButton) => {
    const { text, ...textButtonProps } = button;
    return <TextButton {...textButtonProps}>{text}</TextButton>;
  };

  const maybeRenderHeaderButton = () => {
    if (!headerButton) return null;
    renderSectionButton(headerButton);
  };

  const maybeRenderHeaderSecondaryButton = () => {
    if (!headerSecondaryButton) return null;
    renderSectionButton(headerSecondaryButton);
  };

  const maybeRenderFooter = () => {
    if (!footerButton) return null;
    return <Box>{renderSectionButton(footerButton)}</Box>;
  };

  return (
    <FlexBox flexDirection="column">
      <Box paddingBottom={4}>
        <Text as="h5" paddingBottom={4}>
          {' '}
          {title}{' '}
        </Text>
        {maybeRenderHeaderButton()}
        {maybeRenderHeaderSecondaryButton()}
      </Box>
      {children}
      {maybeRenderFooter()}
    </FlexBox>
  );
};
