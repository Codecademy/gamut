import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useId, useMemo } from 'react';

import { Box, FlexBox } from '../Box';
import { FormGroupLabel } from '../Form';
import { Select } from '../Form/inputs/Select';
import { Text } from '../Typography/Text';
import { BarChartProvider } from './BarChartProvider';
import { BarRow } from './BarRow';
import { GridLines } from './layout/GridLines';
import { ScaleChartHeader } from './layout/ScaleChartHeader';
import { BarsList } from './shared/elements';
import {
  BarChartTranslations,
  defaultBarChartTranslations,
} from './shared/translations';
import { BarChartProps, BarProps, InferBarType } from './shared/types';
import { useBarChart, useBarChartSort } from './utils/hooks';

export type { BarProps, InferBarType, BarChartTranslations };

const StyledFormGroupLabel = styled(FormGroupLabel)(
  css({
    mr: 8,
    mt: 4,
  })
);
const WidthSelect = styled(Select)(
  css({
    width: 'max-content',
    pr: 12,
  })
);

export const BarChart = <
  TBarValues extends BarProps[] | readonly BarProps[] = BarProps[]
>({
  'aria-labelledby': ariaLabelledBy,
  animate = false,
  barValues,
  description,
  hideDescription = false,
  hideTitle = false,
  maxRange,
  minRange,
  sortFns,
  styleConfig,
  title,
  translations,
  unit = '',
  xScale,
}: BarChartProps<TBarValues>) => {
  const mergedTranslations = useMemo(
    () => ({
      ...defaultBarChartTranslations,
      ...translations,
      sortOptions: {
        ...defaultBarChartTranslations.sortOptions,
        ...translations?.sortOptions,
      },
      accessibility: {
        ...defaultBarChartTranslations.accessibility,
        ...translations?.accessibility,
      },
    }),
    [translations]
  );

  const { sortedBars, selectProps } = useBarChartSort<TBarValues>({
    bars: barValues,
    sortFns,
    translations: mergedTranslations,
  });

  const contextValue = useBarChart({
    minRange,
    maxRange,
    xScale,
    unit,
    styleConfig,
    animate,
    barCount: sortedBars?.length,
    translations: mergedTranslations,
  });

  const tickCount = Math.ceil((maxRange - minRange) / contextValue.xScale) + 1;

  const titleId = useId();
  const sortSelectId = useId();

  const titleProps =
    typeof title === 'string'
      ? {
          as: 'h2' as const,
          children: title,
          hidden: hideTitle,
          id: titleId,
          variant: 'title-xs' as const,
        }
      : title
      ? { ...title, children: title.title, hidden: hideTitle, id: titleId }
      : null;

  const titleContent =
    (title && !hideTitle) || selectProps ? (
      <Box
        borderBottom={1}
        borderColor="background-disabled"
        mb={24}
        pb={8}
        width="100%"
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          {titleProps && <Text mb={4} {...titleProps} />}
          {selectProps && (
            <FlexBox alignItems="center">
              <StyledFormGroupLabel
                htmlFor={sortSelectId}
                isSoloField
                size="small"
              >
                {mergedTranslations.sortLabel}
              </StyledFormGroupLabel>
              <WidthSelect
                sizeVariant="small"
                {...selectProps}
                id={sortSelectId}
              />
            </FlexBox>
          )}
        </FlexBox>
      </Box>
    ) : (
      <Text {...titleProps} />
    );

  return (
    <BarChartProvider value={contextValue}>
      {titleContent}
      <Box as="figure" position="relative" width="100%">
        <ScaleChartHeader
          labelCount={tickCount}
          max={maxRange}
          min={minRange}
        />
        <Box position="relative" width="100%">
          <GridLines max={maxRange} min={minRange} tickCount={tickCount} />
          <BarsList aria-labelledby={ariaLabelledBy ?? titleId}>
            {sortedBars.map((bar, index) => {
              const key =
                bar.yLabel && bar.seriesOneValue
                  ? `${bar.yLabel}-${bar.seriesOneValue}-${
                      bar.seriesTwoValue ?? ''
                    }-${index}`
                  : index;
              return <BarRow index={index} key={key} {...bar} />;
            })}
          </BarsList>
        </Box>
        <Text
          as="figcaption"
          color="text-disabled"
          hidden={hideDescription}
          mt={8}
          variant="p-small"
        >
          {description}
        </Text>
      </Box>
    </BarChartProvider>
  );
};
