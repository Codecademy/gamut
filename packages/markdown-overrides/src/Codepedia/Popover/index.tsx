import React, { RefObject } from 'react';
import styled from '@emotion/styled';
import { Markdown as MarkdownBase, Box, TextButton } from '@codecademy/gamut';
import { Loading, Popover } from '@codecademy/gamut-labs';
import { CloseIcon } from '@codecademy/gamut-icons';
import { ManyOverrideSettings } from '@codecademy/gamut/dist/Markdown/libs/overrides';
import { colors } from '@codecademy/gamut-styles';

export type LinkProperties = {
  label?: string;
  onViewClick?: () => void;
  onLoad?: () => Promise<string>;
  href?: string;
};

export type CodepediaPopoverProps = {
  content: string;
  targetRef: RefObject<any>;
  isOpen: boolean;
  onClose: () => void;
  overrides?: ManyOverrideSettings;
  linkProperties: LinkProperties;
};

export const CodepediaPopover: React.FC<CodepediaPopoverProps> = ({
  targetRef,
  isOpen,
  onClose,
  content,
  overrides,
  linkProperties,
}) => {
  const buttonLabel = linkProperties.label || 'View on Codepedia';

  return (
    <SPopover
      isOpen={isOpen}
      targetRef={targetRef}
      verticalOffset={3}
      horizontalOffset={0}
      align="right"
    >
      <Box
        borderColor="navy"
        backgroundColor="paleGreen"
        borderStyle="solid"
        borderWidth="1px"
        borderRadius="4px"
      >
        <SContainer>
          <TopBar>
            {linkProperties.onViewClick ? (
              <NeutralTextButton onClick={linkProperties.onViewClick}>
                {buttonLabel}
              </NeutralTextButton>
            ) : (
              <NeutralTextButton href={linkProperties.href} target="_blank">
                {buttonLabel}
              </NeutralTextButton>
            )}

            <NeutralTextButton onClick={() => onClose()}>
              <CloseIcon />
            </NeutralTextButton>
          </TopBar>

          {content ? (
            <MiniMarkdown overrides={overrides} text={content} />
          ) : (
            <Loading />
          )}
        </SContainer>
      </Box>
    </SPopover>
  );
};

const SPopover = styled(Popover)`
  box-shadow: -6px 6px 0 0 ${colors.navy}FF;
`;

const SContainer = styled.div`
  max-width: 25vw;
  max-height: 21rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors['gray-200']};
  padding: 0.3rem;
`;

const NeutralTextButton = styled(TextButton)`
  color: ${colors.navy} !important;
  span {
    color: ${colors.navy} !important;
  }
  :hover span {
    background-color: ${colors.lightGreen}33 !important;
  }
  :focus {
    box-shadow: none;
  }
  :focus-visible {
    box-shadow: ${colors.lightGreen} 0 0 0 2px;
  }
`;

const MiniMarkdown = styled(MarkdownBase)`
  margin: 0;
  padding: 0 1.25rem;
  overflow-y: auto;

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }
`;
