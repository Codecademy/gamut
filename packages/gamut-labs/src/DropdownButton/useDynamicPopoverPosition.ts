import { PopoverProps } from '@codecademy/gamut';
import { useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

export type UseDynamicPopoverPositionProps = {
  targetRef: PopoverProps['targetRef'];
  popoverContainerRef: PopoverProps['popoverContainerRef'];
};

const VERTICAL_OFFSET = 20;

type PopoverPosition = PopoverProps['position'];

export const useDynamicPopoverPosition = ({
  targetRef,
  popoverContainerRef,
}: UseDynamicPopoverPositionProps): PopoverPosition => {
  const { height: windowHeight } = useWindowSize();

  const getPos = () => {
    const targetRect = targetRef?.current?.getBoundingClientRect();
    const targetBottom = targetRect?.bottom ?? 0;

    const popoverRect = popoverContainerRef?.current?.getBoundingClientRect();
    const popoverHeight = popoverRect?.height ?? 128;

    return targetBottom + popoverHeight + VERTICAL_OFFSET > windowHeight
      ? 'above'
      : 'below';
  };

  const [position, setPosition] = useState<PopoverPosition>(getPos());
  const { y } = useWindowScroll();

  useEffect(() => {
    setPosition(getPos());
  }, [targetRef, windowHeight, y]);

  return position;
};
