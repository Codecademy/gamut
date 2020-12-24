import React from 'react';
import { styled } from '@storybook/theming';
import {
  colors,
  fontMonospace,
  fontBase,
  fontSmoothing,
} from '@codecademy/gamut-styles';

const Badge = styled.div`
  display: inline-block;
  align-items: center;
  padding: 0.15rem 0.75rem 0;
  line-height: 2;
  font-size: 0.8rem;
  font-weight: 900;
  line-height: 1.75;
  border-radius: 0.75rem;
  text-transform: uppercase;
  font-family: ${fontBase};
  color: ${colors.white};
  background-color: ${({ color }) => color};
  ${fontSmoothing()}
`;

const STATUS_COLORS = {
  stable: colors.green,
  volatile: colors.yellow,
  deprecated: colors.red,
};

export const StatusBadge: React.FC<{ status: keyof typeof STATUS_COLORS }> = ({
  status,
}) => <Badge color={STATUS_COLORS[status]}>{status}</Badge>;

const SOURCES = {
  gamut: colors.hyper,
  'gamut-labs': colors.orange,
  'gamut-system': colors.blue,
  'gamut-styles': colors.palePink,
};

export const SourceBadge: React.FC<{ source: keyof typeof SOURCES }> = ({
  source,
}) => <Badge color={SOURCES[source]}>{source}</Badge>;
