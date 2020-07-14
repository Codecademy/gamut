import React from 'react';
import { styled } from '@storybook/theming';
import { colors } from '@codecademy/gamut-styles/utils/variables';

const STATUS_COLORS = {
  stable: colors.green[800],
  volatile: colors.yellow[700],
  deprecated: colors.red[700],
};

const StatusWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 0.75rem;
  height: 1.75rem;
  margin: 1rem 0;
  font-size: 0.8rem;
  font-weight: 900;
  border-radius: 1rem;
  text-transform: uppercase;
  color: ${colors.white};
  background-color: ${({ color }) => color};
`;

export const StoryStatus: React.FC<{ status: keyof typeof STATUS_COLORS }> = ({
  status,
}) => {
  return <StatusWrapper color={STATUS_COLORS[status]}>{status}</StatusWrapper>;
};
