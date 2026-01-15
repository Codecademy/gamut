import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useId } from 'react';

import { Box, FlexBox } from '../Box';
import { FormGroupLabel } from '../Form';
import { Select } from '../Form/inputs/Select';
import { Text } from '../Typography/Text';
import { BarChartProvider } from './BarChartProvider';
import { BarRow } from './BarRow';
import { GridLines } from './layout/GridLines';
import { ScaleChartHeader } from './layout/ScaleChartHeader';
import { BarsList } from './shared/elements';
import { BarChartProps, BarProps, InferBarType } from './shared/types';
import { useBarChart, useBarChartSort } from './utils/hooks';

export type { BarProps, InferBarType };

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
  unit = '',
  xScale,
}: BarChartProps<TBarValues>) => {
  const { sortedBars, selectProps } = useBarChartSort<TBarValues>({
    bars: barValues,
    sortFns,
  });

  const contextValue = useBarChart({
    minRange,
    maxRange,
    xScale,
    unit,
    styleConfig,
    animate,
    barCount: sortedBars?.length,
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
                Order by:
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
    ) : null;

  return (
    <BarChartProvider value={contextValue}>
      {title && titleContent}
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
              const uniqueKey = `${bar.yLabel}-${bar.seriesOneValue}-${
                bar.seriesTwoValue ?? ''
              }`;
              return <BarRow index={index} key={uniqueKey} {...bar} />;
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
