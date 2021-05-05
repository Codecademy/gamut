import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { TextButton } from '../Button';
import { FloatingCard } from '../FloatingCard/FloatingCard';
import { Text } from '../Typography';

const layoutVariants = system.variant({
  prop: 'layout',
  variants: {
    message: {
      gridTemplateAreas: '"message" "message" "cta"',
    },
    'title-message': {
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
  }),
  layoutVariants
);

export type CoachmarkProps = {
  title?: string;
  beak: ComponentProps<typeof FloatingCard>['beak'];
  cta: {
    text: string;
    onClick: () => void;
  };
};

export const Coachmark: React.FC<CoachmarkProps> = ({
  title,
  children,
  cta,
  beak = 'top-left',
}) => {
  const layoutVariant = title ? 'title-message' : 'message';

  return (
    <CoachmarkCard beak={beak} pattern="checkerDense" layout={layoutVariant}>
      {title && (
        <Text variant="title-xs" gridArea="title">
          {title}
        </Text>
      )}
      <Text variant="p-small" gridArea="message">
        {children}
      </Text>
      <TextButton onClick={cta?.onClick} gridArea="cta" justifySelf="end">
        {cta?.text}
      </TextButton>
    </CoachmarkCard>
  );
};
