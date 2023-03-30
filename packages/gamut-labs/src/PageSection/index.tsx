import {
  Box,
  FlexBox,
  Text,
  TextButton,
  WithChildrenProp,
} from '@codecademy/gamut';
import { AriaAttributes, ReactNode } from 'react';
import * as React from 'react';

type TextButtonMinimumProps = AriaAttributes & {
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

export interface PageSectionProps extends WithChildrenProp {
  title: string;
  headerButton?: SectionButton;
  headerSecondaryButton?: SectionButton;
  footerButton?: SectionButton;
}

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
      <Box ml={4} display="inline">
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
    <FlexBox height="2.5rem" mb={8} justifyContent="space-between">
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
      <FlexBox justifyContent="flex-end" mt={16}>
        {renderSectionButton(footerButton)}
      </FlexBox>
    );
  };

  return (
    <FlexBox flexDirection="column" mb={48}>
      {renderSectionHeader()}
      {children}
      {maybeRenderSectionFooter()}
    </FlexBox>
  );
};
