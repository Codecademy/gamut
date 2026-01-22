import { MiniArrowRightIcon } from '@codecademy/gamut-icons';
import {
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  useMemo,
  useRef,
} from 'react';

import { Box, FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { iconPadding, iconWidth, minBarWidth } from '../shared/styles';
import { BarProps } from '../shared/types';
import { calculateBarWidth, getValuesSummary } from '../utils';
import {
  useBarBorderColor,
  useBarChartContext,
  useMeasureLeftLabelWidth,
  useMeasureRightLabelWidth,
} from '../utils/hooks';
import { Bar, BarWrapper, RowAnchor, RowButton, RowWrapper } from './elements';

export type BarRowProps = BarProps & {
  index?: number;
};

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
    const {
      minRange,
      maxRange,
      unit,
      styleConfig,
      animate,
      widestLeftLabelWidth,
      widestRightLabelWidth,
      translations,
    } = useBarChartContext();

    const {
      textColor,
      backgroundBarColor,
      foregroundBarColor,
      seriesOneLabel,
      seriesTwoLabel,
    } = styleConfig;

    const labelRef = useRef<HTMLDivElement>(null);
    const rightLabelRef = useRef<HTMLDivElement>(null);
    useMeasureLeftLabelWidth({ ref: labelRef });
    useMeasureRightLabelWidth({ ref: rightLabelRef });

    const getBorderColor = useBarBorderColor();

    const isStacked = seriesTwoValue !== undefined;
    const displayValue = isStacked ? seriesTwoValue : seriesOneValue;

    const { backgroundBorderColor, foregroundBorderColor } = useMemo(
      () => ({
        backgroundBorderColor: getBorderColor(backgroundBarColor),
        foregroundBorderColor: isStacked
          ? getBorderColor(foregroundBarColor)
          : undefined,
      }),
      [getBorderColor, backgroundBarColor, isStacked, foregroundBarColor]
    );

    const { bgWidthStr, fgWidthStr } = useMemo(() => {
      const bgWidth = calculateBarWidth({
        value: displayValue,
        minRange,
        maxRange,
      });
      const fgWidth = isStacked
        ? calculateBarWidth({
            value: seriesOneValue,
            minRange,
            maxRange,
          })
        : 0;
      return {
        bgWidthStr: `${Math.max(minBarWidth, bgWidth)}%`,
        fgWidthStr: `${Math.max(minBarWidth, fgWidth)}%`,
      };
    }, [displayValue, isStacked, seriesOneValue, minRange, maxRange]);

    const valuesSummary = useMemo(
      () =>
        getValuesSummary({
          isInteractive: !!(href || onClick),
          seriesOneValue,
          seriesTwoValue,
          unit,
          yLabel,
          translations,
        }),
      [
        href,
        onClick,
        seriesOneValue,
        seriesTwoValue,
        unit,
        yLabel,
        translations,
      ]
    );

    const animationDelay = animate ? index * 0.1 : 0;

    const widthValue =
      widestLeftLabelWidth === null ? 'min-content' : widestLeftLabelWidth;

    const rightWidthValue =
      widestRightLabelWidth === null ? 'min-content' : widestRightLabelWidth;

    const labelsContainer = useMemo(
      () => (
        <FlexBox
          alignItems="center"
          display={{ _: 'flex', xs: 'none' }}
          gap={8}
          justifyContent="space-between"
          width="100%"
        >
          <FlexBox alignItems="center" color={textColor} flexShrink={0}>
            {Icon && <Icon mr={iconPadding as any} size={iconWidth} />}
            <Text
              fontWeight="bold"
              truncate="ellipsis"
              truncateLines={1}
              whiteSpace="nowrap"
            >
              {yLabel}
            </Text>
          </FlexBox>

          <FlexBox
            alignItems="center"
            flexShrink={0}
            gap={8}
            justifyContent="flex-end"
          >
            {isStacked && (
              <>
                <Text
                  color={seriesOneLabel}
                  fontWeight="bold"
                  variant="p-small"
                  whiteSpace="nowrap"
                >
                  {seriesOneValue.toLocaleString(translations.locale)}
                  {unit && ` ${unit}`}
                </Text>
                <MiniArrowRightIcon color={seriesOneLabel} size={16} />
              </>
            )}
            <Text
              color={isStacked ? seriesTwoLabel : seriesOneLabel}
              variant="p-small"
              whiteSpace="nowrap"
            >
              {displayValue.toLocaleString(translations.locale)}
              {unit && ` ${unit}`}
            </Text>
          </FlexBox>
        </FlexBox>
      ),
      [
        textColor,
        Icon,
        yLabel,
        isStacked,
        seriesOneValue,
        seriesOneLabel,
        seriesTwoLabel,
        displayValue,
        unit,
        translations.locale,
      ]
    );

    const leftLabel = useMemo(
      () => (
        <FlexBox
          alignItems="center"
          color={textColor}
          display={{ _: 'none', xs: 'flex' }}
          flexShrink={0}
          pr={{ _: 0, xs: 24 }}
          ref={labelRef}
          width={{ _: 'auto', xs: widthValue }}
        >
          {Icon && <Icon mr={12 as any} size={24} />}
          <Text
            fontWeight="bold"
            truncate="ellipsis"
            truncateLines={1}
            whiteSpace="nowrap"
          >
            {yLabel}
          </Text>
        </FlexBox>
      ),
      [textColor, Icon, yLabel, widthValue]
    );

    const rightLabel = useMemo(
      () => (
        <FlexBox
          alignItems="center"
          display={{ _: 'none', xs: 'flex' }}
          flexShrink={0}
          justifyContent="flex-end"
          pl={{ _: 0, xs: 24 }}
          ref={rightLabelRef}
          width={{ _: 'auto', xs: rightWidthValue }}
        >
          {isStacked && (
            <>
              <Text
                color={seriesOneLabel}
                variant="p-small"
                whiteSpace="nowrap"
              >
                {seriesOneValue.toLocaleString(translations.locale)}
                {unit && ` ${unit}`}
              </Text>
              <MiniArrowRightIcon
                color={seriesOneLabel}
                mx={12 as any}
                size={16}
              />
            </>
          )}
          <Text
            color={isStacked ? seriesTwoLabel : seriesOneLabel}
            fontWeight={isStacked ? 'bold' : 'normal'}
            variant="p-small"
            whiteSpace="nowrap"
          >
            {displayValue.toLocaleString(translations.locale)}
            {unit && ` ${unit}`}
          </Text>
        </FlexBox>
      ),
      [
        isStacked,
        seriesOneValue,
        seriesOneLabel,
        seriesTwoLabel,
        displayValue,
        unit,
        translations.locale,
        rightWidthValue,
      ]
    );

    const rowContent = useMemo(
      () => (
        <>
          {labelsContainer}
          {leftLabel}
          <BarWrapper>
            <Bar
              animate={animate ? { width: bgWidthStr } : undefined}
              bg={backgroundBarColor}
              borderColor={backgroundBorderColor}
              data-testid="background-bar"
              initial={animate ? { width: '0%' } : undefined}
              transition={{ duration: 0.5, delay: animationDelay }}
              width={!animate ? bgWidthStr : undefined}
            />
            {isStacked && (
              <Bar
                animate={animate ? { width: fgWidthStr } : undefined}
                bg={foregroundBarColor}
                borderColor={foregroundBorderColor}
                data-testid="foreground-bar"
                initial={animate ? { width: '0%' } : undefined}
                transition={{ duration: 0.5, delay: animationDelay + 0.25 }}
                width={!animate ? fgWidthStr : undefined}
              />
            )}
          </BarWrapper>
          {rightLabel}
        </>
      ),
      [
        labelsContainer,
        leftLabel,
        animate,
        bgWidthStr,
        backgroundBarColor,
        backgroundBorderColor,
        animationDelay,
        isStacked,
        fgWidthStr,
        foregroundBarColor,
        foregroundBorderColor,
        rightLabel,
      ]
    );

    const content = href ? (
      <RowAnchor
        aria-label={valuesSummary}
        href={href}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {rowContent}
      </RowAnchor>
    ) : onClick ? (
      <RowButton
        aria-label={valuesSummary}
        ref={ref as MutableRefObject<HTMLButtonElement>}
        onClick={onClick}
      >
        {rowContent}
      </RowButton>
    ) : (
      <>
        <RowWrapper ref={ref as MutableRefObject<HTMLDivElement>}>
          <Text screenreader>{valuesSummary}</Text> {rowContent}
        </RowWrapper>
      </>
    );

    return <Box as="li">{content}</Box>;
  }
);
