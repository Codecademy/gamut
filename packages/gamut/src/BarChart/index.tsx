import { Box, GridBox } from '../Box';
import { TotalBar } from './Bar';
import { ScaleChartHeader } from './ScaleChartHeader';
import { BarChartProps } from './types';

export const BarChart: React.FC<BarChartProps> = () => {
  return (
    <Box width="100%" pl={0} mb={0}>
      <ScaleChartHeader min={1} max={50} labelCount={8} />
      <GridBox width="100%" pl={0} mb={0}>
        <TotalBar startingValue={5} endingValue={45} tickCount={8} />
      </GridBox>
    </Box>
  );
};
