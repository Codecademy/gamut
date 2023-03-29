import { PopoverProps } from '@codecademy/gamut';
import { renderHook } from '@testing-library/react-hooks';

import { useDynamicPopoverPosition } from './useDynamicPopoverPosition';

const WINDOW_HEIGHT = 1000;

jest.mock('react-use', () => ({
  useWindowSize: () => ({ height: WINDOW_HEIGHT }),
  useWindowScroll: () => ({ y: 0 }),
}));

type TestScenario = { targetBottom: number; popoverContainerHeight: number };
type TestExpectation = { position: PopoverProps['position']; because: string };
type TestCase = { scenario: TestScenario; expectation: TestExpectation };

const describeScenario = (scenario: TestScenario) => {
  const { targetBottom, popoverContainerHeight } = scenario;
  return [
    `for a target with bottom: ${targetBottom}`,
    `popover container height: ${popoverContainerHeight}`,
    `and window height: ${WINDOW_HEIGHT}`,
  ].join(', ');
};

const describeExpectation = (expectation: TestExpectation) => {
  const { position, because } = expectation;
  return `position should be: "${position}" because ${because}`;
};

const testCases: TestCase[] = [
  {
    scenario: {
      targetBottom: 600,
      popoverContainerHeight: 200,
    },
    expectation: {
      position: 'below',
      because: 'there is plenty of room for the popover beneath the target',
    },
  },
  {
    scenario: {
      targetBottom: 900,
      popoverContainerHeight: 200,
    },
    expectation: {
      position: 'above',
      because: 'the target is near the bottom of the window',
    },
  },
  {
    scenario: {
      targetBottom: 600,
      popoverContainerHeight: 500,
    },
    expectation: {
      position: 'above',
      because: 'the popover is too tall to fit beneath the target',
    },
  },
];

const mockRef = (rect: Partial<DOMRect>) =>
  ({
    current: {
      getBoundingClientRect: () => rect,
    },
  } as PopoverProps['targetRef']);

describe('useDynamicPopoverPosition', () => {
  for (const { scenario, expectation } of testCases) {
    it(`${describeScenario(scenario)}, ${describeExpectation(
      expectation
    )}`, () => {
      const { targetBottom, popoverContainerHeight } = scenario;

      const hook = renderHook(() =>
        useDynamicPopoverPosition({
          targetRef: mockRef({ bottom: targetBottom }),
          popoverContainerRef: mockRef({ height: popoverContainerHeight }),
        })
      );

      expect(hook.result.current).toEqual(expectation.position);
    });
  }
});
