import { Box, Text, TextButton } from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Popover, PopoverProps } from '../Popover';

const layoutVariants = system.variant({
  prop: 'layout',
  variants: {
    withTitle: {
      gridTemplateAreas: `"title" "message" "cta"`,
    },
  },
});

const CoachmarkContainer = styled.div<StyleProps<typeof layoutVariants>>(
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
  /**
   * Function that returns the contents of the coachmark.
   */
  renderPopover: (onDismiss?: () => void) => JSX.Element;
} & Partial<Omit<PopoverProps, 'isOpen' | 'targetRef' | 'beak'>>;

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  shouldShow,
  className,
  delay = 500,
  cta,
  title,
  message,
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

  return (
    <Box display="inline-block" ref={activeElRef} className={className}>
      {children}
      <Popover {...rest} beak targetRef={activeElRef} isOpen={isOpen}>
        <CoachmarkContainer layout={layoutVariant}>
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
        </CoachmarkContainer>
      </Popover>
    </Box>
  );
};
