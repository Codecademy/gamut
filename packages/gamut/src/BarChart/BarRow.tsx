import * as React from 'react';

import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';
import { useBarChartContext } from './BarChartContext';
import {
  BarContainer,
  BarElement,
  minBarWidth,
  RowWrapper,
} from './elements';
import { RowBase } from './RowBase';
import { BarProps } from './types';
import { formatNumberUS, getPercentagesFilled, getValuesSummary } from './shared';

export const BarRow: React.FC<BarProps> = ({
  yLabel,
  startingValue,
  endingValue,
  icon: Icon,
  onClick,
  href,
}) => {
  const { styleConfig, minRange, maxRange, unit } = useBarChartContext();

  const { foregroundPercent, backgroundPercent } = getPercentagesFilled({
    startingValue,
    endingValue,
    minRange,
    maxRange,
  });

  const valuesSummary = getValuesSummary({
    yLabel,
    startingValue,
    endingValue,
    unit,
  });

  const hasInteraction = Boolean(onClick || href);

  // Calculate bar widths with minimum width
  const foregroundWidth = `${Math.max(minBarWidth, foregroundPercent)}%`;
  const backgroundWidth = `${Math.max(minBarWidth, backgroundPercent)}%`;

  // Determine the display value (use endingValue if available, otherwise startingValue)
  const displayValue = endingValue ?? startingValue;

  const textColor = styleConfig.textColor ?? 'navy-800';
  const foregroundColor = styleConfig.foregroundBarColor ?? 'yellow';
  const backgroundColor = styleConfig.backgroundBarColor ?? 'paleBlue';

  // Determine if this is a stacked bar (has both starting and ending values)
  const isStacked = endingValue !== undefined && endingValue !== startingValue;
  
  const valueDisplay = isStacked
    ? `${formatNumberUS(startingValue)} ${unit} → ${formatNumberUS(endingValue)} ${unit}`
    : `${formatNumberUS(displayValue)} ${unit}`;

  return (
    <Box as="li" listStyleType="none" m={0} p={0}>
      <RowBase
        aria-label={valuesSummary}
        href={href}
        onClick={onClick}
        role={hasInteraction ? undefined : 'listitem'}
        tabIndex={hasInteraction ? 0 : undefined}
      >
        <RowWrapper
          alignItems="center"
          display="flex"
          gap={16}
          interactive={hasInteraction}
          px={16}
          py={12}
        >
          {Icon && (
            <FlexBox alignItems="center" flexShrink={0}>
              <Icon size={24} />
            </FlexBox>
          )}
          <FlexBox
            flexDirection="column"
            flexShrink={0}
            gap={4}
            minWidth={0}
            width={{ _: '140px', sm: '180px' }}
          >
            <Text
              color={textColor}
              fontSize={16}
              fontWeight="title"
              truncate="ellipsis"
            >
              {yLabel}
            </Text>
            <Text color="navy-600" fontSize={14}>
              {valueDisplay}
            </Text>
          </FlexBox>
          <BarContainer>
            <BarElement
              barType="background"
              bg={backgroundColor}
              width={backgroundWidth}
            />
            {isStacked && (
              <BarElement
                barType="foreground"
                bg={foregroundColor}
                width={foregroundWidth}
              />
            )}
          </BarContainer>
        </RowWrapper>
      </RowBase>
    </Box>
  );
};
