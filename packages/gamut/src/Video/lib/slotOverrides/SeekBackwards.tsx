import { Timer10Icon } from '@codecademy/gamut-icons';
import { SeekButton, Tooltip } from '@vidstack/react';
import { useDefaultLayoutWord } from '@vidstack/react/player/layouts/default';

export const SeekBackwardsButton = () => {
  const seekBackwardText = useDefaultLayoutWord('Seek Backward');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton className="vds-button" seconds={-10}>
          <Timer10Icon height={20} width={20} />
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement="top">
        {seekBackwardText}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
