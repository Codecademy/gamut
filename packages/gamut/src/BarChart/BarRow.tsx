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
import { formatNumberUS, getPercentagesFilled, getValuesSummary } from './utils';

export const BarRow: React.FC<BarProps> = ({
  yLabel,
  startingValue,
  endingValue,
  icon: Icon,
  onClick,
  href,
}) => {
  const { styleConfig, minRange, maxRange, unit, animate } =
    useBarChartContext();

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

  const textColor = styleConfig.textColor ?? 'text';
  const foregroundColor = styleConfig.foregroundBarColor ?? 'text';
  const backgroundColor = styleConfig.backgroundBarColor ?? 'primary';

  return (
    <Box as="li" listStyleType="none" m={0} p={0}>
      <RowBase
        onClick={onClick}
        href={href}
        aria-label={valuesSummary}
        role={hasInteraction ? undefined : 'listitem'}
        tabIndex={hasInteraction ? 0 : undefined}
      >
        <RowWrapper
          display="flex"
          alignItems="center"
          gap={16}
          py={12}
          px={16}
          borderRadius="sm"
          interactive={hasInteraction}
        >
          {Icon && (
            <FlexBox alignItems="center" flexShrink={0}>
              <Icon size={24} />
            </FlexBox>
          )}
          <FlexBox
            flexDirection="column"
            gap={4}
            minWidth={0}
            width={{ _: '120px', sm: '150px' }}
            flexShrink={0}
          >
            <Text
              fontSize={14}
              fontWeight="bold"
              color={textColor}
              truncate="ellipsis"
            >
              {yLabel}
            </Text>
            <Text fontSize={12} color={textColor}>
              {`${formatNumberUS(displayValue)} ${unit}`}
            </Text>
          </FlexBox>
          <BarContainer>
            <BarElement
              barType="background"
              bg={backgroundColor}
              width={animate ? backgroundWidth : backgroundWidth}
            />
            {endingValue !== undefined && (
              <BarElement
                barType="foreground"
                bg={foregroundColor}
                width={animate ? foregroundWidth : foregroundWidth}
              />
            )}
          </BarContainer>
        </RowWrapper>
      </RowBase>
    </Box>
  );
};
