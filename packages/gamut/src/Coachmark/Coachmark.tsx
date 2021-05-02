import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Box } from '../Box';
import { TextButton } from '../Button';
import { FloatingCard } from '../Card';
import { Popover, PopoverProps } from '../Popover';
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
  cta: {
    text: string;
    onClick: () => void;
  };
  /**
   * Applied to the element to which the coachmark points.
   */
  className?: string;
  /**
   * Amount of time (in ms) to delay rendering the coachmark.
   * @default 500
   */
  delay?: number;
  /**
   * Whether the coachmark is rendered.
   */
  shouldShow: boolean;
} & Partial<Omit<PopoverProps, 'isOpen' | 'targetRef' | 'beak'>>;

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  shouldShow,
  className,
  delay = 500,
  cta,
  title,
  message,
  alignment = 'bottom-left',
  inset,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeElRef = useRef<HTMLDivElement>(null);

  const onDismiss = () => {
    setIsOpen(false);
    cta?.onClick();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (shouldShow) {
      timer = setTimeout(() => {
        setIsOpen(shouldShow);
      }, delay);
    } else {
      setIsOpen(shouldShow);
    }

    return () => clearTimeout(timer);
  }, [shouldShow, delay]);

  const layoutVariant = title ? 'withTitle' : undefined;
  const [yAlign, xAlign] = alignment.split('-') as [
    'top' | 'bottom',
    'left' | 'right'
  ];

  const beakY = yAlign === 'top' ? 'bottom' : 'top';
  const beakX = inset ? xAlign : xAlign === 'left' ? 'right' : 'left';
  const beakAlignment = `${beakY}-${beakX}` as const;

  return (
    <Box display="inline-block" ref={activeElRef} className={className}>
      {children}
      <Popover
        {...rest}
        horizontalOffset={inset ? 0 : -48}
        targetRef={activeElRef}
        isOpen={isOpen}
        alignment={alignment}
        inset={inset}
      >
        <CoachmarkCard
          beak={beakAlignment}
          pattern="checkerDense"
          layout={layoutVariant}
        >
          {title && (
            <Text variant="title-xs" gridArea="title">
              {title}
            </Text>
          )}
          <Text variant="p-small" gridArea="message">
            {message}
          </Text>
          <TextButton onClick={onDismiss} gridArea="cta" justifySelf="end">
            {cta?.text}
          </TextButton>
        </CoachmarkCard>
      </Popover>
    </Box>
  );
};
