import { PopoverProps } from '@codecademy/gamut';
import { useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

// Use 'above" when the bottom of the target is
// within 96px from the bottom of the viewport.
export const DYNAMIC_POSITION_THRESHOLD = 96;

export const useDynamicPopoverPosition = (
  targetRef: PopoverProps['targetRef']
) => {
  const [position, setPosition] = useState<PopoverProps['position']>('below');
  const { height } = useWindowSize();
  const { y } = useWindowScroll();

  useEffect(() => {
    if (targetRef?.current) {
      const { bottom } = targetRef.current.getBoundingClientRect();
      setPosition(
        bottom + DYNAMIC_POSITION_THRESHOLD > height ? 'above' : 'below'
      );
    }
  }, [targetRef, height, y]);

  return position;
};
