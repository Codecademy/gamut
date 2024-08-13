import { CheckerDense } from '@codecademy/gamut-patterns';

import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { TipPlacementComponentProps } from '../shared/types';

export const PreviewTipContents: React.FC<TipPlacementComponentProps> = ({}) => {
  return (
    <FlexBox column maxWidth={384} aria-label="Tooltip:">
      <Text textColor="text-secondary" fontFamily="accent" fontSize={14}>
        Title
      </Text>
      <Text as="p" fontSize={16} truncate="ellipsis" truncateLines={4}>
        Info
      </Text>
    </FlexBox>
  );
};

export const PreviewTipShadow = ({}) => {
  const zIndex = 1;
  const alignment = 'bottom-left';
  return (
    <CheckerDense
      dimensions={1}
      position="absolute"
      top="-8px"
      left="-8px"
      zIndex={zIndex ? zIndex - 1 : -1}
      // right={shadow === 'bottomRight' ? '-0.5rem' : undefined}
    />
  );
};
