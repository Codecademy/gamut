import { PopoverPositionConfig, TargetRef } from './types';

export const isInView = ({ top, left, bottom, right }: DOMRect) => {
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= windowHeight && right <= windowWidth
  );
};

export const DIRECTIONS = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
} as const;

const AXIS = {
  x: {
    top: 0,
    right: -1,
    bottom: 0,
    left: 1,
  },
  y: {
    top: 1,
    right: 0,
    bottom: -1,
    left: 0,
  },
  none: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export const getPosition = ({
  alignment,
  container,
  offset = 0,
  x = 0,
  y = 0,
  insideAxis,
}: PopoverPositionConfig) => {
  const transformDirection = insideAxis ?? 'none';

  switch (alignment) {
    case 'left':
    case 'right': {
      const prop = DIRECTIONS[alignment];
      return {
        transform: `translate(0%,  -50%)`,
        [prop]: container[alignment] + container.width + offset + x,
        top: container.top + container.height / 2,
      };
    }
    case 'top':
    case 'bottom': {
      const prop = DIRECTIONS[alignment];
      return {
        transform: `translate(-50%, 0%)`,
        [prop]: container[alignment] + container.height + offset + x,
        left: container.left + container.width / 2,
      };
    }
    default:
      const [yAlign, xAlign] = alignment.split('-') as [
        'top' | 'bottom',
        'left' | 'right'
      ];
      const transform = AXIS[transformDirection];

      const {
        [DIRECTIONS[yAlign]]: yPos,
        [DIRECTIONS[xAlign]]: xPos,
      } = container;

      return {
        transform: `translate(${transform[xAlign] * 100}%, ${
          transform[yAlign] * 100
        }%)`,
        [DIRECTIONS[yAlign]]: yPos + container.height + offset + y,
        [DIRECTIONS[xAlign]]: xPos + container.width + offset + x,
      };
  }
};

export const getContainers = (target: TargetRef) => {
  const boundingClient = target.getBoundingClientRect();
  const parentClient =
    target.offsetParent?.getBoundingClientRect() ?? boundingClient;

  const {
    offsetHeight: height,
    offsetWidth: width,
    offsetLeft: left,
    offsetTop: top,
  } = target;

  return {
    parent: {
      width,
      height,
      left,
      right: parentClient.width - left - width,
      top,
      bottom: parentClient.height - top - height,
    } as DOMRect,
    viewport: boundingClient,
  };
};
