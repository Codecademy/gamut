export const isInView = ({ top, left, bottom, right }: DOMRect) => {
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= windowHeight && right <= windowWidth
  );
};

const alignments = {
  inside: {
    top: -1,
    bottom: 0,
    left: 0,
    right: -1,
  },
  outside: {
    top: -1,
    bottom: 0,
    left: -1,
    right: 0,
  },
};

export const getTransform = (
  xAlign: 'left' | 'right',
  yAlign: 'top' | 'bottom',
  inside: boolean
) => {
  const { [xAlign]: x, [yAlign]: y } = alignments[
    inside ? 'inside' : 'outside'
  ];

  return `translate(${x * 100}%, ${y * 100}%)`;
};
