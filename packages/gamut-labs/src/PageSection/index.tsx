import { Box, FlexBox, Text, TextButton } from '@codecademy/gamut';
import React, { ReactNode } from 'react';

type TextButtonMinimumProps = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export type SectionButton = TextButtonMinimumProps | ReactNode;

function isSectionButtonATextButton(
  button: SectionButton
): button is TextButtonMinimumProps {
  return (button as TextButtonMinimumProps).text !== undefined;
}

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
  const renderSectionButton = (sectionButton: SectionButton) => {
    if (!isSectionButtonATextButton(sectionButton)) return sectionButton;

    const { text, ...buttonProps } = sectionButton;
    return <TextButton {...buttonProps}>{text}</TextButton>;
  };

  const maybeRenderHeaderButton = () => {
    if (!headerButton) return null;
    return (
      <Box marginLeft={4} display="inline">
        {renderSectionButton(headerButton)}
      </Box>
    );
  };

  const maybeRenderHeaderSecondaryButton = () => {
    if (!headerSecondaryButton) return null;
    return renderSectionButton(headerSecondaryButton);
  };

  const renderSectionHeader = () => (
    // Setting height directly to height of the buttons so if they are omitted
    // the header remains the same height.
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
    return (
      <FlexBox justifyContent="flex-end" marginTop={16}>
        {renderSectionButton(footerButton)}
      </FlexBox>
    );
  };

  return (
    <FlexBox flexDirection="column" marginBottom={48}>
      {renderSectionHeader()}
      {children}
      {maybeRenderSectionFooter()}
    </FlexBox>
  );
};
