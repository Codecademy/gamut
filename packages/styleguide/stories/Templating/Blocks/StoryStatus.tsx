import React from 'react';
import { styled } from '@storybook/theming';

const StatusWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1.4rem;
`;

const StatusMessage = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const Statuses = {
  ready: { message: 'Production Ready', icon: '✅' },
  inProgress: { message: 'Not Production Ready', icon: '❌' },
  deprecated: { message: 'Deprecated, do not use', icon: '💀' },
};

export const StoryStatus: React.FC<{ status: keyof typeof Statuses }> = ({
  status,
}) => {
  const { message, icon } = Statuses[status];
  return (
    <StatusWrapper>
      Usage Status:{' '}
      <StatusMessage>
        {icon} - {message}
      </StatusMessage>
    </StatusWrapper>
  );
};
