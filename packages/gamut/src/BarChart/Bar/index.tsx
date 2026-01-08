import { MiniArrowRightIcon } from '@codecademy/gamut-icons';
import { forwardRef, MouseEvent, MutableRefObject, useRef } from 'react';

import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import {
  iconPadding,
  iconWidth,
  minBarWidth,
  rightSpacerWidth,
} from '../shared/styles';
import { BarProps } from '../shared/types';
import {
  calculateBarWidth,
  getValuesSummary,
  useBarBorderColor,
  useBarChartContext,
  useMeasureLabelWidth,
} from '../utils';
import {
  BackgroundBar,
  BarListItem,
  barListItemPadding,
  BarWrapper,
  ForegroundBar,
  RowAnchor,
  RowButton,
  RowWrapper,
} from './elements';

export interface BarRowProps extends BarProps {
  index?: number;
}

export const Bar = forwardRef<
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
    const { minRange, maxRange, unit, styleConfig, animate, widestLabelWidth } =
      useBarChartContext();

    const labelRef = useRef<HTMLDivElement>(null);
    useMeasureLabelWidth({ ref: labelRef });

    const getBorderColor = useBarBorderColor();

    const isStacked = seriesTwoValue !== undefined;
    const displayValue = isStacked ? seriesTwoValue : seriesOneValue;

    const backgroundBorderColor = getBorderColor(
      styleConfig.backgroundBarColor
    );
    const foregroundBorderColor = isStacked
      ? getBorderColor(styleConfig.foregroundBarColor)
      : undefined;

    const backgroundBarWidth = calculateBarWidth({
      value: displayValue,
      minRange,
      maxRange,
    });

    const foregroundBarWidth = isStacked
      ? calculateBarWidth({
          value: seriesOneValue,
          minRange,
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

    const widthValue =
      widestLabelWidth === null ? 'min-content' : widestLabelWidth;

    const rowContent = (
      <>
        <FlexBox
          alignItems="center"
          color={styleConfig.textColor}
          flexShrink={0}
          pr={24}
          ref={labelRef}
          width={widthValue}
        >
          {Icon && <Icon mr={iconPadding} size={iconWidth} />}
          <Text fontWeight="bold" truncate="ellipsis" truncateLines={1}>
            {yLabel}
          </Text>
        </FlexBox>

        <BarWrapper>
          <BackgroundBar
            animate={animate ? { width: bgWidthStr } : undefined}
            bg={styleConfig.backgroundBarColor}
            borderColor={backgroundBorderColor}
            data-testid="background-bar"
            initial={animate ? { width: '0%' } : undefined}
            transition={{ duration: 0.5, delay: animationDelay }}
            width={!animate ? bgWidthStr : undefined}
          />
          {isStacked && (
            <ForegroundBar
              animate={animate ? { width: fgWidthStr } : undefined}
              bg={styleConfig.foregroundBarColor}
              borderColor={foregroundBorderColor}
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
          pl={24}
          width={rightSpacerWidth - barListItemPadding}
        >
          {isStacked && (
            <>
              <Text color="text-secondary" variant="p-small">
                {seriesTwoValue.toLocaleString()}
                {unit && ` ${unit}`}
              </Text>
              <MiniArrowRightIcon
                color="text-secondary"
                mx={12 as any}
                size={16}
              />
            </>
          )}
          <Text color={styleConfig.textColor} variant="p-small">
            {displayValue.toLocaleString()}
            {unit && ` ${unit}`}
          </Text>
        </FlexBox>
      </>
    );

    const content = href ? (
      <RowAnchor
        aria-label={valuesSummary}
        href={href}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
      >
        {rowContent}
      </RowAnchor>
    ) : onClick ? (
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
    ) : (
      <RowWrapper
        aria-label={valuesSummary}
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        {rowContent}
      </RowWrapper>
    );

    return <BarListItem>{content}</BarListItem>;
  }
);
