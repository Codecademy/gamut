import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { forwardRef, MouseEvent, MutableRefObject } from 'react';

import { FlexBox } from '../Box';
import { Text } from '../Typography';
import {
  BackgroundBar,
  BarWrapper,
  ForegroundBar,
  minBarWidth,
} from './Bar/elements';
import { useBarChartContext } from './BarChartProvider';
import { BarProps } from './types';
import { calculateBarWidth, getValuesSummary } from './utils';

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
  index?: number;
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

    const animationDelay = animate ? index * 0.1 : 0;

    const rowContent = (
      <>
        <FlexBox
          alignItems="center"
          color={styleConfig.textColor}
          flexShrink={0}
          gap={8}
          minWidth="200px"
        >
          {Icon && <Icon size={16} />}
          <Text fontWeight='bold' truncate="ellipsis" truncateLines={1}>
            {yLabel}
          </Text>
        </FlexBox>

        <BarWrapper>
          <BackgroundBar
            animate={animate ? { width: bgWidthStr } : undefined}
            bg={styleConfig.backgroundBarColor}
            data-testid="background-bar"
            initial={animate ? { width: '0%' } : undefined}
            transition={{ duration: 0.5, delay: animationDelay }}
            width={!animate ? bgWidthStr : undefined}
          />
          {isStacked && (
            <ForegroundBar
              animate={animate ? { width: fgWidthStr } : undefined}
              bg={styleConfig.foregroundBarColor}
              data-testid="foreground-bar"
              initial={animate ? { width: '0%' } : undefined}
              transition={{ duration: 0.5, delay: animationDelay + 0.25 }}
              width={!animate ? fgWidthStr : undefined}
            />
          )}
        </BarWrapper>

        <FlexBox
          alignItems="center"
          flexShrink={0}
          justifyContent="flex-end"
          minWidth={{ _: 40, sm: 60 }}
        >
          <Text color={styleConfig.textColor} variant="p-small">
            {displayValue.toLocaleString()}
            {unit && ` ${unit}`}
          </Text>
        </FlexBox>
      </>
    );

    if (href) {
      return (
        <li>
          <RowAnchor
            aria-label={valuesSummary}
            href={href}
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
            aria-label={valuesSummary}
            ref={ref as MutableRefObject<HTMLButtonElement>}
            type="button"
            onClick={onClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick(e as unknown as MouseEvent<HTMLButtonElement>);
              }
            }}
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
