import {
  Box,
  Column,
  ColumnProps,
  LayoutGrid,
  Text,
  Video,
  VideoProps,
} from '@codecademy/gamut';
import React from 'react';

import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
import { BaseProps } from './types';

const Image = Box.withComponent('img');

type MediaProps =
  | ({
      type: 'image';
    } & React.ComponentProps<typeof Image>)
  | ({
      type: 'video';
    } & VideoProps);

export type PageSingleFeatureProps = BaseProps & {
  className?: string;
  eyebrow?: string;
  hasPageHeading?: boolean;
  hideMediaOnMobile?: boolean;
  media?: MediaProps;
  mediaWidth?: Extract<ColumnProps['size'], number>;
};

export const PageSingleFeature: React.FC<PageSingleFeatureProps> = ({
  className,
  cta,
  desc,
  eyebrow,
  hasPageHeading,
  hideMediaOnMobile,
  media,
  mediaWidth = 6,
  onAnchorClick,
  testId,
  title,
}) => {
  const primaryContent = (
    <>
      {eyebrow && title && (
        <Text
          fontSize={{ _: 20, sm: 22 }}
          fontFamily="accent"
          mb={16}
          display="block"
        >
          {eyebrow}
        </Text>
      )}
      {title && <Title isPageHeading={hasPageHeading}>{title}</Title>}
      {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
      {cta && (
        <Box mt={32}>
          <CTA
            href={cta.href}
            onClick={cta.onClick}
            buttonType={cta.buttonType}
          >
            {cta.text}
          </CTA>
        </Box>
      )}
    </>
  );

  if (!media) {
    return (
      <div data-testid={testId} className={className}>
        {primaryContent}
      </div>
    );
  }

  let left: Extract<ColumnProps['size'], number> = 12;
  let right: Extract<ColumnProps['size'], number> = 12;

  if (mediaWidth > 0 && mediaWidth < 12) {
    left = (12 - mediaWidth) as Extract<ColumnProps['size'], number>;
    right = mediaWidth;
  }

  return (
    <LayoutGrid
      data-testid={testId}
      rowGap={16}
      columnGap={{ _: 8, sm: 32 }}
      className={className}
    >
      <Column size={{ sm: left }} alignContent="flex-start">
        {primaryContent}
      </Column>
      <Column
        size={{ sm: right }}
        gridRowStart={{ _: 1, sm: 'initial' }}
        display={{
          _: hideMediaOnMobile ? 'none' : 'initial',
          sm: 'initial',
        }}
      >
        {media.type === 'image' && <Image {...media} width={1} />}
        {media.type === 'video' && <Video {...media} />}
      </Column>
    </LayoutGrid>
  );
};
