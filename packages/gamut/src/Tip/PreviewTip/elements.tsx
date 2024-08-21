import { CheckerDense } from '@codecademy/gamut-patterns';
import { useMemo } from 'react';

import { Box, FlexBox, GridBox } from '../../Box';
import { Shimmer } from '../../Loading/Shimmer';
import { Text } from '../../Typography';
import { PreviewTipContent, TipPlacementComponentProps } from '../shared/types';
import {
  avatarColumnTemplate,
  avatarGridTemplate,
  defaultGridTemplate,
  getShadowAlignment,
} from './styles';

const PreviewTipBodyShimmer = ({
  truncateLines = 4,
}: Pick<PreviewTipContent, 'truncateLines'>) => {
  const height = (truncateLines as number) * 24;
  return <Shimmer height={height} width="100%" />;
};

type PreviewTipContentsProps = Pick<TipPlacementComponentProps, 'info'> &
  PreviewTipContent;

export const PreviewTipContents: React.FC<PreviewTipContentsProps> = ({
  avatar,
  loading,
  info,
  overline,
  truncateLines = 4,
  username,
}) => {
  const contents = useMemo(() => {
    return loading ? (
      <PreviewTipBodyShimmer truncateLines={truncateLines} />
    ) : (
      <>
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
      </>
    );
  }, [loading, avatar, info, overline, truncateLines, username]);

  return (
    <GridBox
      gridTemplateAreas={avatar ? avatarGridTemplate : defaultGridTemplate}
      gridTemplateColumns={avatar ? avatarColumnTemplate : '1fr'}
      rowGap={4}
    >
      {contents}
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
    // CASS - maybe dedupe in FloatingTip
    <CheckerDense
      aria-hidden
      height="calc(100% - 12px)"
      width="100%"
      position="absolute"
      zIndex={zIndex ? zIndex - 2 : -1}
      {...shadowAlignment}
    />
  );
};
