import { PopoverProps } from '@codecademy/gamut';
import { useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

export type UseDynamicPopoverPositionProps = {
  targetRef: PopoverProps['targetRef'];
  popoverContainerRef: PopoverProps['popoverContainerRef'];
};

const VERT_OFFSET = 20;

type PopoverPosition = PopoverProps['position'];

export const useDynamicPopoverPosition = ({
  targetRef,
  popoverContainerRef,
}: UseDynamicPopoverPositionProps): PopoverPosition => {
  const { height: windowHeight } = useWindowSize();

  const [position, setPosition] = useState<PopoverPosition>('below');
  const { y } = useWindowScroll();

  useEffect(() => {
    const targetRect = targetRef?.current?.getBoundingClientRect();
    const targetBottom = targetRect?.bottom ?? 0;

    const popoverRect = popoverContainerRef?.current?.getBoundingClientRect();
    const popoverHeight = popoverRect?.height ?? 128;
    const above = targetBottom + popoverHeight + VERT_OFFSET > windowHeight;

    setPosition(above ? 'above' : 'below');
  }, [targetRef, windowHeight, y]);

  return position;
};
