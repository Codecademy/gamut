import { CheckerDense } from '@codecademy/gamut-patterns';
import { css, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Anchor } from '../../Anchor';
import { Box, FlexBox, GridBox } from '../../Box';
import { ButtonSelectors } from '../../ButtonBase/ButtonBase';
import { Shimmer } from '../../Loading/Shimmer';
import { patternContainerBaseStyles } from '../../Popover/styles';
import { Text } from '../../Typography';
import { PreviewTipContent, TipPlacementComponentProps } from '../shared/types';
import {
  avatarColumnTemplate,
  avatarGridTemplate,
  defaultGridTemplate,
  getShadowAlignment,
} from './styles';

export const PreviewTipAnchor = styled(Anchor)(
  variant({
    defaultVariant: 'anchor',
    prop: 'tipType',
    variants: {
      anchor: {
        textDecorationStyle: 'dotted',
        [ButtonSelectors.HOVER]: {
          textDecoration: 'underline',
          textDecorationStyle: 'solid',
        },
      },
      avatar: {
        borderRadius: 'sm',
        [ButtonSelectors.HOVER]: {
          bg: 'background-hover',
        },
      },
    },
  })
);

const PreviewTipBodyShimmer = ({
  avatar,
  truncateLines = 4,
}: Pick<PreviewTipContent, 'avatar' | 'truncateLines'>) => {
  const lineHeight = 24;
  const height = avatar ? lineHeight : (truncateLines as number) * lineHeight;
  const width = avatar ? '5.5rem' : '100%';
  return (
    <>
      <Shimmer height={lineHeight} width="4.5rem" />
      <Shimmer height={height} width={width} />
    </>
  );
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
      <PreviewTipBodyShimmer avatar={avatar} truncateLines={truncateLines} />
    ) : (
      <>
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
      {avatar && (
        <FlexBox center aria-hidden gridArea="avatar" pr={12}>
          <Box height={40} width={40}>
            {avatar}
          </Box>
        </FlexBox>
      )}
      {contents}
    </GridBox>
  );
};

type PreviewTipShadowProps = Pick<
  TipPlacementComponentProps,
  'alignment' | 'zIndex'
>;

export const PreviewTipPattern = styled(Box)(
  css({
    height: 'calc(100% - 12px)',
    ...patternContainerBaseStyles,
  })
);

export const PreviewTipShadow: React.FC<PreviewTipShadowProps> = ({
  alignment,
  zIndex,
}) => {
  const shadowAlignment = getShadowAlignment(alignment);

  return (
    <PreviewTipPattern
      aria-hidden
      zIndex={zIndex ? zIndex - 2 : -1}
      {...shadowAlignment}
    >
      <CheckerDense />
    </PreviewTipPattern>
  );
};
