import styled from '@emotion/styled';
import React from 'react';

const HeaderTab = styled.div`
  margin: 0 0.5rem;
`;

export type HeaderTabProps = {
  className?: string;
};

export const AppHeaderTab: React.FC<HeaderTabProps> = ({
  children,
  className,
}) => {
  return <HeaderTab className={className}>{children}</HeaderTab>;
};
