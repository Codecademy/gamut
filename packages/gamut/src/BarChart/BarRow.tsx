import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { forwardRef, MouseEvent, MutableRefObject } from 'react';

import { FlexBox } from '../Box';
import { Text } from '../Typography';
import { useBarChartContext } from './BarChartProvider';
import { BarProps } from './types';
import { calculateBarWidth } from './utils';
import {
  BackgroundBar,
  BarWrapper,
  ForegroundBar,
  minBarWidth,
} from './Bar/elements';

// Polymorphic row wrapper styles
const rowBaseStyles = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 16,
  py: 8,
  px: 0,
  bg: 'transparent',
  border: 'none',
  textDecoration: 'none',
  cursor: 'inherit',
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary',
    outlineOffset: '2px',
  },
});

const interactiveStyles = css({
  cursor: 'pointer',
  '&:hover': {
    bg: 'background-hover',
  },
});

const RowWrapper = styled('div', styledOptions<'div'>())(rowBaseStyles);
const RowButton = styled('button', styledOptions<'button'>())(
  rowBaseStyles,
  interactiveStyles
);
const RowAnchor = styled('a', styledOptions<'a'>())(
  rowBaseStyles,
  interactiveStyles
);

export interface BarRowProps extends BarProps {
  /** Index for animation staggering */
  index?: number;
}

/**
 * Generates an accessible summary of the bar values
 */
function getValuesSummary({
  yLabel,
  seriesOneValue,
  seriesTwoValue,
  unit,
}: {
  yLabel: string;
  seriesOneValue: number;
  seriesTwoValue?: number;
  unit: string;
}): string {
  if (seriesTwoValue !== undefined) {
    const gained = seriesOneValue;
    return `${gained} ${unit} gained - now at ${seriesTwoValue} ${unit} in ${yLabel} category`;
  }
  return `${seriesOneValue} ${unit} in ${yLabel} category`;
}

export const BarRow = forwardRef<
  HTMLDivElement | HTMLButtonElement | HTMLAnchorElement,
  BarRowProps
>(
  (
    {
      yLabel,
      seriesOneValue,
      seriesTwoValue,
      icon: Icon,
      onClick,
      href,
      index = 0,
    },
    ref
  ) => {
    const { maxRange, unit, styleConfig, animate } = useBarChartContext();

    const isStacked = seriesTwoValue !== undefined;
    const displayValue = isStacked ? seriesTwoValue : seriesOneValue;

    // Calculate bar widths as percentages
    const backgroundBarWidth = calculateBarWidth({
      value: displayValue,
      maxRange,
    });

    const foregroundBarWidth = isStacked
      ? calculateBarWidth({
          value: seriesOneValue,
          maxRange,
        })
      : 0;

    const bgWidthStr = `${Math.max(minBarWidth, backgroundBarWidth)}%`;
    const fgWidthStr = `${Math.max(minBarWidth, foregroundBarWidth)}%`;

    const valuesSummary = getValuesSummary({
      yLabel,
      seriesOneValue,
      seriesTwoValue,
      unit,
    });

    // Animation delay for staggered bar entrance
    const animationDelay = animate ? index * 0.1 : 0;

    const rowContent = (
      <>
        {/* Y-axis label with optional icon */}
        <FlexBox
          alignItems="center"
          gap={8}
          minWidth={{ _: 80, sm: 120 }}
          flexShrink={0}
        >
          {Icon && <Icon size={16} color={styleConfig.textColor} />}
          <Text
            variant="p-small"
            color={styleConfig.textColor}
            truncate="ellipsis"
            truncateLines={1}
          >
            {yLabel}
          </Text>
        </FlexBox>

        {/* Bar container */}
        <FlexBox flex={1} alignItems="center" position="relative">
          <BarWrapper>
            {/* Background bar (total value in stacked, or single value in non-stacked) */}
            <BackgroundBar
              bg={styleConfig.backgroundBarColor}
              initial={animate ? { width: '0%' } : undefined}
              animate={animate ? { width: bgWidthStr } : undefined}
              style={!animate ? { width: bgWidthStr } : undefined}
              transition={{ duration: 0.5, delay: animationDelay }}
              data-testid="background-bar"
            />

            {/* Foreground bar (progress value in stacked mode only) */}
            {isStacked && (
              <ForegroundBar
                bg={styleConfig.foregroundBarColor}
                initial={animate ? { width: '0%' } : undefined}
                animate={animate ? { width: fgWidthStr } : undefined}
                style={!animate ? { width: fgWidthStr } : undefined}
                transition={{ duration: 0.5, delay: animationDelay + 0.25 }}
                data-testid="foreground-bar"
              />
            )}
          </BarWrapper>
        </FlexBox>

        {/* Value display */}
        <FlexBox
          alignItems="center"
          justifyContent="flex-end"
          minWidth={{ _: 40, sm: 60 }}
          flexShrink={0}
        >
          <Text variant="p-small" color={styleConfig.textColor}>
            {displayValue.toLocaleString()}
            {unit && ` ${unit}`}
          </Text>
        </FlexBox>
      </>
    );

    // Polymorphic rendering based on interactivity
    if (href) {
      return (
        <li>
          <RowAnchor
            href={href}
            aria-label={valuesSummary}
            ref={ref as MutableRefObject<HTMLAnchorElement>}
          >
            {rowContent}
          </RowAnchor>
        </li>
      );
    }

    if (onClick) {
      return (
        <li>
          <RowButton
            type="button"
            onClick={onClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick(e as unknown as MouseEvent<HTMLButtonElement>);
              }
            }}
            aria-label={valuesSummary}
            ref={ref as MutableRefObject<HTMLButtonElement>}
          >
            {rowContent}
          </RowButton>
        </li>
      );
    }

    return (
      <li>
        <RowWrapper
          aria-label={valuesSummary}
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          {rowContent}
        </RowWrapper>
      </li>
    );
  }
);

BarRow.displayName = 'BarRow';
