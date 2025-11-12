import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';
import { useBarChartContext } from './BarChartContext';
import { RowBase } from './RowBase';
import { BarProps } from './types';
import { formatNumberUS, getPercentagesFilled, getValuesSummary } from './utils';

// Minimum bar width in percentage to ensure visibility
const minBarWidth = 8;

const StyledListItem = styled('li')(
  css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
  })
);

const RowContent = styled(Box)(
  css({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    py: 12,
    px: 16,
    borderRadius: 'sm',
    transition: 'background-color 0.2s',
    '&:hover': {
      bg: 'background-hover',
    },
    '&:focus-visible': {
      outline: `2px solid`,
      outlineColor: 'primary',
      outlineOffset: 2,
    },
  })
);

const BarContainer = styled(Box)(
  css({
    position: 'relative',
    height: { _: '8px', sm: '18px' },
    borderRadius: { _: 'md', sm: 'xl' },
    overflow: 'hidden',
    flexGrow: 1,
    minWidth: 0,
  })
);

const BackgroundBar = styled(Box)(
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 'inherit',
    border: 1,
    borderColor: 'border-primary',
    transition: 'width 0.5s ease-out',
    transitionDelay: '0.1s',
  })
);

const ForegroundBar = styled(Box)(
  css({
    position: 'absolute',
    top: 1,
    left: 0,
    height: 'calc(100% - 2px)',
    borderRadius: 'inherit',
    transition: 'width 0.5s ease-out',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: 'border-primary',
  })
);

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
    <StyledListItem>
      <RowBase
        onClick={onClick}
        href={href}
        aria-label={valuesSummary}
        role={hasInteraction ? undefined : 'listitem'}
        tabIndex={hasInteraction ? 0 : undefined}
      >
        <RowContent>
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
            <BackgroundBar
              bg={backgroundColor}
              width={animate ? backgroundWidth : backgroundWidth}
            />
            {endingValue !== undefined && (
              <ForegroundBar
                bg={foregroundColor}
                width={animate ? foregroundWidth : foregroundWidth}
              />
            )}
          </BarContainer>
        </RowContent>
      </RowBase>
    </StyledListItem>
  );
};

