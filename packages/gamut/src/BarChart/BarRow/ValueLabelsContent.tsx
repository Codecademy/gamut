import { MiniArrowRightIcon } from '@codecademy/gamut-icons';

import { Text } from '../../Typography';
import { iconPadding } from '../shared/styles';
import { BarChartStyles } from '../shared/types';

export type ValueLabelsContentProps = {
  seriesOneFormatted: string;
  displayValueFormatted: string;
  isStacked: boolean;
} & Pick<Required<BarChartStyles>, 'seriesOneLabel' | 'seriesTwoLabel'>;

const valueLabelProps = {
  height: 'fit-content',
  lineHeight: 'title',
  variant: 'p-small',
  whiteSpace: 'nowrap',
} as const;

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
        <Text color={seriesOneLabel} {...valueLabelProps}>
          {seriesOneFormatted}
        </Text>
        <MiniArrowRightIcon color={seriesOneLabel} mx={iconPadding} size={16} />
      </>
    )}
    <Text
      color={isStacked ? seriesTwoLabel : seriesOneLabel}
      fontWeight={isStacked ? 'bold' : 'normal'}
      {...valueLabelProps}
    >
      {displayValueFormatted}
    </Text>
  </>
);
