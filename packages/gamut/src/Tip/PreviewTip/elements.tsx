import { CheckerDense } from '@codecademy/gamut-patterns';

import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { PreviewTipContent, TipPlacementComponentProps } from '../shared/types';

type PreviewTipContentsProps = Pick<TipPlacementComponentProps, 'info'> &
  PreviewTipContent;

const ShadowAlignment = { topOrLeft: '-8px', bottomOrRight: '8px' };

export const PreviewTipContents: React.FC<PreviewTipContentsProps> = ({
  info,
  overline,
  username,
}) => {
  return (
    <FlexBox column aria-label="Link Preview:">
      <Text textColor="text-secondary" fontFamily="accent" fontSize={14}>
        {overline}
      </Text>
      <Text fontWeight="bold" fontSize={16}>
        {username}
      </Text>
      <Text as="p" fontSize={16} truncate="ellipsis" truncateLines={4}>
        {info}
      </Text>
    </FlexBox>
  );
};

type PreviewTipShadowProps = Pick<
  TipPlacementComponentProps,
  'alignment' | 'zIndex'
>;

export const PreviewTipShadow: React.FC<PreviewTipShadowProps> = ({
  alignment,
  zIndex,
}) => {
  const yShadow = alignment.includes('top');
  const xShadow = alignment.includes('left');

  return (
    <CheckerDense
      height="calc(100% - 12px)"
      position="absolute"
      top={yShadow ? ShadowAlignment.topOrLeft : ShadowAlignment.bottomOrRight}
      left={xShadow ? ShadowAlignment.topOrLeft : ShadowAlignment.bottomOrRight}
      zIndex={zIndex ? zIndex - 2 : -1}
    />
  );
};
