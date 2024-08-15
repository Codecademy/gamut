import { CheckerDense } from '@codecademy/gamut-patterns';

import { Box, FlexBox, GridBox } from '../../Box';
import { Text } from '../../Typography';
import { PreviewTipContent, TipPlacementComponentProps } from '../shared/types';
import {
  avatarColumnTemplate,
  avatarGridTemplate,
  defaultGridTemplate,
  getShadowAlignment,
} from './styles';

type PreviewTipContentsProps = Pick<TipPlacementComponentProps, 'info'> &
  PreviewTipContent;

export const PreviewTipContents: React.FC<PreviewTipContentsProps> = ({
  avatar,
  info,
  overline,
  truncateLines,
  username,
}) => {
  return (
    <GridBox
      gridTemplateColumns={avatar ? avatarColumnTemplate : '1fr'}
      gridTemplateAreas={avatar ? avatarGridTemplate : defaultGridTemplate}
      rowGap={4}
      aria-label="Link Preview:"
      p={16}
    >
      {avatar && (
        <FlexBox center aria-hidden gridArea="avatar" pr={12}>
          <Box height={40} width={40}>
            {avatar}
          </Box>
        </FlexBox>
      )}
      {overline && (
        <Text textColor="text-secondary" fontFamily="accent" fontSize={14}>
          {overline}
        </Text>
      )}
      {username && (
        <Text fontWeight="bold" fontSize={16}>
          {username}
        </Text>
      )}
      <Text
        as="p"
        fontSize={16}
        truncate="ellipsis"
        truncateLines={truncateLines ?? 4}
      >
        {info}
      </Text>
    </GridBox>
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
  const shadowAlignment = getShadowAlignment(alignment);

  return (
    <CheckerDense
      height="calc(100% - 12px)"
      position="absolute"
      zIndex={zIndex ? zIndex - 2 : -1}
      {...shadowAlignment}
    />
  );
};
