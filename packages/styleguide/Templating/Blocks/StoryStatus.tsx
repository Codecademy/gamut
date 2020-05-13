import React from 'react';
import { styled } from '@storybook/theming';
import { colors } from '@codecademy/gamut-styles/utils/variables';

const Statuses = {
  ready: { message: 'Production Ready', color: colors.green[500] },
  inProgress: { message: 'Use with Caution (WIP)', color: colors.yellow[500] },
  deprecated: { message: 'Do not use (Deprecated)', color: colors.red[500] },
};

const StatusWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1.4rem;
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  grid-gap: 0.5rem;
  align-items: center;
`;

const StatusIndicator = styled.div<{ color: string }>`
  display: inline-block;
  position: relative;
  font-size: 1.2rem;
  font-weight: 400;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-top: 0.2rem;
  background-color: ${({ color }) => color};

  &:focus
  &:hover, {
    & + * {
      opacity: 1;
    }
  }
`;

const StatusMessage = styled.div`
  opacity: 0;
  transition: 0.25s opacity;
  font-size: 1rem;
`;

export const StoryStatus: React.FC<{ status: keyof typeof Statuses }> = ({
  status,
}) => {
  const { message, color } = Statuses[status];
  return (
    <StatusWrapper>
      Usage - <StatusIndicator color={color} />
      <StatusMessage>{message}</StatusMessage>
    </StatusWrapper>
  );
};
