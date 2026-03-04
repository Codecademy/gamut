import { MiniArrowRightIcon } from '@codecademy/gamut-icons';

import { Text } from '../../Typography';
import { iconPadding } from '../shared/styles';
import { BarChartStyles } from '../shared/types';

export type ValueLabelsContentProps = {
  seriesOneFormatted: string;
  displayValueFormatted: string;
  isStacked: boolean;
} & Pick<Required<BarChartStyles>, 'seriesOneLabel' | 'seriesTwoLabel'>;

export const ValueLabelsContent = ({
  seriesOneFormatted,
  displayValueFormatted,
  isStacked,
  seriesOneLabel,
  seriesTwoLabel,
}: ValueLabelsContentProps) => (
  <>
    {isStacked && (
      <>
        <Text color={seriesOneLabel} variant="p-small" whiteSpace="nowrap">
          {seriesOneFormatted}
        </Text>
        <MiniArrowRightIcon color={seriesOneLabel} mx={iconPadding} size={16} />
      </>
    )}
    <Text
      color={isStacked ? seriesTwoLabel : seriesOneLabel}
      fontWeight={isStacked ? 'bold' : 'normal'}
      variant="p-small"
      whiteSpace="nowrap"
    >
      {displayValueFormatted}
    </Text>
  </>
);
