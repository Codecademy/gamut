import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps, ReactNode } from 'react';

import { TextButton } from '../Button';
import { FloatingCard } from '../Card';
import { Text } from '../Typography';

const layoutVariants = system.variant({
  prop: 'layout',
  variants: {
    withTitle: {
      gridTemplateAreas: `"title" "message" "cta"`,
    },
  },
});

const CoachmarkCard = styled(FloatingCard)<StyleProps<typeof layoutVariants>>(
  system.css({
    display: 'grid',
    width: 300,
    rowGap: 8,
    p: 16,
    gridTemplateRows: 'max-content 1fr, max-content',
    gridTemplateAreas: `"title" "message" "cta"`,
  }),
  layoutVariants
);

export type CoachmarkProps = {
  title?: string;
  message?: ReactNode;
  beak: ComponentProps<typeof FloatingCard>['beak'];
  cta: {
    text: string;
    onClick: () => void;
  };
};

export const Coachmark: React.FC<CoachmarkProps> = ({
  title,
  message,
  cta,
  beak = 'top-left',
}) => {
  const layoutVariant = title ? 'withTitle' : undefined;

  return (
    <CoachmarkCard beak={beak} pattern="checkerDense" layout={layoutVariant}>
      {title && (
        <Text variant="title-xs" gridArea="title">
          {title}
        </Text>
      )}
      <Text variant="p-small" gridArea="message">
        {message}
      </Text>
      <TextButton onClick={cta?.onClick} gridArea="cta" justifySelf="end">
        {cta?.text}
      </TextButton>
    </CoachmarkCard>
  );
};
