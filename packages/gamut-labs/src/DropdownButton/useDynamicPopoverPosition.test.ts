import { PopoverProps } from '@codecademy/gamut';
import { renderHook } from '@testing-library/react-hooks';

import {
  DYNAMIC_POSITION_THRESHOLD,
  useDynamicPopoverPosition,
} from './useDynamicPopoverPosition';

const VIEWPORT_HEIGHT = 1000;

jest.mock('react-use', () => ({
  useWindowSize: () => ({ height: VIEWPORT_HEIGHT }),
  useWindowScroll: () => ({ y: 0 }),
}));

const mockTargetRef = (rect: Pick<DOMRect, 'bottom'>) =>
  ({
    current: {
      getBoundingClientRect: () => rect,
    },
  } as PopoverProps['targetRef']);

describe('useDynamicPopoverPosition', () => {
  it('returns "below" when target is far enough from viewport bottom', () => {
    const targetRef = mockTargetRef({
      // just outside threshold
      bottom: VIEWPORT_HEIGHT - DYNAMIC_POSITION_THRESHOLD,
    });

    const hook = renderHook(() => useDynamicPopoverPosition(targetRef));

    expect(hook.result.current).toEqual('below');
  });

  it('returns "above" when target close enough to viewport bottom', () => {
    const targetRef = mockTargetRef({
      // just within threshold
      bottom: VIEWPORT_HEIGHT + 1 - DYNAMIC_POSITION_THRESHOLD,
    });

    const hook = renderHook(() => useDynamicPopoverPosition(targetRef));

    expect(hook.result.current).toEqual('above');
  });
});
