import { Box, FlexBox, Text, TextButton } from '@codecademy/gamut';
import React from 'react';

type SectionButton = {
  text: string;
  href?: string;
  onClick?: () => void;
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
  const maybeRenderHeaderButton = () => {
    if (!headerButton) return null;
    const { text, ...buttonProps } = headerButton;
    return (
      <Box marginLeft={4} display="inline">
        <TextButton {...buttonProps}>{text}</TextButton>
      </Box>
    );
  };

  const maybeRenderHeaderSecondaryButton = () => {
    if (!headerSecondaryButton) return null;
    const { text, ...buttonProps } = headerSecondaryButton;
    return <TextButton {...buttonProps}>{text}</TextButton>;
  };

  const renderSectionHeader = () => (
    <FlexBox height="2.5rem" marginBottom={8} justifyContent="space-between">
      <FlexBox alignItems="center">
        <Text as="h2" fontSize={22}>
          {title}
        </Text>
        {maybeRenderHeaderButton()}
      </FlexBox>
      {maybeRenderHeaderSecondaryButton()}
    </FlexBox>
  );

  const maybeRenderSectionFooter = () => {
    if (!footerButton) return null;
    const { text, ...buttonProps } = footerButton;
    return (
      <FlexBox justifyContent="flex-end">
        <TextButton {...buttonProps}>{text}</TextButton>
      </FlexBox>
    );
  };

  return (
    <FlexBox flexDirection="column">
      {renderSectionHeader()}
      {children}
      {maybeRenderSectionFooter()}
    </FlexBox>
  );
};
