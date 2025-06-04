import * as React from 'react';

import { Box } from '../../Box';
import { GridBoxProps } from '../../Box/props';
import { calculateBarWidth } from '../utils';
import { Bar, BarWrapper, ForegroundBar, minBarWidth } from './elements';

type BaseSkillsExperienceBarProps = {
  startingValue?: number;
  endingValue: number;
  tickCount: number;
};

export const TotalBar: React.FC<BaseSkillsExperienceBarProps> = ({
  startingValue,
  endingValue,
  tickCount,
}) => {
  const animate = true;
  const maxRange = 100;
  const minRange = 0;

  const showForegroundBar = Boolean(startingValue);

  const barWidth = calculateBarWidth({
    value: endingValue,
    maxRange,
  });

  const foregroundBarWidth = calculateBarWidth({
    value: startingValue ?? 0,
    maxRange,
  });

  const initialBarWidth = `${Math.max(minBarWidth, foregroundBarWidth)}%`;

  const endBarWidth = `${Math.max(minBarWidth, barWidth)}%`;

  const animationProps = animate
    ? {
        initial: { width: initialBarWidth },
        animate: {
          width: endBarWidth,
        },
        transition: { duration: 0.25, delay: 0.75 * maxRange },
      }
    : { width: endBarWidth };

  return (
    <BarWrapper>
      {/* <Bar {...animationProps} /> */}
      <Box
        bg="paleBlue"
        border={1}
        borderRadius="xl"
        height="100%"
        width={endBarWidth}
      />
      {showForegroundBar && (
        <ForegroundBar
          width={initialBarWidth}
          data-testid="foreground-progress-bar"
        />
      )}
    </BarWrapper>
  );
};
