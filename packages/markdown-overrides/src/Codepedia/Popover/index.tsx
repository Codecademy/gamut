import { Box, Container } from '@codecademy/gamut';
// eslint-disable-next-line local-rules/gamut-import-paths
import { ManyOverrideSettings } from '@codecademy/gamut/dist/Markdown/libs/overrides';
import { CloseIcon } from '@codecademy/gamut-icons';
import { Loading, Popover, PopoverProps } from '@codecademy/gamut-labs';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { RefObject } from 'react';

import { MiniMarkdown } from '../MiniMarkdown';
import { NeutralTextButton } from '../NeutralTextButton';

export type LinkProperties = {
  label?: string;
  onViewClick?: () => void;
  onLoad?: () => Promise<string>;
  href?: string;
};

export type CodepediaPopoverProps = Omit<
  PopoverProps,
  'isOpen' | 'targetRef' | 'children'
> & {
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
  verticalOffset,
  horizontalOffset,
  align,
  position,
  ...popoverProps
}) => {
  const buttonLabel = linkProperties.label || 'View on Codepedia';

  return (
    <StyledPopover
      isOpen={isOpen}
      targetRef={targetRef}
      verticalOffset={verticalOffset ?? 3}
      horizontalOffset={horizontalOffset ?? 0}
      align={align ?? 'right'}
      position={position ?? 'below'}
      {...popoverProps}
    >
      <Box
        borderColor="navy"
        backgroundColor="paleGreen"
        borderStyle="solid"
        borderWidth="1px"
        borderRadius="4px"
      >
        <PopoverContent column>
          <TopBar justify="spaceBetween">
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
        </PopoverContent>
      </Box>
    </StyledPopover>
  );
};

const StyledPopover = styled(Popover)`
  box-shadow: -6px 6px 0 0 ${colors.navy}FF;
`;

const PopoverContent = styled(Container)`
  max-width: 25vw;
  max-height: 21rem;
  padding-bottom: 0.5rem;
`;

const TopBar = styled(Container)`
  width: 100%;
  border-bottom: 1px solid ${colors['gray-200']};
  padding: 0.3rem;
`;
