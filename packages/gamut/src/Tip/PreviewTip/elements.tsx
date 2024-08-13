import { CheckerDense } from '@codecademy/gamut-patterns';

import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { PreviewTipContent, TipPlacementComponentProps } from '../shared/types';

type PreviewTipContentsProps = Pick<TipPlacementComponentProps, 'info'> &
  PreviewTipContent;

export const PreviewTipContents: React.FC<PreviewTipContentsProps> = ({
  overline,
  info,
  title,
}) => {
  return (
    <FlexBox column maxWidth={384} aria-label="Link Preview:">
      <Text textColor="text-secondary" fontFamily="accent" fontSize={14}>
        {title}
      </Text>
      <Text fontWeight="bold" fontSize={16}>
        {overline}
      </Text>
      <Text as="p" fontSize={16} truncate="ellipsis" truncateLines={4}>
        {info}
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
      zIndex={zIndex ? zIndex - 2 : -1}
      // right={shadow === 'bottomRight' ? '-0.5rem' : undefined}
    />
ya  );
};
